import { useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { getCompanyBySlug } from "../data/companies";
import "../App.css";

function CompanyDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const company = getCompanyBySlug(slug);
  const pageRef = useRef(null);
  const navRef = useRef(null);
  const backButtonRef = useRef(null);
  const companyCardRef = useRef(null);

  useEffect(() => {
    if (!company || !pageRef.current || !navRef.current) return;

    // Page entrance animation
    if (pageRef.current) {
      gsap.fromTo(pageRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        }
      );
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

    // Back button animation
    if (backButtonRef.current) {
      gsap.fromTo(backButtonRef.current,
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.2,
        }
      );
    }

    // Company card animation
    if (!companyCardRef.current) return;

    const timeline = gsap.timeline({ delay: 0.3 });
    
    timeline.fromTo(companyCardRef.current,
      {
        opacity: 0,
        scale: 0.9,
        y: 30,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }
    );

    const logo = companyCardRef.current.querySelector(".company-logo");
    if (logo) {
      timeline.fromTo(
        logo,
        {
          opacity: 0,
          scale: 0.5,
          rotation: -180,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      );
    }

    const contentElements = Array.from(companyCardRef.current.querySelectorAll(".company-content > *"));
    if (contentElements.length > 0) {
      timeline.fromTo(
        contentElements,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }

    // Bullet points animation
    const bullets = Array.from(companyCardRef.current.querySelectorAll(".company-bullets li"));
    if (bullets.length > 0) {
      gsap.fromTo(bullets,
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.8,
        }
      );
    }
  }, [company]);

  if (!company) {
    return (
      <div className="page" ref={pageRef}>
        <nav className="nav" ref={navRef}>
          <Link to="/" className="nav-link">
            Resume
          </Link>
          <Link to="/projects" className="nav-link">
            Projects
          </Link>
          <Link to="/music" className="nav-link">
            Music
          </Link>
        </nav>
        <main className="content">
          <h1>Company Not Found</h1>
          <p>The company you're looking for doesn't exist.</p>
          <Link to="/">Go back to home</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="page" ref={pageRef}>
      <nav className="nav" ref={navRef}>
        <Link to="/" className="nav-link">
          Resume
        </Link>
        <Link to="/projects" className="nav-link">
          Projects
        </Link>
        <Link to="/music" className="nav-link">
          Music
        </Link>
      </nav>
      <main className="content">
        <button
          ref={backButtonRef}
          onClick={() => navigate(-1)}
          className="back-button"
          style={{
            marginBottom: "2rem",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            background: "transparent",
            border: "1px solid #ccc",
            borderRadius: "4px",
            color: "#fff",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            gsap.to(e.target, {
              x: -5,
              duration: 0.2,
              ease: "power2.out",
            });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.target, {
              x: 0,
              duration: 0.2,
              ease: "power2.out",
            });
          }}
        >
          ← Back
        </button>
        <section
          ref={companyCardRef}
          className="company company-detail"
          style={{ background: company.background }}
        >
          <div className="company-logo" aria-hidden="true">
            {company.image ? (
              <img className="logo-img" src={company.image} alt={company.logoAlt} />
            ) : (
              <div className="logo-placeholder" />
            )}
          </div>
          <div className="company-content">
            <h1 className="company-name">{company.name}</h1>
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
        </section>
      </main>
    </div>
  );
}

export default CompanyDetail;

