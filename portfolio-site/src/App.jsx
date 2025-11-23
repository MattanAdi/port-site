import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { companies } from "./data/companies";
import DarkModeToggle from "./components/DarkModeToggle";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const pageRef = useRef(null);
  const navRef = useRef(null);
  const companiesRef = useRef(null);

  useEffect(() => {
    
    if (!navRef.current) {
      return;
    }

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

    // Company cards animation
    if (companiesRef.current) {
      const companyCards = companiesRef.current.querySelectorAll(".company");
      if (companyCards.length > 0) {
        gsap.fromTo(companyCards,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: companiesRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            }
          }
        );
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="page" ref={pageRef}>
      <nav className="nav" ref={navRef}>
        <div className="nav-links">
          <Link to="/" className="nav-link active">
            Resume
          </Link>
          <Link to="/projects" className="nav-link">
            Projects
          </Link>
          <Link to="/music" className="nav-link">
            Music
          </Link>
          <Link to="/sales-operations" className="nav-link">
            Sales Operations
          </Link>
        </div>
        <DarkModeToggle />
      </nav>
      <header className="hero">
      </header>

      <main className="sections" aria-label="Experience" ref={companiesRef}>
        {companies.map((company) => (
          <Link
            key={company.id}
            to={`/company/${company.slug}`}
            className="company company-clickable"
            style={{ background: company.background }}
            data-original-bg={company.background}
            data-slug={company.slug}
          >
            <div className="company-logo">
              {company.image ? (
                <img className="logo-img" src={company.image} alt={company.logoAlt} />
              ) : (
                <div className="logo-placeholder" />
              )}
            </div>
            <div className="company-content">
              <h2 className="company-name">{company.name}</h2>
              <p className="company-role">{company.role}</p>
              <p className="company-period">{company.period}</p>
              {company.bullets ? (
                <ul className="company-bullets">
                  {company.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              ) : (
                <p className="company-desc">
                  Brief description of what you did, tech used, and impact.
                </p>
              )}
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}

export default App;
