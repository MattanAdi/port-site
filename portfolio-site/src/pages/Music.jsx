import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "./Music.css";

function Music() {
  const pageRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("beats");
  const [playingId, setPlayingId] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const defaultAudioRef = useRef(null);

  const baseUrl = import.meta.env.BASE_URL || "/";
  const defaultSong = `${baseUrl}Kiddish x Low-j -  Man Can't Stop (Official Visualizer).mp3`;

  // Vinyl records - 8 records for the music section
  const vinylRecords = [
    { id: 1, title: "Cosign", image: `${baseUrl}Cosign.jpg`, color: "#1a1a1a", audio: null },
    { id: 2, title: "Man Can't Stop", image: `${baseUrl}Man cant stop.jpg`, color: "#1a1a1a", audio: `${baseUrl}Kiddish x Low-j -  Man Can't Stop (Official Visualizer).mp3` },
    { id: 3, title: "Deni Avdija", image: `${baseUrl}Deni.jpg`, color: "#1a1a1a", audio: null },
    { id: 4, title: "SEO Anthem", image: `${baseUrl}SEO.png`, color: "#1a1a1a", audio: null },
    { id: 5, title: "Track 5", image: null, color: "#1a1a1a", audio: null },
    { id: 6, title: "Track 6", image: null, color: "#1a1a1a", audio: null },
    { id: 7, title: "Track 7", image: null, color: "#1a1a1a", audio: null },
    { id: 8, title: "Track 8", image: null, color: "#1a1a1a", audio: null },
  ];

  const handleRecordClick = (record) => {
    if (!record.audio) return;
    
    // Pause default background music when clicking a record
    if (defaultAudioRef.current) {
      defaultAudioRef.current.pause();
    }
    
    if (playingId === record.id) {
      // Pause if same record clicked
      audioRef.current?.pause();
      setPlayingId(null);
      // Resume default music
      if (defaultAudioRef.current && !isMuted) {
        defaultAudioRef.current.play();
      }
    } else {
      // Play new track
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(record.audio);
      audioRef.current.muted = isMuted;
      audioRef.current.play();
      audioRef.current.onended = () => {
        setPlayingId(null);
        // Resume default music when track ends
        if (defaultAudioRef.current && !isMuted) {
          defaultAudioRef.current.play();
        }
      };
      setPlayingId(record.id);
    }
  };

  // Beats items
  const beatsItems = [
    { id: 1, title: "Beat Pack Vol. 1", subtitle: "Hip-Hop / Trap", price: "$29.99", color: "#FF6B35" },
    { id: 2, title: "Drum Samples", subtitle: "Sound Pack", price: "$19.99", color: "#4ECDC4" },
    { id: 3, title: "Lo-Fi Collection", subtitle: "Chill Beats", price: "$24.99", color: "#8B5CF6" },
    { id: 4, title: "808 Kit", subtitle: "Bass Heavy", price: "$14.99", color: "#F43F5E" },
  ];

  // Merch items
  const merchItems = [
    { id: 1, title: "Limited Hoodie", subtitle: "Black Edition", price: "$65.00", color: "#1a1a1a" },
    { id: 2, title: "Album Art Tee", subtitle: "Limited Edition", price: "$40.00", color: "#2d2d2d" },
    { id: 3, title: "Dad Hat", subtitle: "Embroidered Logo", price: "$35.00", color: "#3d3d3d" },
    { id: 4, title: "Poster Pack", subtitle: "3x Prints", price: "$25.00", color: "#4d4d4d" },
  ];

  const categories = [
    { id: "beats", label: "Beats" },
    { id: "merch", label: "Merch" },
  ];

  const currentItems = activeCategory === "beats" ? beatsItems : merchItems;

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
      ".vinyl-record",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)", delay: 0.5 }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".shop-card",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
    );
  }, [activeCategory]);

  // Auto-play default song on page load
  useEffect(() => {
    defaultAudioRef.current = new Audio(defaultSong);
    defaultAudioRef.current.loop = true;
    defaultAudioRef.current.volume = 0.5;
    
    // Try to autoplay (may be blocked by browser)
    const playPromise = defaultAudioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked - user needs to interact first
        console.log("Autoplay blocked - click to play");
      });
    }

    return () => {
      if (defaultAudioRef.current) {
        defaultAudioRef.current.pause();
        defaultAudioRef.current = null;
      }
    };
  }, []);

  // Handle mute toggle
  const toggleMute = () => {
    if (defaultAudioRef.current) {
      if (isMuted) {
        defaultAudioRef.current.play();
      } else {
        defaultAudioRef.current.pause();
      }
    }
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="music-page" ref={pageRef}>
      {/* Back Button */}
      <Link to="/" className="music-back-btn-fixed">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>Career</span>
      </Link>

      {/* Hero Section */}
      <section className="music-hero">
        <div className="music-hero-bg">
          <video 
            className="music-hero-video"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src={`${baseUrl}CLIP - Made with Clipchamp.mp4`} type="video/mp4" />
          </video>
          <div className="music-hero-gradient"></div>
        </div>
        <div className="music-hero-content">
          <h1 className="music-hero-title">CHEF</h1>
        </div>
      </section>

      {/* Announcement Banner */}
      <div className="music-banner">
        <div className="music-banner-scroll">
          <span>🎧 EXCLUSIVE BEATS AVAILABLE</span>
          <span>•</span>
          <span>🔥 LIMITED MERCH DROP</span>
          <span>•</span>
          <span>💿 NEW RECORDS COMING SOON</span>
          <span>•</span>
          <span>🎧 EXCLUSIVE BEATS AVAILABLE</span>
          <span>•</span>
          <span>🔥 LIMITED MERCH DROP</span>
          <span>•</span>
          <span>💿 NEW RECORDS COMING SOON</span>
          <span>•</span>
          <span>🎧 EXCLUSIVE BEATS AVAILABLE</span>
          <span>•</span>
          <span>🔥 LIMITED MERCH DROP</span>
          <span>•</span>
          <span>💿 NEW RECORDS COMING SOON</span>
          <span>•</span>
          <span>🎧 EXCLUSIVE BEATS AVAILABLE</span>
          <span>•</span>
          <span>🔥 LIMITED MERCH DROP</span>
          <span>•</span>
          <span>💿 NEW RECORDS COMING SOON</span>
          <span>•</span>
        </div>
      </div>

      {/* About Section - The Sound */}
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

      {/* Vinyl Records Section */}
      <section className="vinyl-section" id="records">
        <div className="vinyl-section-bg">
          <video 
            className="vinyl-section-video"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src={`${baseUrl}About Me Mattan Adi.mp4`} type="video/mp4" />
          </video>
          <div className="vinyl-section-overlay"></div>
        </div>
        <h2 className="vinyl-section-title">Records</h2>
        <div className="vinyl-grid">
          {vinylRecords.map((record) => (
            <div 
              key={record.id} 
              className={`vinyl-record ${record.audio ? 'vinyl-record--playable' : ''} ${playingId === record.id ? 'vinyl-record--playing' : ''}`}
              onClick={() => handleRecordClick(record)}
            >
              <div className="vinyl-disc">
                {record.image && (
                  <img src={record.image} alt={record.title} className="vinyl-overlay-image" />
                )}
                <div className="vinyl-grooves"></div>
                <div className="vinyl-label">
                  {!record.image && (
                    <div className="vinyl-label-placeholder">
                      <span>{record.id}</span>
                    </div>
                  )}
                </div>
                <div className="vinyl-center-hole"></div>
                {playingId === record.id && (
                  <div className="vinyl-playing-indicator">▶</div>
                )}
              </div>
              <p className="vinyl-title">{record.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Shop Section */}
      <section className="shop-section" id="shop">
        {/* Category Filter */}
        <nav className="shop-category-nav">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`shop-nav-item ${activeCategory === cat.id ? "shop-nav-item--active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        {/* Product Grid */}
        <div className="shop-grid">
          {currentItems.map((item) => (
            <div key={item.id} className="shop-card">
              <div 
                className="shop-card-image" 
                style={{ backgroundColor: item.color }}
              >
                <div className="shop-card-overlay">
                  <span className="shop-card-action">View</span>
                </div>
              </div>
              <div className="shop-card-info">
                <h3 className="shop-card-title">{item.title}</h3>
                <p className="shop-card-subtitle">{item.subtitle}</p>
                <span className="shop-card-price">{item.price}</span>
              </div>
            </div>
          ))}
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

      {/* Mute Button */}
      <button className="mute-btn" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
        {isMuted ? "🔇" : "🔊"}
      </button>
    </div>
  );
}

export default Music;
