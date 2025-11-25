import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import DarkModeToggle from "../components/DarkModeToggle";
import ToolsCarousel from "../components/ToolsCarousel";
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
      const contentElements = Array.from(contentRef.current.querySelectorAll("h1, .sales-ops-description, .connecteam-section, .haika-section, .abilisense-section, .elal-section, .etoro-section, .tools-carousel-section"));
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

        <div className="abilisense-section">
          <div className="abilisense-logo-container">
            {/* Logo size can be adjusted by changing the max-width and max-height values below */}
            <img 
              src={getImagePath('abil.png')} 
              alt="Abilisense logo" 
              className="abilisense-logo"
              style={{ maxWidth: '400px', maxHeight: '400px' }}
            />
          </div>
          <div className="abilisense-description">
            <h2>Abilisense</h2>
            <p>
              As a Full Stack Developer at Abilisense, I built end-to-end web applications using React.js, HTML5, CSS3, and Node.js.
            </p>
            <p>
              I integrated RESTful APIs to connect front-end interfaces with scalable back-end systems, and collaborated on debugging and performance optimization to ensure smooth user experiences across platforms.
            </p>
            <p>
              This technical foundation strengthened my problem-solving abilities and gave me hands-on experience building tools that support operational workflows—skills I've since applied to creating sales operations solutions.
            </p>
          </div>
        </div>

        <div className="elal-section">
          <div className="elal-description">
            <h2>El Al Airlines</h2>
            <p>
              As a Back Office Representative, I provided administrative support and coordinated between internal departments to ensure efficient operations.
            </p>
            <p>
              I assisted customer service agents with real-time issue resolution, retrieved and verified passenger information quickly, and streamlined operational processes to meet service-level deadlines.
            </p>
            <p>
              This experience taught me the importance of cross-departmental communication, data accuracy, and process efficiency—all critical skills I now apply to sales operations and workflow optimization.
            </p>
          </div>
          <div className="elal-logo-container">
            {/* Logo size can be adjusted by changing the max-width and max-height values below */}
            <img 
              src={getImagePath('elal1.png')} 
              alt="El Al Airlines logo" 
              className="elal-logo"
              style={{ maxWidth: '400px', maxHeight: '400px' }}
            />
          </div>
        </div>

        <div className="etoro-section">
          <div className="etoro-logo-container">
            {/* Logo size can be adjusted by changing the max-width and max-height values below */}
            <img 
              src={getImagePath('eToro.png')} 
              alt="eToro logo" 
              className="etoro-logo"
              style={{ maxWidth: '400px', maxHeight: '400px' }}
            />
          </div>
          <div className="etoro-description">
            <h2>eToro</h2>
            <p>
              As a Technical Support representative at eToro, a leading multi-asset investment and social trading platform, I provided technical assistance to users trading stocks, cryptocurrencies, commodities, and other financial instruments.
            </p>
            <p>
              I resolved platform issues, investigated trade execution problems, and helped users navigate the platform's social trading features. I also managed account verification processes and ensured compliance with regulatory requirements.
            </p>
            <p>
              This role developed my technical troubleshooting skills, attention to detail in financial data, and ability to communicate complex technical concepts clearly—all valuable in sales operations where system reliability and data accuracy are critical.
            </p>
          </div>
        </div>

        <ToolsCarousel />
      </main>
    </div>
  );
}

export default SalesOperations;

