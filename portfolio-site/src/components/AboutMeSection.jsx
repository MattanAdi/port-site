import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./AboutMeOverlay.css";

const buildAssetPath = (filename) => {
  const baseUrl = import.meta.env.BASE_URL || "/";
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const normalizedFilename = filename.startsWith("/") ? filename.slice(1) : filename;
  return `${normalizedBase}${normalizedFilename}`;
};

function AboutMeSection() {
  const heroRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Staggered entrance animation
    const tl = gsap.timeline({ delay: 0.2 });
    
    tl.fromTo(".hero-greeting", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(".hero-name-char",
      { opacity: 0, y: 80, rotateX: -90 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.05, ease: "back.out(1.7)" },
      "-=0.4"
    )
    .fromTo(".hero-tagline",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    )
    .fromTo(".hero-intro",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    )
    .fromTo(".hero-image-wrapper",
      { opacity: 0, scale: 0.8, rotate: -5 },
      { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: "elastic.out(1, 0.5)" },
      "-=0.8"
    )
    .fromTo(".hero-scroll-indicator",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
      "-=0.3"
    );

    // Floating animation for decorative elements
    gsap.to(".floating-shape", {
      y: "random(-20, 20)",
      x: "random(-10, 10)",
      rotation: "random(-10, 10)",
      duration: "random(3, 5)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: 0.5,
        from: "random"
      }
    });

  }, []);

  const nameChars = "MATTAN ADI".split("");

  return (
    <section id="about-me" className="about-me-section-new" aria-label="About Mattan Adi" ref={heroRef}>
      {/* Floating Background Shapes */}
      <div className="floating-shapes">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
      </div>

      {/* Hero Section */}
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-greeting">Hello, I'm</span>
          <h1 className="hero-name" ref={nameRef}>
            {nameChars.map((char, i) => (
              <span key={i} className="hero-name-char">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
          <div className="hero-tagline">
            <span className="tagline-word">Developer</span>
            <span className="tagline-divider">◆</span>
            <span className="tagline-word">Sales Ops</span>
            <span className="tagline-divider">◆</span>
            <span className="tagline-word">Builder</span>
          </div>
          <p className="hero-intro">
            I build clean, functional products that bridge technology and real-world solutions—
            turning ideas into efficient, user-friendly experiences.
          </p>
        </div>
        
        <div className="hero-image-wrapper">
          <div className="hero-image-frame">
            <img
              src={buildAssetPath("DSCF6463-2.JPG")}
              alt="Mattan Adi"
              className="hero-image"
              loading="eager"
            />
          </div>
          <div className="hero-image-accent"></div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator">
        <span>Scroll to explore</span>
        <div className="scroll-arrow">↓</div>
      </div>

      {/* About Sections */}
      <div className="about-sections">
        {/* Background */}
        <section className="about-card about-card--wide">
          <div className="about-card-number">01</div>
          <div className="about-card-content">
            <h2 className="about-card-title">Background</h2>
            <div className="about-card-text">
              <p>
                Born in Staten Island, New York, and raised in the U.S. until age 15, when I moved
                to Israel through the NA'ALE program. I attended boarding school until 18, then
                served in the Israeli military as a combat engineer.
              </p>
              <p>
                Since then, I've built experience across customer-facing and operations roles,
                discovering a passion for development that combines technical skills with
                practical problem-solving.
              </p>
            </div>
            <div className="about-card-images">
              <img src={buildAssetPath("naale.jpg")} alt="NA'ALE" loading="lazy" />
              <img src={buildAssetPath("army.jpg")} alt="Military" loading="lazy" />
            </div>
          </div>
        </section>

        {/* Passions */}
        <section className="about-card">
          <div className="about-card-number">02</div>
          <div className="about-card-content">
            <h2 className="about-card-title">Passions</h2>
            <div className="about-card-text">
              <p>
                Outside work—cooking, hiking Israel, traveling. Curious about history
                and how it shapes today.
              </p>
              <p>
                On tech—building projects, experimenting with AI, improving workflows.
                Drawn to elegant solutions.
              </p>
            </div>
            <div className="about-card-media">
              <img src={buildAssetPath("IMG_0677.GIF")} alt="Passions" loading="lazy" />
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="about-card">
          <div className="about-card-number">03</div>
          <div className="about-card-content">
            <h2 className="about-card-title">Vision</h2>
            <div className="about-card-text">
              <p>
                Building technology that makes processes smarter. Combining operations
                experience with development to design workflows that genuinely improve
                how people work.
              </p>
              <p>
                Creating solutions that are elegant, practical, and meaningful.
              </p>
            </div>
            <div className="about-card-media">
              <img src={buildAssetPath("thats-so-raven-raven-symone.gif")} alt="Vision" loading="lazy" />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default AboutMeSection;
