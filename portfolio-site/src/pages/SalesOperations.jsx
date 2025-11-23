import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import DarkModeToggle from "../components/DarkModeToggle";
import "../App.css";

// Get image path helper (same as in companies.js)
const getImagePath = (filename) => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanFilename = filename.startsWith('/') ? filename.slice(1) : filename;
  return `${cleanBase}${cleanFilename}`;
};

function SalesOperations() {
  const navRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!navRef.current) return;

    // Navigation animation
    const navLinks = navRef.current.querySelector('.nav-links');
    if (navLinks) {
      const navChildren = Array.from(navLinks.children);
      if (navChildren.length > 0) {
        gsap.fromTo(navChildren,
          {
            opacity: 0,
            y: -20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
      }
    }
    // Animate dark mode toggle
    const darkModeToggle = navRef.current.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
      gsap.fromTo(darkModeToggle,
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.3,
          ease: "power3.out",
        }
      );
    }

    // Content animation
    if (contentRef.current) {
      const contentElements = Array.from(contentRef.current.querySelectorAll("h1, .sales-ops-description, .haika-section, .connecteam-section"));
      if (contentElements.length > 0) {
        gsap.fromTo(contentElements,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.3,
          }
        );
      }
    }
  }, []);

  return (
    <div className="page">
      <nav className="nav" ref={navRef}>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            Resume
          </Link>
          <Link to="/projects" className="nav-link">
            Projects
          </Link>
          <Link to="/music" className="nav-link">
            Music
          </Link>
          <Link to="/sales-operations" className="nav-link active">
            Sales Operations
          </Link>
        </div>
        <DarkModeToggle />
      </nav>
      <main className="content" ref={contentRef}>
        <h1>Sales Operations</h1>
        <div className="sales-ops-description">
          <p>
            I specialize in building efficient sales processes, improving data integrity, and ensuring teams operate with clarity and consistency. I have hands-on experience with CRM management, reporting, workflow optimization, and working closely with cross-functional teams to support healthy B2B pipelines. I understand both the analytical side of sales operations and the practical realities of daily sales execution.
          </p>
        </div>

        <div className="haika-section">
          <div className="haika-description">
            <h2>Haika Real Estate</h2>
            <p>
              At Haika, I worked in a true Sales Operations role, handling:
            </p>
            <ul className="haika-list">
              <li>Salesforce administration (reports, fields, permissions)</li>
              <li>Looker dashboards and KPI tracking</li>
              <li>Forecasting and pipeline monitoring</li>
              <li>Data integrity and operational structure</li>
              <li>Cross-functional communication across Sales, Marketing, and CS</li>
            </ul>
            <p>
              This built my deep understanding of B2B sales cycles, metrics, and organizational alignment.
            </p>
          </div>
          <div className="haika-logo-container">
            {/* Logo size can be adjusted by changing the max-width and max-height values below */}
            <img 
              src={getImagePath('hakiala.png')} 
              alt="Haika logo" 
              className="haika-logo"
              style={{ maxWidth: '800px', maxHeight: '800px' }}
            />
          </div>
        </div>

        <div className="connecteam-section">
          <div className="connecteam-logo-container">
            {/* Logo size can be adjusted by changing the max-width and max-height values below */}
            <img 
              src={getImagePath('connecteam.png')} 
              alt="Connecteam logo" 
              className="connecteam-logo"
              style={{ maxWidth: '400px', maxHeight: '400px' }}
            />
          </div>
          <div className="connecteam-description">
            <h2>Connecteam</h2>
            <p>
              As an SDR, I strengthened my operational expertise through hands-on daily workflows using Salesloft, HubSpot, and Looker.
            </p>
            <p>
              I was also assigned to identify friction in the team's workflow, which led to the creation and implementation of HighlightZone - a tool that improved accuracy and significantly sped up the lead review process.
            </p>
            <p>
              This gave me a unique mix of SDR experience + operational thinking + technical problem-solving.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SalesOperations;

