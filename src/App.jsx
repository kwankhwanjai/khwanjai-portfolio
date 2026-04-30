import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import QRCodeImport from "react-qr-code";
import emailjs from "@emailjs/browser";
import picport1 from "./assets/picport1.webp";
import darkback from "./assets/darkback.webp";
import eyeswhite from "./assets/eyeswhite.webp";
import Ghost from "./assets/ghost.webp";
import ctrlg from "./assets/CTRLG.webp";
import iren from "./assets/iren.webp";
import intern from "./assets/intern.webp";
import janrawe from "./assets/janrawe.webp";
import jan01 from "./assets/ja01.webp";
import jan02 from "./assets/ja02.webp";
import cer01 from "./assets/cer01.webp";
import cer02 from "./assets/cer02.webp";
import cer03 from "./assets/cer03.webp";
import cer04 from "./assets/cer04.webp";

const QRCodeComponent = QRCodeImport.default || QRCodeImport;

const homeMenu = [
  { label: "HOME", key: "home" },
  { label: "PROJECTS", key: "projects" },
  { label: "ABOUT", key: "about" },
  { label: "SKILLS", key: "skills" },
  { label: "CONTACT", key: "contact" },
];
const portfolioServices = [
  {
    id: "01",
    title: "WEB DEVELOPMENT",
    text: "We build refined, high-performance websites tailored to your brand's needs, ensuring seamless functionality and striking design to captivate your audience.",
    featured: false,
    wide: false,
  },
  {
    id: "02",
    title: "DIGITAL MARKETING STRATEGIES",
    text: "Harness the power of targeted digital campaigns designed to maximize your online reach and drive conversions, with our data-driven approach delivering measurable results every time.",
    featured: false,
    wide: true,
  },
  {
    id: "03",
    title: "CREATIVE DESIGN SERVICE",
    text: "From eye-catching visuals to intuitive user experiences, our creative design services breathe life into your brand, ensuring memorable interactions that resonate with your audience.",
    featured: true,
    wide: false,
  },
  {
    id: "04",
    title: "E-COMMERCE",
    text: "Elevate your retail experience with our comprehensive e-commerce solutions, from user-friendly interfaces to secure payment gateways, empowering businesses to thrive in the digital marketplace.",
    featured: false,
    wide: false,
  },
];

const topCards = [
  {
    id: "01",
    title: "KHWANJAI",
    image: picport1,
    loading: "eager",
    meta: ["CERTIFICATES"],
  },
  {
    id: "02",
    title: "SELECTED PROJECT",
    image: darkback,
    meta: ["WEB PROJECT", "NSC 2025"],
  },
];
export default function PortfolioSite() {
  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.pageYOffset - 110;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8 lg:px-10 pb-16">
        <SharedHeader navigate={scrollToSection} />
        <HomePage />
      </div>
    </div>
  );
}
function EyeHoverCard() {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [offset, setOffset] = useState({
    eyeX: 0,
    eyeY: 0,
    glowX: 50,
    glowY: 50,
    rotateX: 0,
    rotateY: 0,
    bgX: 0,
    bgY: 0,
  });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(
      () => {
        setBlink(true);
        setTimeout(() => setBlink(false), 160);
      },
      2600 + Math.random() * 1800,
    );

    return () => clearInterval(blinkInterval);
  }, []);

  const handleMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const centeredX = px - 0.5;
    const centeredY = py - 0.5;

    setHovered(true);
    setOffset({
      eyeX: centeredX * 10,
      eyeY: centeredY * 8,
      glowX: px * 100,
      glowY: py * 100,
      rotateX: centeredY * -6,
      rotateY: centeredX * 8,
      bgX: centeredX * 8,
      bgY: centeredY * 8,
    });
  };

  const handleLeave = () => {
    setHovered(false);
    setOffset({
      eyeX: 0,
      eyeY: 0,
      glowX: 50,
      glowY: 50,
      rotateX: 0,
      rotateY: 0,
      bgX: 0,
      bgY: 0,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={() => setHovered(true)}
      className="relative h-full w-full overflow-hidden bg-black"
      style={{ perspective: "1200px" }}
    >
      <div
        className="relative h-full w-full transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${offset.rotateX}deg) rotateY(${offset.rotateY}deg) scale(${hovered ? 1.015 : 1})`,
          transformStyle: "preserve-3d",
        }}
      >
        <img
          src={darkback}
          loading="lazy"
          decoding="async"
          alt="Selected project background"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${offset.bgX}px, ${offset.bgY}px) scale(${hovered ? 1.04 : 1})`,
          }}
        />

        <img
          src={eyeswhite}
          loading="lazy"
          decoding="async"
          alt="Eyes"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-150 ease-out"
          style={{
            transform: `translate(${offset.eyeX}px, ${offset.eyeY}px) scaleY(${blink ? 0.08 : 1})`,
            transformOrigin: "center center",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(circle at ${offset.glowX}% ${offset.glowY}%, rgba(255,255,255,0.16), rgba(255,255,255,0.05) 18%, transparent 42%)`,
            mixBlendMode: "screen",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0.35,
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.05), transparent 28%, transparent 70%, rgba(0,0,0,0.28))",
          }}
        />
      </div>
    </div>
  );
}

function SharedHeader({ navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (key) => {
    setMenuOpen(false);

    requestAnimationFrame(() => {
      setTimeout(() => {
        navigate(key);
      }, 80);
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md">
      <div className="border-b border-white/8">
        <div className="flex items-center justify-between pt-5 pb-4 text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.24em]">
          <div className="flex w-full items-center justify-between md:hidden">
            <button
              onClick={() => handleNavigate("home")}
              className="font-semibold text-white"
            >
              KHWANJAI
            </button>

            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="rounded-full border border-white/20 px-4 py-2 text-[10px] tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
            >
              {menuOpen ? "CLOSE" : "MENU"}
            </button>
          </div>

          <div className="hidden w-full items-start justify-between md:flex">
            <nav className="flex gap-6 md:gap-10 lg:gap-14 font-semibold">
              {homeMenu.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavigate(item.key)}
                  className="text-white/70 transition hover:text-white"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="text-right leading-tight font-semibold tracking-[0.22em] text-white/85">
              <div>○ &nbsp; MADE BY</div>
              <div className="mt-1">KHWANJAI</div>
            </div>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{
            height: menuOpen ? "auto" : 0,
            opacity: menuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden md:hidden"
        >
          <nav className="flex flex-col pb-4">
            {homeMenu.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavigate(item.key)}
                className="flex items-center justify-between border-t border-white/8 py-3 text-left text-[11px] uppercase tracking-[0.2em] text-white/70 transition hover:text-white"
              >
                <span>{item.label}</span>
                <span>→</span>
              </button>
            ))}
          </nav>
        </motion.div>
      </div>
    </header>
  );
}
function HomePage() {
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  function handleSendEmail(e) {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const newErrors = {};

    if (!name) newErrors.name = "Please enter your name";
    if (!email) {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!message) newErrors.message = "Please enter your message";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus("");
      return;
    }

    setErrors({});

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("Missing EmailJS environment variables");
      setStatus("error");
      return;
    }

    setSending(true);
    setStatus("");

    emailjs
      .sendForm(serviceId, templateId, form, {
        publicKey,
      })
      .then(() => {
        setStatus("sent");
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        setStatus("error");
      })
      .finally(() => {
        setSending(false);
      });
  }
  return (
    <main className="space-y-8 md:space-y-10">
      <section>
        <HeroSection />
      </section>

      <section>
        <MiddleSection />
      </section>

      <section>
        <ServicesSection />
      </section>

      <section>
        <BottomSection />
      </section>

      <section className="px-3 pt-16 pb-10 sm:px-0">
        <div className="mx-auto mt-16 max-w-[760px]"></div>
        <div className="mx-auto max-w-[760px]">
          <div className="overflow-visible rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8 transition hover:border-white/20 hover:bg-white/[0.05]">
            <div className="mb-6">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                Contact
              </div>
              <h2
                id="contact"
                className="mt-2 scroll-mt-28 md:scroll-mt-32 text-[26px] md:text-[34px] font-light tracking-tight"
              >
                Let’s Connect
              </h2>
              <p className="mt-2 text-sm text-white/40 max-w-[420px]">
                Seeking opportunities to grow and contribute as a developer.
              </p>
            </div>

            <div className="space-y-2 text-[13px] text-white/70">
              <p>Email — himari.oork@gmail.com</p>
              <p>Phone — 061-146-0405</p>
              <p>Location — Chiang Mai, Thailand</p>
            </div>

            <div className="mt-4 mb-3 flex justify-center gap-4 text-white/40">
              <a
                href="https://www.facebook.com/kkwankhwanjai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook profile"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-white hover:text-white hover:scale-110
focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-black"
              >
                <i className="ri-facebook-line text-[16px]" />
              </a>

              <a
                href="https://www.instagram.com/k.kwan_u/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-white hover:text-white hover:scale-110
focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-black"
              >
                <i className="ri-instagram-line text-[16px]" />
              </a>

              <a
                href="https://www.linkedin.com/in/khwanjai-koaleta-a2a5b9379/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-white hover:text-white hover:scale-110
focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-black"
              >
                <i className="ri-linkedin-line text-[16px]" />
              </a>

              <a
                href="https://x.com/kwankhwanjai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter) profile"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-white hover:text-white hover:scale-110
focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-black"
              >
                <i className="ri-twitter-x-line text-[16px]" />
              </a>
            </div>

            <form
              onSubmit={handleSendEmail}
              noValidate
              className="mt-2 flex flex-col gap-3"
            >
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className={`w-full rounded-full border bg-transparent px-5 py-2.5 text-sm text-white placeholder-white/30 outline-none transition ${
                    errors.name
                      ? "border-red-400 focus:border-red-400"
                      : "border-white/15 focus:border-white/40"
                  }`}
                />
                {errors.name && (
                  <p className="mt-2 px-2 text-[11px] uppercase tracking-[0.12em] text-red-400/90">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className={`w-full rounded-full border bg-transparent px-5 py-2.5 text-sm text-white placeholder-white/30 outline-none transition ${
                    errors.email
                      ? "border-red-400 focus:border-red-400"
                      : "border-white/15 focus:border-white/40"
                  }`}
                />
                {errors.email && (
                  <p className="mt-2 px-2 text-[11px] uppercase tracking-[0.12em] text-red-400/90">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Your message"
                  rows={5}
                  className={`w-full rounded-[24px] border bg-transparent px-5 py-4 text-sm text-white placeholder-white/30 outline-none transition ${
                    errors.message
                      ? "border-red-400 focus:border-red-400"
                      : "border-white/15 focus:border-white/40"
                  }`}
                />
                {errors.message && (
                  <p className="mt-2 px-2 text-[11px] uppercase tracking-[0.12em] text-red-400/90">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={sending}
                className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] disabled:cursor-not-allowed disabled:opacity-60
focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-black focus:transition"
              >
                {sending ? "Sending..." : "Send"}
              </button>

              {status === "sent" && (
                <div
                  className="mt-3 flex justify-center"
                  role="status"
                  aria-live="polite"
                >
                  <p className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70">
                    ✓ Message sent successfully
                  </p>
                </div>
              )}

              {status === "error" && (
                <div
                  className="mt-3 flex justify-center"
                  role="alert"
                  aria-live="assertive"
                >
                  <p className="rounded-full border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm text-red-300">
                    Failed to send. Please try again.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
function HeroSection() {
  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.7fr_0.7fr] lg:items-start">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="pt-8 md:pt-12 lg:pt-20"
      >
        <div className="max-w-[620px]">
          <p
            id="home"
            className="scroll-mt-28 md:scroll-mt-32 text-[14vw] leading-[0.88] md:text-[90px] lg:text-[110px] font-light tracking-tight uppercase"
          >
            WELCOME
          </p>

          <div className="mt-3 flex items-end gap-4 md:gap-8 lg:gap-10 text-[11vw] leading-none md:text-[70px] lg:text-[86px] uppercase">
            <span className="font-light">to</span>
          </div>

          <p className="mt-2 text-[11vw] leading-[0.92] md:text-[70px] lg:text-[84px] font-light uppercase">
            MY SPACE
          </p>
        </div>

        <div className="mt-10 flex items-end justify-between gap-6 text-[9px] md:text-[11px] uppercase tracking-[0.2em] text-white/85">
          <div className="whitespace-nowrap">
            — KHWANJAI KOALETA, COMPUTER SCIENCE.
          </div>
        </div>
      </motion.div>

      {topCards.map((card, index) => (
        <motion.article
          key={card.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 + index * 0.12 }}
          className="relative pt-6 lg:pt-20"
        >
          <div className="mb-2 text-[10px] md:text-xs uppercase tracking-[0.18em] text-white/80">
            {card.title}
          </div>

          <div className="relative h-[390px] overflow-hidden bg-white/5 flex flex-col">
            {card.id === "02" ? (
              <a
                href="https://carelia.sunny420x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="relative h-[390px] overflow-hidden bg-white/5 cursor-pointer">
                  <div className="h-full w-full transition duration-700 group-hover:scale-[1.03]">
                    <EyeHoverCard />
                  </div>

                  <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10 group-hover:ring-white/25 transition" />

                  <div className="pointer-events-none absolute left-0 bottom-3 z-10 text-5xl md:text-6xl font-light tracking-tight text-white/90">
                    {card.id}
                  </div>
                </div>
              </a>
            ) : (
              <div className="relative h-[390px] overflow-hidden bg-white/5">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover grayscale transition duration-700 hover:scale-[1.03]"
                />

                <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />

                <div className="pointer-events-none absolute left-0 bottom-3 z-10 text-5xl md:text-6xl font-light tracking-tight text-white/90">
                  {card.id}
                </div>
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />

            <div className="pointer-events-none absolute left-0 bottom-3 z-10 text-5xl md:text-6xl font-light tracking-tight text-white/90">
              {card.id}
            </div>
          </div>

          {card.id === "01" ? (
            <div className="min-h-[120px]">
              <CertificateToggle />
            </div>
          ) : (
            <div className="mt-2 flex justify-between text-[9px] md:text-[10px] uppercase tracking-[0.18em] text-white/65">
              <span>{card.meta[0]}</span>
              <span>{card.meta[1]}</span>
            </div>
          )}
        </motion.article>
      ))}
    </section>
  );
}

function CertificateToggle() {
  const [open, setOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef(null);

  const drag = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });

  const certificates = [
    {
      id: 4,
      image: cer04,
      title: "SOFTWARE TESTING",
      subtitle: "INTERNSHIP CERTIFICATE",
    },
    {
      id: 2,
      image: cer02,
      title: "MOBILE DEVELOPMENT",
      subtitle: "FLUTTER • FIREBASE",
    },
    {
      id: 3,
      image: cer03,
      title: "BLOCKCHAIN WORKSHOP",
      subtitle: "PARTICIPATION CERTIFICATE",
    },
    {
      id: 1,
      image: cer01,
      title: "WEB DEVELOPMENT",
      subtitle: "NEXT.JS • MYSQL",
    },
  ];

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !open) return;

    el.scrollLeft = 0;
    requestAnimationFrame(checkScroll);

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [open]);

  const scrollCertificates = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -188 : 188,
      behavior: "smooth",
    });

    setTimeout(checkScroll, 350);
  };

  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;

    drag.current = {
      isDown: true,
      startX: e.pageX - scrollRef.current.offsetLeft,
      scrollLeft: scrollRef.current.scrollLeft,
      moved: false,
    };
  };

  const handleMouseMove = (e) => {
    if (!drag.current.isDown || !scrollRef.current) return;

    e.preventDefault();

    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - drag.current.startX) * 1.2;

    if (Math.abs(walk) > 5) {
      drag.current.moved = true;
    }

    scrollRef.current.scrollLeft = drag.current.scrollLeft - walk;
  };

  const stopDrag = () => {
    drag.current.isDown = false;
  };

  return (
    <div className="mt-2 relative z-20">
      <style>{`.cert-scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
      <div className="flex items-center justify-between gap-3 text-[9px] md:text-[10px] uppercase tracking-[0.18em] text-white/65">
        <div className="leading-relaxed">
          <div>CERTIFICATES</div>
          <div className="mt-1 text-white/40">CLICK TO VIEW CERTIFICATES</div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="shrink-0 rounded-full border border-white/25 px-4 py-2 text-[10px] md:px-5 md:py-3 md:text-xs uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
        >
          {open ? "CLOSE CERTIFICATES" : "VIEW CERTIFICATES"}
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
          marginTop: open ? 14 : 0,
        }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="mx-auto w-full max-w-[542px]">
          <div className="mb-3 flex justify-end gap-2">
            {canScrollLeft && (
              <button
                type="button"
                onClick={() => scrollCertificates("left")}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black text-white/70 transition hover:bg-white hover:text-black"
                aria-label="Previous certificate"
              >
                ‹
              </button>
            )}

            {canScrollRight && (
              <button
                type="button"
                onClick={() => scrollCertificates("right")}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black text-white/70 transition hover:bg-white hover:text-black"
                aria-label="Next certificate"
              >
                ›
              </button>
            )}
          </div>

          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            className="cert-scrollbar-hide flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 active:cursor-grabbing"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {certificates.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (drag.current.moved) return;
                  setSelectedCertificate(item);
                }}
                className="w-[170px] shrink-0 snap-start text-left group"
              >
                <div className="overflow-hidden rounded-[14px] border border-white/10 bg-white/5 transition duration-300 group-hover:border-white/25">
                  <img
                    src={item.image}
                    loading="lazy"
                    alt={item.title}
                    draggable="false"
                    className="aspect-[4/3] w-full object-cover bg-white grayscale transition duration-300 group-hover:grayscale-0"
                  />
                </div>

                <p className="mt-2 whitespace-nowrap text-[9px] md:text-[10px] uppercase tracking-[0.18em] text-white/50 transition group-hover:text-white/80">
                  {item.title}
                </p>
                <p className="mt-1 whitespace-nowrap text-[8px] md:text-[9px] uppercase tracking-[0.16em] text-white/30">
                  {item.subtitle}
                </p>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {selectedCertificate && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-hidden rounded-[20px] border border-white/10 bg-black/80 p-3 md:p-4">
              <img
                src={selectedCertificate.image}
                alt={selectedCertificate.title}
                className="max-h-[78vh] w-full object-contain rounded-[14px] bg-white"
              />

              <div className="pt-4 text-center">
                <p className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-white/75">
                  {selectedCertificate.title}
                </p>
                <p className="mt-1 text-[9px] md:text-[10px] uppercase tracking-[0.16em] text-white/35">
                  {selectedCertificate.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MiddleSection() {
  const cardClass =
    "w-full max-w-full overflow-visible rounded-[24px] md:rounded-[28px] lg:rounded-[34px] border border-white/25 p-5 md:p-6 lg:p-7 min-h-full flex flex-col justify-between";
  const infoTextClass =
    "mt-1 space-y-2 text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-white/78 leading-relaxed";

  const vocationalImages = [
    { src: janrawe, label: "VOCATIONAL CERTIFICATE BUSINESS IN HEALTHCARE" },
    { src: jan01, label: "EXTRACURRICULAR ACTIVITY STUDENT ENGAGEMENT" },
    { src: jan02, label: "EXTRACURRICULAR ACTIVITY STUDENT ENGAGEMENT" },
  ];

  const universityImages = [
    { src: ctrlg, label: "CTRL G × UNIVERSITY" },
    { src: iren, label: "UX/UI WORKSHOP IRENE PEREYRA" },
    { src: intern, label: "PDKM INTERNSHIP" },
  ];

  return (
    <section className="pt-4 md:pt-8 lg:pt-10 pb-2 md:pb-4 lg:pb-6 overflow-x-hidden overflow-y-visible px-3 sm:px-0">
      <div className="flex items-center justify-center py-6 md:py-10 lg:py-12 text-center">
        <div>
          <div className="text-[7px] md:text-[10px] uppercase tracking-[0.28em] md:tracking-[0.35em] text-white/35">
            — academic background —
          </div>

          <h2
            id="about"
            className="mt-2 md:mt-3 scroll-mt-28 md:scroll-mt-32 text-[24px] md:text-[36px] lg:text-[52px] font-light uppercase tracking-[0.12em] md:tracking-[0.15em] text-white/95"
          >
            Education
          </h2>
        </div>
      </div>

      <section className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-2 lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-4 h-full"
        >
          <div className="text-left text-[8px] md:text-[10px] uppercase tracking-[0.14em] md:tracking-[0.18em] text-white/70">
            ( Education ) &nbsp; Vocational Certificate
          </div>

          <div className={cardClass}>
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-lg md:text-2xl uppercase tracking-[0.12em]">
                    Vocational Certificate
                  </div>
                  <div className="mt-1 text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-white/60">
                    Business in Healthcare
                  </div>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xs tracking-[0.12em] shrink-0">
                  01
                </div>
              </div>

              <div className="mt-5">
                <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 md:grid md:grid-cols-3 md:gap-3 md:overflow-visible">
                  {vocationalImages.map((item, index) => (
                    <div
                      key={index}
                      className="snap-start shrink-0 w-[82%] sm:w-[64%] md:w-auto md:shrink rounded-[16px] bg-white/5 overflow-hidden border border-white/8"
                    >
                      <div className="h-[210px] md:h-[180px] overflow-hidden">
                        <img
                          src={item.src}
                          alt={item.label}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover grayscale transition duration-500 hover:grayscale-0"
                        />
                      </div>

                      <div className="border-t border-white/8 px-3 py-3 text-center">
                        <span className="block text-[9px] md:text-[10px] uppercase tracking-[0.18em] text-white/55 leading-relaxed">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={infoTextClass}>
              <p>Institution — Janrawee Vocational College</p>
              <p>Program — Business in Healthcare</p>
              <p>Level — Vocational Certificate (ปวช)</p>
              <p>Year — 2021</p>
              <p>GPA — 3.50</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="space-y-4 h-full"
        >
          <div className="text-left sm:text-right text-[8px] md:text-[10px] uppercase tracking-[0.14em] md:tracking-[0.18em] text-white/70">
            ( Education ) &nbsp; University
          </div>

          <div className={cardClass}>
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-lg md:text-2xl uppercase tracking-[0.12em]">
                    University
                  </div>
                  <div className="mt-1 text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-white/60">
                    Bachelor&apos;s Degree
                  </div>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xs tracking-[0.12em] shrink-0">
                  02
                </div>
              </div>

              <div className="mt-5">
                <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 md:grid md:grid-cols-3 md:gap-3 md:overflow-visible">
                  {universityImages.map((item, index) => (
                    <div
                      key={index}
                      className="snap-start shrink-0 w-[82%] sm:w-[64%] md:w-auto md:shrink rounded-[16px] bg-white/5 overflow-hidden border border-white/8"
                    >
                      <div className="h-[210px] md:h-[180px] overflow-hidden">
                        <img
                          src={item.src}
                          alt={item.label}
                          className="h-full w-full object-cover grayscale transition duration-500 hover:grayscale-0"
                        />
                      </div>

                      <div className="border-t border-white/8 px-3 py-3 text-center">
                        <span className="block text-[9px] md:text-[10px] uppercase tracking-[0.18em] text-white/55 leading-relaxed">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={infoTextClass}>
              <p>University — Chiang Mai Rajabhat University</p>
              <p>Faculty — Faculty of Science and Technology</p>
              <p>Major — Computer Science</p>
              <p>Status — Graduated</p>
              <p>GPA — 3.45</p>
            </div>
          </div>
        </motion.div>
      </section>
    </section>
  );
}

function ServicesSection() {
  const projects = [
    {
      id: "01",
      title: "POS System",
      description:
        "A real-time point of sale system built for second-hand retail. Fast checkout, stock tracking, and seamless transaction flow",
      icon: Ghost,
      demo: "https://example.com/then",
      github: "https://github.com/yourname/then",
      comingSoon: true,
    },
    {
      id: "02",
      title: "SOMEZORN",
      description:
        "A curated second-hand fashion platform focused on minimal browsing and smooth shopping experience.",
      icon: Ghost,
      demo: "https://example.com/idle",
      github: "https://github.com/yourname/idle",
      comingSoon: true,
    },
    {
      id: "03",
      title: "TASK MANAGER",
      description:
        "A lightweight task management system with intuitive drag-and-drop interaction and structured workflow.",
      icon: Ghost,
      demo: "https://example.com/aim",
      github: "https://github.com/yourname/aim",
      comingSoon: true,
    },
    {
      id: "04",
      title: "LootFlow",
      description:
        "A streamlined game item trading system with cart, order tracking, and real-time delivery updates.",
      icon: Ghost,
      demo: "https://example.com/ease",
      github: "https://github.com/yourname/ease",
      comingSoon: true,
    },
  ];

  return (
    <section className="pt-16 md:pt-20 lg:pt-24 pb-10 md:pb-14 lg:pb-16 px-3 sm:px-0">
      <div className="mx-auto max-w-[760px]">
        <div className="text-center">
          <div className="mx-auto w-fit rounded-full border border-white/15 px-4 py-1 text-[10px] uppercase tracking-[0.28em] text-white/45">
            Selected Projects
          </div>

          <h2
            id="projects"
            className="mt-6 scroll-mt-28 md:scroll-mt-32 text-[30px] md:text-[42px] lg:text-[52px] font-light tracking-[-0.03em] text-white"
          >
            Projects
          </h2>

          <p className="mx-auto mt-3 max-w-[520px] text-sm md:text-[17px] leading-relaxed text-white/38">
            Live demos, source code, and mobile preview for selected work.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 items-start">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="relative self-start overflow-hidden rounded-[26px] bg-white/[0.04] p-5 md:p-6 ring-1 ring-white/[0.05] transition hover:bg-white/[0.06]">
      <div className="transition duration-300">
        <div className="flex items-start justify-between gap-3">
          <div className="group relative h-14 w-14 shrink-0">
            {/* glow วิ่งรอบกรอบ */}
            <div
              className="absolute inset-0 rounded-[16px] p-[1.5px] 
    bg-[conic-gradient(from_0deg,rgba(255,255,255,0.6),transparent,rgba(255,255,255,0.6))] 
    animate-[spin_6s_linear_infinite]"
            >
              <div className="h-full w-full rounded-[14px] bg-black" />
            </div>

            {/* soft glow ฟุ้ง */}
            <div className="absolute inset-0 rounded-[16px] blur-md bg-white/20 opacity-20 group-hover:opacity-50 transition duration-500" />

            {/* icon (ลอย + หมุนเบาๆ) */}
            <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-[16px]">
              <img
                src={project.icon}
                alt={project.title}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.src = Ghost;
                }}
                className="h-full w-full object-contain p-2 
      animate-[float_3s_ease-in-out_infinite] 
      transition duration-500 
      group-hover:scale-110 group-hover:rotate-3
      group-hover:rotate-[6deg] group-hover:scale-110"
              />
            </div>
          </div>

          {project.comingSoon && (
            <div className="text-[11px] italic tracking-[0.02em] text-white/35">
              Coming Soon ✦
            </div>
          )}
        </div>

        <div className="mt-5">
          <h3 className="text-[26px] font-medium leading-none text-white">
            {project.title}
          </h3>

          <p className="mt-4 min-h-[88px] text-[14px] leading-relaxed text-white/40">
            {project.description}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-white px-5 py-2.5 text-[13px] font-medium text-black transition hover:opacity-80"
          >
            Live Demo
          </a>

          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 px-5 py-2.5 text-[13px] text-white/80 transition hover:bg-white/10"
          >
            GitHub
          </a>

          <button
            type="button"
            onClick={() => setShowQR((prev) => !prev)}
            aria-label="Toggle QR code preview"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/50 transition hover:scale-110 hover:text-white hover:border-white"
          >
            ◻︎
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          showQR ? "max-h-[140px] opacity-100 mt-5" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex justify-center">
          <div className="rounded-[16px] bg-white p-3 shadow-[0_10px_40px_rgba(255,255,255,0.08)]">
            <QRCodeComponent value={project.demo} size={110} />
          </div>
        </div>
      </div>
    </div>
  );
}

function BottomSection() {
  const skillGroups = [
    {
      title: "Fullstack Dev",
      items: [
        "HTML",
        "CSS",
        "JavaScript",
        "Python",
        "php",
        "React",
        "Node.js",
        "API",
        "Tailwind",
        "Next.js",
        "Angular",
      ],
    },
    {
      title: "Tester",
      items: [
        "Manual Testing",
        "Test Case Design",
        "Bug Tracking",
        "Postman",
        "QA Flow",
      ],
    },
    {
      title: "Tools",
      items: ["GitHub", "VS Code", "Vite", "Figma", "MySQL", "XAMPP"],
    },
  ];
  const experiences = [
    {
      year: "2025",
      role: "Computer Science Graduate",
      place: "Chiang Mai Rajabhat University",
      description:
        "Graduated in Computer Science with a strong interest in frontend development, UI design, and building responsive digital experiences.",
    },
    {
      year: "2021",
      role: "Vocational Certificate",
      place: "Janrawee Vocational College",
      description:
        "Completed vocational studies in Business in Healthcare, developing discipline, communication skills, and a strong academic foundation.",
    },
  ];

  return (
    <section className="pt-2 md:pt-4 lg:pt-6">
      <div className="mx-auto max-w-[1120px]">
        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div className="mb-8">
            <h2
              id="skills"
              className="scroll-mt-28 md:scroll-mt-32 text-[32px] md:text-[42px] lg:text-[50px] font-light tracking-[-0.03em] text-white"
            >
              Skills &amp; Technologies
            </h2>
            <p className="mt-3 max-w-[560px] text-sm md:text-base leading-relaxed text-white/40">
              A selected set of tools and skills I use to build clean
              interfaces, responsive layouts, and thoughtful frontend
              experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {skillGroups.map((group, index) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-[22px] border border-white/10 bg-white/[0.02] px-5 py-5 transition hover:border-white/25 hover:bg-white/[0.04] hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]"
              >
                <h3 className="text-[22px] font-medium text-white">
                  {group.title}
                </h3>

                <div className="mt-5 flex flex-wrap gap-3">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/20 px-4 py-1.5 text-[12px] uppercase tracking-[0.12em] text-white/70 transition hover:border-white/50 hover:text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <ExperienceTimeline />
      </div>
    </section>
  );
}

function ServiceCard({ item, compact = false }) {
  return (
    <div
      className={`rounded-[22px] border px-5 md:px-6 py-5 md:py-6 transition ${
        item.featured
          ? "bg-white text-black border-white min-h-[190px]"
          : "bg-black text-white border-white/25 min-h-[190px]"
      } ${item.wide ? "md:col-span-1" : ""} ${compact ? "min-h-[210px]" : ""}`}
    >
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full border text-[9px] ${item.featured ? "border-black/20" : "border-white/25"}`}
      >
        {item.id}
      </div>
      <div className="mt-10">
        <h3 className="text-[18px] md:text-[20px] leading-tight font-medium uppercase tracking-tight max-w-[300px]">
          {item.title}
        </h3>
        <p
          className={`mt-4 text-[11px] md:text-xs leading-relaxed ${item.featured ? "text-black/70" : "text-white/68"}`}
        >
          {item.text}
        </p>
      </div>
    </div>
  );
}
function ExperienceTimeline() {
  const steps = [
    {
      title: "Vocational Certificate (Business in Healthcare)",
      subtitle: "Janrawee Vocational College",
      desc: "Studied Business in Healthcare, building discipline and communication skills. Worked as a nursing assistant with hands-on experience in wound care, home visits, and supporting health check-ups during COVID-19.Completed a 3-month internship at Ma Khuea Chae Subdistrict Health Promoting Hospital, and assisted in ATK screening for students.",
      side: "left",
    },
    {
      title: "NSC 2025 (Thailand)",
      subtitle: "Chiang Mai Rajabhat University",
      desc: "Bachelor’s Degree in Computer Science, with a focus on Frontend and UI Development Developed a web application, “Elderly and Disabled Caregiver Recruitment System,” featuring core functionalities such as search, chat, reviews, and job status tracking Participated in NSC 2025 (Thailand), advancing to the provincial round and receiving funding to compete at the regional level",
      side: "right",
    },
    {
      title: "Software Tester Intern",
      subtitle: "PDKM Co., Ltd. — Nextate System",
      desc: "Conducted end-to-end testing for the Nextate platform, including vehicle entry/exit systems and resident mobile applications Designed and executed test scenarios and test cases to validate system functionality and user workflows Performed manual testing and regression testing to ensure system stability after updates Tested APIs using Postman to verify data flow and backend integration Identified, documented, and tracked defects using structured bug reports and defect tracking processes Collaborated with developers to reproduce issues and ensure timely resolution Contributed to improving overall system reliability and user experience (UX)",
      side: "left",
    },
    {
      title: "Now",
      subtitle: "Ready to Work",
      desc: "Frontend Developer with a strong focus on UI and user experience, supported by hands-on experience in system testing and real-world projects. Eager to contribute to impactful products and grow within a professional development team.",
      side: "right",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const cards = document.querySelectorAll("[data-exp-step]");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const nextIndex = Number(
            visible[0].target.getAttribute("data-index"),
          );
          setActiveIndex(nextIndex);
        }
      },
      {
        threshold: 0.45,
        rootMargin: "-10% 0px -35% 0px",
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="pt-12 md:pt-14 pb-6 md:pb-10">
      <div className="mx-auto max-w-[900px]">
        <div className="mb-8 md:mb-10 text-center">
          <h2 className="text-[32px] md:text-[42px] font-light text-white">
            Experience
          </h2>
        </div>

        <div className="relative">
          {/* mobile line */}
          <div className="absolute left-5 top-0 h-full w-px bg-white/10 md:hidden" />

          {/* desktop base line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/10 md:block" />

          {/* desktop animated line */}
          <div
            className="absolute left-1/2 top-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/80 to-transparent transition-all duration-500 md:block"
            style={{
              height: `${((activeIndex + 1) / steps.length) * 100}%`,
              boxShadow: "0 0 14px rgba(255,255,255,0.45)",
            }}
          />

          <div className="space-y-14 md:space-y-20">
            {steps.map((step, index) => {
              const isActive = index <= activeIndex;

              return (
                <div
                  key={index}
                  data-exp-step
                  data-index={index}
                  className="relative"
                >
                  {/* MOBILE */}
                  <div className="flex items-start gap-5 md:hidden">
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black">
                      <div
                        className={`absolute h-10 w-10 rounded-full bg-white transition-all duration-500 ${
                          isActive ? "animate-ping opacity-20" : "opacity-0"
                        }`}
                      />
                      <div
                        className={`relative flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-500 ${
                          isActive
                            ? "bg-white text-black shadow-[0_0_22px_rgba(255,255,255,0.65)]"
                            : "bg-black text-white/70"
                        }`}
                      >
                        {index + 1}
                      </div>
                    </div>

                    <div
                      className={`pt-0.5 transition-all duration-500 ${
                        isActive
                          ? "opacity-100 translate-y-0"
                          : "opacity-40 translate-y-2"
                      }`}
                    >
                      <h3
                        className={`text-[18px] font-semibold transition-colors duration-500 ${
                          isActive ? "text-white" : "text-white/60"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`mt-1 text-sm transition-colors duration-500 ${
                          isActive ? "text-white/80" : "text-white/35"
                        }`}
                      >
                        {step.subtitle}
                      </p>
                      <p
                        className={`mt-3 text-sm leading-relaxed transition-colors duration-500 ${
                          isActive ? "text-white/55" : "text-white/25"
                        }`}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* DESKTOP */}
                  <div className="hidden min-h-[140px] items-center justify-between md:flex">
                    <div className="w-[45%]">
                      {step.side === "left" && (
                        <div
                          className={`pr-8 text-right transition-all duration-500 ${
                            isActive
                              ? "opacity-100 translate-y-0"
                              : "opacity-35 translate-y-2"
                          }`}
                        >
                          <h3
                            className={`text-[20px] font-semibold transition-colors duration-500 ${
                              isActive ? "text-white" : "text-white/60"
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p
                            className={`mt-1 text-sm transition-colors duration-500 ${
                              isActive ? "text-white/80" : "text-white/35"
                            }`}
                          >
                            {step.subtitle}
                          </p>
                          <p
                            className={`mt-3 text-sm leading-relaxed transition-colors duration-500 ${
                              isActive ? "text-white/55" : "text-white/25"
                            }`}
                          >
                            {step.desc}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="relative z-10 flex items-center justify-center">
                      <div
                        className={`absolute h-10 w-10 rounded-full bg-white transition-all duration-500 ${
                          isActive ? "animate-ping opacity-20" : "opacity-0"
                        }`}
                      />
                      <div
                        className={`relative flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-500 ${
                          isActive
                            ? "bg-white text-black border-white shadow-[0_0_22px_rgba(255,255,255,0.65)] scale-100"
                            : "bg-black text-white/70 border-white/20 scale-95"
                        }`}
                      >
                        {index + 1}
                      </div>
                    </div>

                    <div className="w-[45%]">
                      {step.side === "right" && (
                        <div
                          className={`pl-8 transition-all duration-500 ${
                            isActive
                              ? "opacity-100 translate-y-0"
                              : "opacity-35 translate-y-2"
                          }`}
                        >
                          <h3
                            className={`text-[20px] font-semibold transition-colors duration-500 ${
                              isActive ? "text-white" : "text-white/60"
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p
                            className={`mt-1 text-sm transition-colors duration-500 ${
                              isActive ? "text-white/80" : "text-white/35"
                            }`}
                          >
                            {step.subtitle}
                          </p>
                          <p
                            className={`mt-3 text-sm leading-relaxed transition-colors duration-500 ${
                              isActive ? "text-white/55" : "text-white/25"
                            }`}
                          >
                            {step.desc}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
