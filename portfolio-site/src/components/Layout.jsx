import { useState } from "react";
import { useLocation } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

function Layout({ children }) {
  const location = useLocation(); // kept in case we later want route-based behavior
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const baseUrl = import.meta.env.BASE_URL || "/";
  const chefLogoSrc = `${baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`}chef.png`;

  const sectionLinks = [
    { id: "companies", label: "Companies" },
    { id: "tools", label: "Tools & Technologies" },
    { id: "projects", label: "Projects" },
  ];

  const handleAboutClick = (e) => {
    e.preventDefault();
    const aboutSection = document.getElementById("about-me");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-left">
          {/* Hamburger menu for mobile */}
          <button 
            className="hamburger-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
          </button>
          <img src={chefLogoSrc} alt="Chef logo" className="top-bar-logo" />
        </div>
        <div className="top-bar-right">
          <DarkModeToggle />
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'mobile-menu-overlay--open' : ''}`} onClick={closeMobileMenu}></div>
      
      {/* Mobile menu */}
      <nav className={`mobile-nav ${mobileMenuOpen ? 'mobile-nav--open' : ''}`}>
        <button 
          className="mobile-nav__about-link" 
          onClick={handleAboutClick}
          type="button"
        >
          About Me
        </button>
        {sectionLinks.map((link) => (
          <a key={link.id} href={`#${link.id}`} onClick={closeMobileMenu}>
            {link.label}
          </a>
        ))}
        <a className="mobile-nav__welcome-link" href="/welcome" onClick={closeMobileMenu}>
          Welcome page
        </a>
      </nav>

      {/* Desktop nav */}
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
    </>
  );
}

export default Layout;

