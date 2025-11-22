import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { companies } from "./data/companies";
import LoadingScreen from "./components/LoadingScreen";
import DarkModeToggle from "./components/DarkModeToggle";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const pageRef = useRef(null);
  const navRef = useRef(null);
  const companiesRef = useRef(null);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    
    // Zoom effect - start very zoomed in, zoom out to normal
    if (pageRef.current) {
      // Set initial state - very zoomed in
      gsap.set(pageRef.current, {
        scale: 5,
        opacity: 0,
      });

      // Animate to normal - zoom out
      gsap.to(pageRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      });
    }
  };

  useEffect(() => {
    if (isLoading) return;
    
    if (!navRef.current) {
      return;
    }

    // Navigation animation
    const navChildren = Array.from(navRef.current.children);
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
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <DarkModeToggle />
      <div className="page" ref={pageRef} style={{ opacity: isLoading ? 0 : 1 }}>
      <nav className="nav" ref={navRef}>
        <Link to="/" className="nav-link active">
          Resume
        </Link>
        <Link to="/projects" className="nav-link">
          Projects
        </Link>
        <Link to="/music" className="nav-link">
          Music
        </Link>
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
    </>
  );
}

export default App;
