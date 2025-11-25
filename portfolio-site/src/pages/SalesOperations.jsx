import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ToolsCarousel from "../components/ToolsCarousel";
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

  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const toggleCard = () => {
    setIsCardFlipped((prev) => !prev);
  };

  useEffect(() => {
    if (!contentRef.current) return;

    const contentElements = Array.from(
      contentRef.current.querySelectorAll(
        ".sales-ops-section, .tools-carousel-section, .baseball-row"
      )
    );

    if (contentElements.length > 0) {
      gsap.fromTo(
        contentElements,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
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
      const direction = section.dataset.direction || "right";
      const offset = direction === "left" ? -120 : 120;

      const animation = gsap.fromTo(section,
        {
          x: offset,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "bottom 10%",
            scrub: true,
            invalidateOnRefresh: true,
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
        <div className="baseball-row">
          <div
            id="baseballCard"
            className="baseball-card"
            onClick={toggleCard}
          >
            <article id="flipper" className={isCardFlipped ? "flipped" : ""}>
              <section className="front">
                <address className="player-name">MATTAN ADI</address>
                <div className="player-photo" role="image" />
                <p className="position">Sales Ops</p>
                <p className="team">Programmer</p>
              </section>
              <section className="back">
                <header>
                  <p className="card-number">
                    01
                    <svg id="stitching" width="40" height="11" viewBox="0 0 87 22">
                      <path
                        style={{ fill: "rgba(0,0,0,0.75)" }}
                        d="m 72.939882,20.915961 c -0.395728,-1.03125 -0.17466,-1.875 0.491264,-1.875 0.665923,0 1.210769,-0.84375 1.210769,-1.875 0,-2.328779 -2.176226,-2.328779 -6.25,0 -4.073774,2.328779 -6.25,2.328779 -6.25,0 0,-1.03125 0.595697,-1.875 1.323771,-1.875 0.728074,0 0.976128,-0.5625 0.551229,-1.25 -1.409021,-2.279845 -6.065519,-1.295684 -9.517526,2.011549 -3.778707,3.620231 -6.93969,3.129108 -4.860854,-0.755233 1.73653,-3.244737 1.593136,-3.756316 -1.052885,-3.756316 -1.268446,0 -3.324378,1.125 -4.568735,2.5 -1.244358,1.375 -3.056944,2.5 -4.027969,2.5 -1.196656,0 -1.509845,-0.805499 -0.972031,-2.5 1.096892,-3.456003 -1.353984,-3.19412 -6.444511,0.688614 l -4.180489,3.188615 0,-3.188615 c 0,-2.00099 -0.698359,-3.188614 -1.875,-3.188614 -2.108854,0 -6.875,4.33286 -6.875,6.25 0,0.6875 -0.84375,1.25 -1.875,1.25 -1.03125,0 -1.875,-0.84375 -1.875,-1.875 0,-2.840046 -4.600359,-2.243176 -6.788451,0.880762 l -1.9302107,2.755763 -3.3743548,-2.51932 c -4.8602615,-3.628709 -5.0587242,-5.492205 -0.584921,-5.492205 4.5248465,0 6.5170405,-2.383866 2.8037074,-3.3549242 -2.967625,-0.776051 -3.6091191,-4.145076 -0.7892615,-4.145076 1.0100794,0 4.0215636,1.138915 6.6921866,2.530922 2.685809,1.399921 5.799374,2.16879 6.967456,1.720555 1.959579,-0.751961 1.96393,-0.973735 0.06036,-3.077154 -3.791251,-4.189287 -0.747381,-5.244738 5.329853,-1.848108 5.732682,3.204058 9.113636,4.010483 9.113636,2.173785 0,-0.55 -0.615251,-1.615251 -1.367225,-2.367225 -0.751974,-0.751974 -1.173849,-2.308333 -0.9375,-3.45857502 0.349919,-1.702953 1.377815,-1.278209 5.534782,2.28706602 4.728004,4.055031 7.970903,5.004441 10.036888,2.938456 0.461619,-0.461619 0.127775,-1.69665 -0.741875,-2.744514 -1.329179,-1.601562 -1.172806,-1.905208 0.981149,-1.905208 1.409282,0 3.627225,1.353793 4.928761,3.008429 1.301536,1.654636 3.732989,3.201511 5.403225,3.4375 2.626844,0.371149 3.005026,-0.03497 2.801465,-3.008429 -0.328224,-4.79442102 2.457546,-4.35967102 4.901284,0.764899 1.102191,2.311319 3.175122,4.5086572 4.606515,4.8829752 2.19585,0.574227 2.602531,0.112874 2.602531,-2.9523982 0,-5.003868 2.048758,-4.549522 4.679616,1.037782 2.721214,5.7791932 6.570384,7.0631892 6.570384,2.1917312 0,-4.0285462 2.929953,-3.6208072 3.533455,0.491723 0.516704,3.521049 -1.493545,5.941997 -7.462535,8.987148 -5.670665,2.892957 -5.619214,2.888747 -6.522953,0.53364 z"
                      id="path4484"
                    />
                  </svg>
                </p>
                <div className="flex-grid header-grid">
                  <div className="flex-row">
                    <h2 className="flex-cell text-center width-12 header-player-name">
                      Mookie Betts
                    </h2>
                  </div>
                  <div className="flex-row">
                    <span className="flex-cell width-04 header-player-position text-left">
                      Outfield
                    </span>
                    <span className="flex-cell width-08 header-player-team text-right">
                      Boston RedSox
                    </span>
                  </div>
                </div>
              </header>
              <p className="bio">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                in leo erat. Quisque ac velit ut dolor tempor posuere.
              </p>
            </section>
          </article>
        </div>
      </div>

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

        <ToolsCarousel />
      </main>
    </div>
  );
}

export default SalesOperations;

