import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DarkModeToggle from "../components/DarkModeToggle";
import "../App.css";

gsap.registerPlugin(ScrollTrigger);

// Two carousels, 6 items each. Replace image with your own file in /public and href with your YouTube link.
const carouselA = [
  {
    image: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    alt: "Video A1",
  },
  {
    image: "https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg",
    href: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    alt: "Video A2",
  },
  {
    image: "https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg",
    href: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
    alt: "Video A3",
  },
  {
    image: "https://img.youtube.com/vi/L_jWHffIx5E/hqdefault.jpg",
    href: "https://www.youtube.com/watch?v=L_jWHffIx5E",
    alt: "Video A4",
  },
  {
    image: "https://img.youtube.com/vi/CevxZvSJLk8/hqdefault.jpg",
    href: "https://www.youtube.com/watch?v=CevxZvSJLk8",
    alt: "Video A5",
  },
  {
    image: "https://img.youtube.com/vi/e-ORhEE9VVg/hqdefault.jpg",
    href: "https://www.youtube.com/watch?v=e-ORhEE9VVg",
    alt: "Video A6",
  },
];

const carouselB = [
  {
    image: "https://img.youtube.com/vi/fJ9rUzIMcZQ/hqdefault.jpg",
    href: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
    alt: "Video B1",
  },
  {
    image: "https://img.youtube.com/vi/kXYiU_JCYtU/hqdefault.jpg",
    href: "https://www.youtube.com/watch?v=kXYiU_JCYtU",
    alt: "Video B2",
  },
  {
    image: "https://img.youtube.com/vi/ktvTqknDobU/hqdefault.jpg",
    href: "https://www.youtube.com/watch?v=ktvTqknDobU",
    alt: "Video B3",
  },
  {
    image: "https://img.youtube.com/vi/2Vv-BfVoq4g/hqdefault.jpg",
    href: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
    alt: "Video B4",
  },
  {
    image: "https://img.youtube.com/vi/ScNNfyq3d_w/hqdefault.jpg",
    href: "https://www.youtube.com/watch?v=ScNNfyq3d_w",
    alt: "Video B5",
  },
  {
    image: "https://img.youtube.com/vi/60ItHLz5WEA/hqdefault.jpg",
    href: "https://www.youtube.com/watch?v=60ItHLz5WEA",
    alt: "Video B6",
  },
];

function Track({ items, reverse = false }) {
  // Duplicate items so the animation can loop seamlessly. Avoid padding on the track; use margins on frames only.
  const loop = [...items, ...items];
  
  return (
    <div className={`carousel ${reverse ? "reverse" : ""}`}>
      <div className="track" aria-hidden="true">
        {loop.map((it, idx) => (
          <a
            key={`${it.alt}-${idx}`}
            className="frame"
            href={it.href}
            target="_blank"
            rel="noreferrer noopener"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.1,
                y: -5,
                duration: 0.3,
                ease: "power2.out",
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            }}
          >
            <img src={it.image} alt={it.alt} />
          </a>
        ))}
      </div>
    </div>
  );
}

function Music() {
  const navRef = useRef(null);
  const contentRef = useRef(null);
  const carouselARef = useRef(null);
  const carouselBRef = useRef(null);

  useEffect(() => {
    if (!navRef.current) return;

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

    // Content animation
    if (contentRef.current) {
      const contentElements = Array.from(contentRef.current.querySelectorAll("h1, p"));
      if (contentElements.length > 0) {
        gsap.fromTo(contentElements,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.2,
          }
        );
      }
    }

    // Carousel animations
    if (carouselARef.current) {
      gsap.fromTo(carouselARef.current,
        {
          opacity: 0,
          x: -100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: carouselARef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    if (carouselBRef.current) {
      gsap.fromTo(carouselBRef.current,
        {
          opacity: 0,
          x: 100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: carouselBRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="page music-page">
      <nav className="nav" ref={navRef}>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            Resume
          </Link>
          <Link to="/projects" className="nav-link">
            Projects
          </Link>
          <Link to="/music" className="nav-link active">
            Music
          </Link>
          <Link to="/sales-operations" className="nav-link">
            Employment History
          </Link>
        </div>
        <DarkModeToggle />
      </nav>
      <main className="content" ref={contentRef}>
        <h1>Music</h1>
        <p>
          Two auto-scrolling carousels. Replace images and links with your own.
        </p>
        <div className="full-bleed" ref={carouselARef}>
          <Track items={carouselA} />
        </div>
        <div className="full-bleed" ref={carouselBRef}>
          <Track items={carouselB} reverse />
        </div>
      </main>
    </div>
  );
}

export default Music;
