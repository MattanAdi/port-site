import { useEffect, useRef, useState } from "react";
import "./DarkModeToggle.css";

function DarkModeToggle() {
  const [isDark, setIsDark] = useState(true);
  const toggleRef = useRef(null);

  useEffect(() => {
    // Check for saved preference; default to dark mode when none is saved
    const savedMode = localStorage.getItem("darkMode");

    if (savedMode === "false") {
      setIsDark(false);
      applyLightMode();
    } else {
      // "true" or null → start in dark mode
      setIsDark(true);
      applyDarkMode();
    }
  }, []);

  const applyDarkMode = () => {
    // Fast dark mode application
    document.body.classList.add("dark-mode");
    document.documentElement.style.setProperty('--bg-color', '#000000');
    document.documentElement.style.setProperty('--text-color', '#ffffff');
    
    // Apply to all containers
    const containers = document.querySelectorAll('body, #root, html, .page, .sections, main, .nav, header, .hero');
    containers.forEach(el => {
      if (el) {
        el.style.backgroundColor = '#000000';
        el.style.color = '#ffffff';
      }
    });

    // Company cards
    const companies = document.querySelectorAll('.company');
    companies.forEach(company => {
      company.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
      company.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    });

    // Text elements
    const textElements = document.querySelectorAll('.nav-link, .company-name, .company-role, .company-period, .company-bullets, .company-bullets li, .company-desc, h1, h2, h3, h4, h5, h6, p');
    textElements.forEach(el => {
      if (el) el.style.color = '#ffffff';
    });

    // Company logos
    const logos = document.querySelectorAll('.company-logo');
    logos.forEach(logo => {
      logo.style.backgroundColor = 'transparent';
      logo.style.border = 'none';
    });
  };

  const applyLightMode = () => {
    // Fast light mode application
    document.body.classList.remove("dark-mode");
    document.documentElement.style.setProperty('--bg-color', '#ffffff');
    document.documentElement.style.setProperty('--text-color', '#000000');
    
    // Apply to all containers
    const containers = document.querySelectorAll('body, #root, html, .page, .sections, main, .nav, header, .hero');
    containers.forEach(el => {
      if (el) {
        el.style.backgroundColor = '#ffffff';
        el.style.color = '#000000';
      }
    });

    // Company cards - restore original backgrounds
    const companies = document.querySelectorAll('.company');
    companies.forEach(company => {
      const originalBg = company.getAttribute('data-original-bg');
      if (originalBg) {
        company.style.backgroundColor = originalBg;
      } else {
        company.style.backgroundColor = '';
      }
      company.style.borderColor = 'rgba(0, 0, 0, 0.1)';
    });

    // Text elements
    const textElements = document.querySelectorAll('.nav-link, .company-name, .company-role, .company-period, .company-bullets, .company-bullets li, .company-desc, h1, h2, h3, h4, h5, h6, p');
    textElements.forEach(el => {
      if (el) el.style.color = '#000000';
    });

    // Company logos
    const logos = document.querySelectorAll('.company-logo');
    logos.forEach(logo => {
      logo.style.backgroundColor = 'transparent';
      logo.style.border = 'none';
    });
  };

  const handleToggle = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    
    if (newMode) {
      applyDarkMode();
    } else {
      applyLightMode();
    }
  };

  return (
    <button
      ref={toggleRef}
      className="dark-mode-toggle"
      onClick={handleToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="toggle-icon">{isDark ? "🌙" : "☀️"}</span>
    </button>
  );
}

export default DarkModeToggle;
