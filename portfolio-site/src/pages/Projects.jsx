import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "../App.css";

function Projects() {
  const navRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!navRef.current) return;

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

    // Content animation
    if (contentRef.current) {
      const contentElements = Array.from(contentRef.current.querySelectorAll("h1, p"));
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
        <Link to="/" className="nav-link">
          Resume
        </Link>
        <Link to="/projects" className="nav-link active">
          Projects
        </Link>
        <Link to="/music" className="nav-link">
          Music
        </Link>
      </nav>
      <main className="content" ref={contentRef}>
        <h1>Projects</h1>
        <p>Coming soon.</p>
      </main>
    </div>
  );
}

export default Projects;

