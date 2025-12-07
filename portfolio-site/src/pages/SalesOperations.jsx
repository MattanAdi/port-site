import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ToolsCarousel from "../components/ToolsCarousel";
import AboutMeSection from "../components/AboutMeSection";
import "../App.css";

gsap.registerPlugin(ScrollTrigger);

const getImagePath = (filename) => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanFilename = filename.startsWith('/') ? filename.slice(1) : filename;
  return `${cleanBase}${cleanFilename}`;
};

const companies = [
  {
    id: "connecteam",
    name: "Connecteam",
    role: "Sales Development Representative",
    period: "2024",
    logo: "connecteam.png",
    color: "#6366f1",
    description: "Strengthened operational expertise through daily workflows using Salesloft, HubSpot, and Looker. Created and implemented HighlightZone—a tool that improved accuracy and significantly sped up the lead review process.",
    skills: ["Salesloft", "HubSpot", "Looker", "Process Optimization"]
  },
  {
    id: "haika",
    name: "Haika Real Estate",
    role: "Sales Operations",
    period: "2023 - 2024",
    logo: "hakiala.png",
    color: "#10b981",
    description: "Full Sales Operations role managing Salesforce administration, Looker dashboards, KPI tracking, forecasting, and cross-functional communication across Sales, Marketing, and Customer Success.",
    skills: ["Salesforce", "Looker", "Forecasting", "Data Analytics"]
  },
  {
    id: "abilisense",
    name: "Abilisense",
    role: "Full Stack Developer",
    period: "2022 - 2023",
    logo: "abil.png",
    color: "#8b5cf6",
    description: "Built end-to-end web applications using React.js, HTML5, CSS3, and Node.js. Integrated RESTful APIs and collaborated on debugging and performance optimization.",
    skills: ["React.js", "Node.js", "REST APIs", "Full Stack"]
  },
  {
    id: "elal",
    name: "El Al Airlines",
    role: "Back Office Representative",
    period: "2021 - 2022",
    logo: "elal1.png",
    color: "#0ea5e9",
    description: "Provided administrative support and coordinated between internal departments. Assisted with real-time issue resolution and streamlined operational processes.",
    skills: ["Operations", "Customer Service", "Data Accuracy"]
  },
  {
    id: "etoro",
    name: "eToro",
    role: "Technical Support",
    period: "2020 - 2021",
    logo: "eToro.png",
    color: "#22c55e",
    description: "Technical assistance for users trading stocks, cryptocurrencies, and commodities. Resolved platform issues and managed account verification processes.",
    skills: ["Fintech", "Technical Support", "Compliance"]
  }
];

function SalesOperations() {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Animate company cards on scroll
    gsap.utils.toArray(".company-card").forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Animate section headers
    gsap.utils.toArray(".section-header").forEach((header) => {
      gsap.fromTo(header,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Animate project cards
    gsap.utils.toArray(".project-card").forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, []);

  return (
    <div className="page sales-ops-page-new">
      <AboutMeSection />
      
      <main className="main-content" ref={contentRef}>
        {/* Experience Section */}
        <section id="companies" className="experience-section">
          <header className="section-header">
            <span className="section-label">Experience</span>
            <h2 className="section-title">Where I've Worked</h2>
          </header>
          
          <div className="company-grid">
            {companies.map((company, index) => (
              <article 
                key={company.id} 
                className="company-card"
                style={{ '--accent-color': company.color }}
              >
                <div className="company-card-header">
                  <div className="company-logo-wrapper">
                    <img 
                      src={getImagePath(company.logo)} 
                      alt={`${company.name} logo`}
                      className="company-logo"
                    />
                  </div>
                  <div className="company-meta">
                    <span className="company-period">{company.period}</span>
                  </div>
                </div>
                
                <div className="company-card-body">
                  <h3 className="company-name">{company.name}</h3>
                  <p className="company-role">{company.role}</p>
                  <p className="company-description">{company.description}</p>
                </div>
                
                <div className="company-card-footer">
                  <div className="company-skills">
                    {company.skills.map((skill, i) => (
                      <span key={i} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
                
                <div className="company-card-accent"></div>
              </article>
            ))}
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" className="tools-section">
          <header className="section-header">
            <span className="section-label">Tech Stack</span>
            <h2 className="section-title">Tools & Technologies</h2>
          </header>
          <ToolsCarousel />
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects-section">
          <header className="section-header">
            <span className="section-label">Projects</span>
            <h2 className="section-title">Things I've Built</h2>
          </header>
          
          <div className="projects-grid">
            <article className="project-card project-card--featured">
              <div className="project-card-content">
                <span className="project-type">Chrome Extension</span>
                <h3 className="project-title">HighlightZone</h3>
                <p className="project-description">
                  Detects timezone and local time for any U.S. or Canadian phone number
                  you highlight in the browser. Instant insights without copying.
                </p>
                <ul className="project-features">
                  <li>🕒 Instant timezone detection</li>
                  <li>⚡ Works inline on any webpage</li>
                  <li>🔒 Privacy-first, no data collection</li>
                </ul>
                <div className="project-actions">
                  <a 
                    href="https://chromewebstore.google.com/detail/highlightzone/ioijeggbkkmefoolcebgaogdmnnfompj"
                    target="_blank"
                    rel="noreferrer"
                    className="project-btn project-btn--primary"
                  >
                    View Extension
                  </a>
                </div>
              </div>
              <div className="project-visual">
                <div className="project-icon">🎯</div>
              </div>
            </article>

            <article className="project-card">
              <div className="project-card-content">
                <span className="project-type">Web App</span>
                <h3 className="project-title">Weather Hunt</h3>
                <p className="project-description">
                  React app fetching AccuWeather data with client-side API key storage.
                </p>
                <ul className="project-features">
                  <li>🛰️ AccuWeather API integration</li>
                  <li>🧠 LocalStorage for API keys</li>
                  <li>🎯 Create React App build</li>
                </ul>
                <div className="project-actions">
                  <a 
                    href="https://mattanadi.github.io/WeatherHunt/"
                    target="_blank"
                    rel="noreferrer"
                    className="project-btn"
                  >
                    Live Demo
                  </a>
                  <a 
                    href="https://github.com/MattanAdi/WeatherHunt"
                    target="_blank"
                    rel="noreferrer"
                    className="project-btn project-btn--outline"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Connect Section */}
        <section className="connect-section" id="connect">
          <div className="connect-content">
            <h2 className="connect-title">Let's Connect</h2>
            <p className="connect-subtitle">Open to opportunities and collaborations</p>
            <div className="connect-links">
              <a href="https://www.linkedin.com/in/mattan-adi/" target="_blank" rel="noreferrer" className="connect-btn">
                <span>LinkedIn</span>
                <span className="connect-btn-arrow">→</span>
              </a>
              <a href="https://github.com/MattanAdi" target="_blank" rel="noreferrer" className="connect-btn">
                <span>GitHub</span>
                <span className="connect-btn-arrow">→</span>
              </a>
              <a href="mailto:mattanadi1@gmail.com" className="connect-btn">
                <span>Email</span>
                <span className="connect-btn-arrow">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SalesOperations;
