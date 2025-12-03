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
                <div className="about-me-tagline">Developer • Designer • Creator</div>
                <p className="about-hero-intro">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="about-hero-image" style={{ background: '#64ffda' }} />
            </section>

            {/* Topic 1 - Background */}
            <section className="about-topic about-topic--reverse">
              <div className="about-topic-image" style={{ background: '#ff6b6b' }} />
              <div className="about-topic-text">
                <span className="about-topic-label">01</span>
                <h2 className="about-topic-title">Background</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                  fugiat nulla pariatur.
                </p>
              </div>
            </section>

            {/* Topic 2 - Skills */}
            <section className="about-topic">
              <div className="about-topic-text">
                <span className="about-topic-label">02</span>
                <h2 className="about-topic-title">Skills & Expertise</h2>
                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                  mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit 
                  voluptatem accusantium doloremque laudantium.
                </p>
                <p>
                  Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto 
                  beatae vitae dicta sunt explicabo.
                </p>
              </div>
              <div className="about-topic-image" style={{ background: '#4ecdc4' }} />
            </section>

            {/* Topic 3 - Passions */}
            <section className="about-topic about-topic--reverse">
              <div className="about-topic-image" style={{ background: '#ffe66d' }} />
              <div className="about-topic-text">
                <span className="about-topic-label">03</span>
                <h2 className="about-topic-title">Passions & Interests</h2>
                <p>
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia 
                  consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
                <p>
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, 
                  adipisci velit, sed quia non numquam eius modi tempora incidunt.
                </p>
              </div>
            </section>

            {/* Topic 4 - Goals */}
            <section className="about-topic">
              <div className="about-topic-text">
                <span className="about-topic-label">04</span>
                <h2 className="about-topic-title">Goals & Vision</h2>
                <p>
                  Ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, 
                  quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid 
                  ex ea commodi consequatur.
                </p>
                <p>
                  Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil 
                  molestiae consequatur.
                </p>
              </div>
              <div className="about-topic-image" style={{ background: '#a855f7' }} />
            </section>

            {/* Footer CTA */}
            <section className="about-footer">
              <h2>Let's Connect</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <div className="about-footer-links">
                <a href="#" className="about-footer-btn">LinkedIn</a>
                <a href="#" className="about-footer-btn">GitHub</a>
                <a href="#" className="about-footer-btn">Email</a>
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

