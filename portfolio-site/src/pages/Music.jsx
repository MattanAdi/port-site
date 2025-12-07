import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import DarkModeToggle from "../components/DarkModeToggle";
import "../App.css";

function Music() {
  const pageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const elements = contentRef.current.querySelectorAll(".music-section");
    
    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      }
    );
  }, []);

  return (
    <div className="page music-page" ref={pageRef}>
      <div className="top-bar">
        <div className="top-bar-left">
          <Link to="/" className="back-to-home">← Back</Link>
        </div>
        <div className="top-bar-right">
          <DarkModeToggle />
        </div>
      </div>

      <main className="music-content" ref={contentRef}>
        <section className="music-section music-hero">
          <h1 className="music-title">Music</h1>
          <p className="music-subtitle">A creative outlet beyond code</p>
        </section>

        <section className="music-section music-intro">
          <p>
            Music has always been a passion of mine. Whether it's playing drums, 
            producing beats, or just discovering new sounds, it's a way to express 
            creativity outside of the tech world.
          </p>
        </section>

        <section className="music-section music-placeholder">
          <div className="music-card">
            <div className="music-card-icon">🎵</div>
            <h3>Coming Soon</h3>
            <p>Music content and projects will be added here.</p>
          </div>
        </section>

        <section className="music-section music-back">
          <Link to="/" className="music-back-btn">← Back to Portfolio</Link>
        </section>
      </main>
    </div>
  );
}

export default Music;
