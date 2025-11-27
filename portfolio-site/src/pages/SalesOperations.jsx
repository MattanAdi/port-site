import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ToolsCarousel, { allToolFilenames, formatToolLabel } from "../components/ToolsCarousel";
import "../App.css";

gsap.registerPlugin(ScrollTrigger);

// Get image path helper (same as in companies.js)
const getImagePath = (filename) => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanFilename = filename.startsWith('/') ? filename.slice(1) : filename;
  return `${cleanBase}${cleanFilename}`;
};

function SalesOperations() {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const contentElements = Array.from(
      contentRef.current.querySelectorAll(
        ".sales-ops-section, .tools-carousel-section"
      )
    );

    if (contentElements.length > 0) {
      gsap.fromTo(
        contentElements,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.8,
          stagger: 0.18,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }
  }, []);
  useEffect(() => {
    if (!contentRef.current) return;

    const sections = contentRef.current.querySelectorAll(".sales-ops-section");

    const triggers = [];

    sections.forEach((section) => {
      const animation = gsap.fromTo(
        section,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "bottom 10%",
            scrub: true,
            invalidateOnRefresh: true,
            toggleActions: "play reverse play reverse",
          },
        }
      );

      if (animation.scrollTrigger) {
        triggers.push(animation.scrollTrigger);
      }
    });

    return () => {
      triggers.forEach((trigger) => trigger && trigger.kill());
    };
  }, []);

  return (
    <div className="page sales-ops-page">
      <main className="content" ref={contentRef}>
        <section id="companies" className="companies-section">
          <div className="sales-ops-section connecteam-section" data-direction="right">
          <div className="connecteam-logo-container">
            {/* Logo size can be adjusted by changing the max-width and max-height values below */}
            <img 
              src={getImagePath('connecteam.png')} 
              alt="Connecteam logo" 
              className="connecteam-logo"
              style={{ maxWidth: '460px', maxHeight: '460px' }}
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

        <div className="sales-ops-section haika-section" data-direction="left">
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

        <div className="sales-ops-section abilisense-section" data-direction="right">
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

        <div className="sales-ops-section elal-section" data-direction="left">
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

          <div className="sales-ops-section etoro-section" data-direction="right">
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
        </section>

        <section id="tools" className="tools-anchor" aria-label="Tools carousel">
          <ToolsCarousel />
        </section>
        <section id="projects" className="projects-list" aria-label="Projects">
          <header className="projects-list__header">
            <p>Projects</p>
            <h2>Tools I’ve shipped</h2>
          </header>
          <div className="projects-list__grid">
            <article className="highlightzone-card">
              <div className="highlightzone-card__header">
                <div className="highlightzone-card__icon" aria-hidden="true" />
                <div>
                  <p className="highlightzone-card__eyebrow">Chrome extension</p>
                  <h3>HighlightZone</h3>
                  <span>November 2025 · Manifest V3</span>
                </div>
              </div>
              <p className="highlightzone-card__description">
                HighlightZone detects the timezone and local time for any U.S. or Canadian phone number you highlight
                in the browser, so you can instantly understand when it’s best to connect without copying anything out
                of the page.
              </p>
              <ul className="highlightzone-card__bullets">
                <li>🕒 Instantly shows timezone &amp; local time for every highlighted number.</li>
                <li>⚡ Works inline on any webpage, no external tooling required.</li>
                <li>🔒 Built with privacy in mind—no data collection, just local computation.</li>
              </ul>
              <div className="highlightzone-card__actions">
                <a
                  href="https://chromewebstore.google.com/detail/highlightzone/ioijeggbkkmefoolcebgaogdmnnfompj?utm_source=chatgpt.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit HighlightZone on Chrome Web Store
                </a>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SalesOperations;

