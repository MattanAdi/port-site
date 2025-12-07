import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import DarkModeToggle from "../components/DarkModeToggle";
import "./Music.css";

function Music() {
  const pageRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const baseUrl = import.meta.env.BASE_URL || "/";

  // Sample music/merch items - replace with your actual content
  const musicItems = [
    {
      id: 1,
      title: "Latest Track",
      subtitle: "Single Release",
      price: "Stream Now",
      category: "music",
      color: "#FF6B35",
    },
    {
      id: 2,
      title: "Beat Pack Vol. 1",
      subtitle: "Production Kit",
      price: "$29.99",
      category: "beats",
      color: "#4ECDC4",
    },
    {
      id: 3,
      title: "Limited Hoodie",
      subtitle: "Merch Drop",
      price: "$65.00",
      category: "merch",
      color: "#8B5CF6",
    },
    {
      id: 4,
      title: "Drum Samples",
      subtitle: "Sound Pack",
      price: "$19.99",
      category: "beats",
      color: "#F43F5E",
    },
    {
      id: 5,
      title: "Album Art Tee",
      subtitle: "Limited Edition",
      price: "$40.00",
      category: "merch",
      color: "#10B981",
    },
    {
      id: 6,
      title: "Unreleased Demo",
      subtitle: "Exclusive",
      price: "Coming Soon",
      category: "music",
      color: "#F59E0B",
    },
  ];

  const categories = [
    { id: "all", label: "All" },
    { id: "music", label: "Music" },
    { id: "beats", label: "Beats" },
    { id: "merch", label: "Merch" },
  ];

  const filteredItems = activeCategory === "all" 
    ? musicItems 
    : musicItems.filter(item => item.category === activeCategory);

  useEffect(() => {
    if (!pageRef.current) return;

    gsap.fromTo(
      ".music-hero-title",
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo(
      ".music-hero-subtitle",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.4 }
    );

    gsap.fromTo(
      ".music-nav-item",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".music-card",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }
    );
  }, [activeCategory]);

  return (
    <div className="music-page" ref={pageRef}>
      {/* Top Navigation */}
      <header className="music-header">
        <Link to="/" className="music-back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Portfolio</span>
        </Link>
        <nav className="music-top-nav">
          <a href="#shop">Shop</a>
          <a href="#videos">Videos</a>
          <a href="#about">About</a>
        </nav>
        <div className="music-header-right">
          <DarkModeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="music-hero">
        <div className="music-hero-bg">
          <div className="music-hero-gradient"></div>
        </div>
        <div className="music-hero-content">
          <h1 className="music-hero-title">MUSIC</h1>
          <p className="music-hero-subtitle">Sounds • Beats • Vibes</p>
        </div>
      </section>

      {/* Announcement Banner */}
      <div className="music-banner">
        <div className="music-banner-scroll">
          <span>🎵 NEW RELEASES COMING SOON</span>
          <span>•</span>
          <span>🎧 EXCLUSIVE BEATS AVAILABLE</span>
          <span>•</span>
          <span>🔥 LIMITED MERCH DROP</span>
          <span>•</span>
          <span>🎵 NEW RELEASES COMING SOON</span>
          <span>•</span>
          <span>🎧 EXCLUSIVE BEATS AVAILABLE</span>
          <span>•</span>
          <span>🔥 LIMITED MERCH DROP</span>
          <span>•</span>
        </div>
      </div>

      {/* Category Filter */}
      <nav className="music-category-nav" id="shop">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`music-nav-item ${activeCategory === cat.id ? "music-nav-item--active" : ""}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      {/* Product Grid */}
      <section className="music-shop">
        <div className="music-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="music-card">
              <div 
                className="music-card-image" 
                style={{ backgroundColor: item.color }}
              >
                <div className="music-card-overlay">
                  <span className="music-card-action">View</span>
                </div>
              </div>
              <div className="music-card-info">
                <h3 className="music-card-title">{item.title}</h3>
                <p className="music-card-subtitle">{item.subtitle}</p>
                <span className="music-card-price">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Section */}
      <section className="music-videos" id="videos">
        <h2 className="music-section-title">Featured Videos</h2>
        <div className="music-video-grid">
          <div className="music-video-card music-video-card--large">
            <div className="music-video-placeholder">
              <span className="music-video-play">▶</span>
              <span className="music-video-label">Latest Video</span>
            </div>
          </div>
          <div className="music-video-card">
            <div className="music-video-placeholder">
              <span className="music-video-play">▶</span>
            </div>
          </div>
          <div className="music-video-card">
            <div className="music-video-placeholder">
              <span className="music-video-play">▶</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="music-about" id="about">
        <div className="music-about-content">
          <h2 className="music-about-title">The Sound</h2>
          <p className="music-about-text">
            Music is more than a hobby—it's an expression of creativity that runs parallel 
            to my work in tech. From producing beats to experimenting with sound design, 
            this page showcases my musical journey and creative projects.
          </p>
          <p className="music-about-text">
            Stay tuned for new releases, sample packs, and exclusive content.
          </p>
        </div>
      </section>

      {/* Newsletter */}
      <section className="music-newsletter">
        <h3 className="music-newsletter-title">Stay Updated</h3>
        <p className="music-newsletter-text">Get notified about new releases and exclusive drops.</p>
        <div className="music-newsletter-form">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="music-newsletter-input"
          />
          <button className="music-newsletter-btn">Subscribe</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="music-footer">
        <div className="music-footer-links">
          <a href="https://www.linkedin.com/in/mattan-adi/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/MattanAdi" target="_blank" rel="noreferrer">GitHub</a>
          <a href="mailto:mattanadi1@gmail.com">Email</a>
        </div>
        <p className="music-footer-copy">© 2024 Mattan Adi</p>
      </footer>
    </div>
  );
}

export default Music;
