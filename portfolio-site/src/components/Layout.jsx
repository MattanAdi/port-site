import { useState } from "react";
import { useLocation } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import "./AboutMeOverlay.css";

function Layout({ children }) {
  const location = useLocation(); // kept in case we later want route-based behavior
  const [curtainsOpen, setCurtainsOpen] = useState(false);

  const baseUrl = import.meta.env.BASE_URL || "/";
  const chefLogoSrc = `${baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`}chef.png`;

  const sectionLinks = [
    { id: "companies", label: "Companies" },
    { id: "tools", label: "Tools & Technologies" },
    { id: "projects", label: "Projects" },
  ];

  const handleAboutClick = (e) => {
    e.preventDefault();
    setCurtainsOpen(true);
  };

  const handleCloseCurtains = () => {
    setCurtainsOpen(false);
  };

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-left">
          <img src={chefLogoSrc} alt="Chef logo" className="top-bar-logo" />
        </div>
        <div className="top-bar-right">
          <DarkModeToggle />
        </div>
      </div>

      <nav className="vertical-section-nav" aria-label="Jump to sections">
        <button 
          className="vertical-section-nav__about-link" 
          onClick={handleAboutClick}
          type="button"
        >
          About Me
        </button>
        {sectionLinks.map((link) => (
          <a key={link.id} href={`#${link.id}`}>
            {link.label}
          </a>
        ))}
        <a className="vertical-section-nav__welcome-link" href="/welcome">
          Welcome page
        </a>
      </nav>

      {children}

      {/* About Me Curtain Overlay */}
      <div className={`about-overlay ${curtainsOpen ? "about-overlay--active" : ""}`}>
        {/* About Me Content - Behind the curtains */}
        <div className={`about-me-content ${curtainsOpen ? "about-me-content--visible" : ""}`}>
          <button className="about-me-close" onClick={handleCloseCurtains} aria-label="Close">
            ✕
          </button>
          
          <div className="about-me-scroll">
            {/* Hero Section */}
            <section className="about-hero">
              <div className="about-hero-text">
                <span className="about-me-greeting">Hello, I'm</span>
                <h1 className="about-me-name">Mattan Adi</h1>
                <div className="about-me-tagline">Developer • Sales Specialist • Workflow Innovations</div>
                <p className="about-hero-intro">
                  Developer and problem solver specializing in sales operations and workflow innovations. 
                  I build clean, functional products that bridge technology and real-world solutions, 
                  turning ideas into efficient, user-friendly experiences.
                </p>
              </div>
              <img 
                src={`${baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`}DSCF6463-2.JPG`}
                alt="Mattan Adi"
                className="about-hero-image"
              />
            </section>

            {/* Topic 1 - Background */}
            <section className="about-background-section">
              <div className="about-background-header">
                <span className="about-topic-label">01</span>
                <h2 className="about-topic-title">Background</h2>
              </div>

              <div className="about-background-text-wide">
                <p>
                  I was born in Staten Island, New York, and raised in the U.S. until age 15, when I 
                  moved to Israel through the NA'ALE program. There, I attended a boarding school until 
                  18, after which I served in the Israeli military as a combat engineer.
                </p>
                <p>
                  Since then, I've continued to live in Israel, gaining experience in multiple 
                  customer-facing and operations roles. Along the way, I discovered a passion for 
                  development, combining my technical skills with practical problem-solving and a 
                  strong understanding of workflows and real-world systems.
                </p>
              </div>
              
              <div className="about-background-images-row">
                <img 
                  src={`${baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`}naale.jpg`}
                  alt="NA'ALE boarding school"
                  className="about-background-img"
                />
                <img 
                  src={`${baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`}army.jpg`}
                  alt="Israeli military service"
                  className="about-background-img"
                />
              </div>
            </section>

            {/* Topic 2 - Passions */}
            <section className="about-topic">
              <div className="about-topic-text">
                <span className="about-topic-label">02</span>
                <h2 className="about-topic-title">Passions & Interests</h2>
                <p>
                  Outside of work, I enjoy cooking, staying active, hiking through Israel, and traveling. 
                  I have a curiosity for history and how it shapes the world we live in today.
                </p>
                <p>
                  On the tech side, I like building projects, experimenting with AI tools, and finding 
                  ways to improve workflows. I'm drawn to problem-solving and creating things that are 
                  both practical and well-designed.
                </p>
              </div>
              <img 
                src={`${baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`}IMG_0677.GIF`}
                alt="Passions and interests"
                className="about-topic-image"
              />
            </section>

            {/* Topic 3 - Goals */}
            <section className="about-topic about-topic--reverse">
              <img 
                src={`${baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`}thats-so-raven-raven-symone.gif`}
                alt="Vision for the future"
                className="about-topic-image"
              />
              <div className="about-topic-text">
                <span className="about-topic-label">03</span>
                <h2 className="about-topic-title">Vision for the Future</h2>
                <p>
                  I'm focused on building technology that makes real-world processes smarter and more 
                  intuitive. My vision is to combine my experience in operations, development, and 
                  creative problem-solving to design products and workflows that genuinely improve how 
                  people work and interact with technology.
                </p>
                <p>
                  Beyond coding, I aim to continuously learn, explore new tools, and push the boundaries 
                  of what's possible—whether through AI, full-stack development, or innovative project 
                  design. Ultimately, I want to create solutions that are elegant, practical, and 
                  meaningful, leaving a lasting impact for users and the teams I work with.
                </p>
              </div>
            </section>

            {/* Footer CTA */}
            <section className="about-footer">
              <h2>Let's Connect</h2>
              <div className="about-footer-links">
                <a href="https://www.linkedin.com/in/mattan-adi/" target="_blank" rel="noreferrer" className="about-footer-btn">LinkedIn</a>
                <a href="https://github.com/MattanAdi" target="_blank" rel="noreferrer" className="about-footer-btn">GitHub</a>
                <a href="mailto:mattanadi1@gmail.com" className="about-footer-btn">Email</a>
              </div>
            </section>
          </div>
        </div>

        {/* Top Curtain */}
        <div className={`curtain curtain--top ${curtainsOpen ? "curtain--open" : ""}`}>
          <div className="curtain-inner">
            <span className="curtain-title">About</span>
          </div>
        </div>

        {/* Bottom Curtain */}
        <div className={`curtain curtain--bottom ${curtainsOpen ? "curtain--open" : ""}`}>
          <div className="curtain-inner">
            <span className="curtain-title">Me</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;

