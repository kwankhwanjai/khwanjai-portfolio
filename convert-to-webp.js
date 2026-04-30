import fs from "fs";
import path from "path";
import sharp from "sharp";

const rootDir = process.cwd();
const assetsDir = path.join(rootDir, "src", "assets");
const srcDir = path.join(rootDir, "src");

const imageExts = [".png", ".jpg", ".jpeg"];
const codeExts = [".js", ".jsx", ".ts", ".tsx", ".css"];

async function convertImages(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await convertImages(fullPath);
      continue;
    }

    const ext = path.extname(file).toLowerCase();
    if (!imageExts.includes(ext)) continue;

    const webpPath = fullPath.replace(ext, ".webp");

    if (!fs.existsSync(webpPath)) {
      await sharp(fullPath)
        .resize({
          width: 1400,
          withoutEnlargement: true,
        })
        .webp({ quality: 78 })
        .toFile(webpPath);

      const oldSize = fs.statSync(fullPath).size / 1024;
      const newSize = fs.statSync(webpPath).size / 1024;

      console.log(
        `Converted: ${path.basename(fullPath)} → ${path.basename(webpPath)} | ${oldSize.toFixed(
          1,
        )}KB → ${newSize.toFixed(1)}KB`,
      );
    } else {
      console.log(`Skipped: ${path.basename(webpPath)} already exists`);
    }
  }
}

function updateImports(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      updateImports(fullPath);
      continue;
    }

    const ext = path.extname(file).toLowerCase();
    if (!codeExts.includes(ext)) continue;

    let content = fs.readFileSync(fullPath, "utf8");
    const original = content;

    content = content.replace(
      /(["'`])([^"'`]*\.)(png|jpg|jpeg)(["'`])/gi,
      "$1$2webp$4",
    );

    if (content !== original) {
      fs.writeFileSync(fullPath, content, "utf8");
      console.log(`Updated imports: ${path.relative(rootDir, fullPath)}`);
    }
  }
}

async function main() {
  if (!fs.existsSync(assetsDir)) {
    console.error("Cannot find src/assets folder.");
    process.exit(1);
  }

  console.log("Converting images to WebP...");
  await convertImages(assetsDir);

  console.log("Updating imports to WebP...");
  updateImports(srcDir);

  console.log("Done.");
}

main().catch((err) => {
  console.error("Failed:", err);
});
