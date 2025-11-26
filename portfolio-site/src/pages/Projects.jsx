import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import DarkModeToggle from "../components/DarkModeToggle";
import "../App.css";
import "./Projects.css";

function Projects() {
  const navRef = useRef(null);
  const booksContainerRef = useRef(null);

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
  }, []);

  useEffect(() => {
    if (!booksContainerRef.current) return;

    const books = booksContainerRef.current.querySelectorAll('.wrap-original-transform');
    const eventHandlers = [];

    const shiftBooks = (activeBook) => {
      let isPrev = true;
      books.forEach((book) => {
        if (book === activeBook) {
          isPrev = false;
        } else if (isPrev) {
          book.classList.add('prev');
          book.style.transform = 'translateX(-350px)';
        } else {
          book.style.transform = 'translateX(700px)';
        }
      });
    };

    const resetBooks = () => {
      books.forEach((book) => {
        book.classList.remove('prev');
        book.style.transform = 'translateX(0)';
      });
    };

    books.forEach((book) => {
      const leftSide = book.querySelector('.leftSide');
      const front = book.querySelector('.front');

      // Create event handlers
      const handleMouseEnter = () => {
        book.classList.add('active');
        shiftBooks(book);
      };

      const handleMouseLeave = () => {
        book.classList.remove('active');
        resetBooks();
      };

      const handleLeftSideClick = (e) => {
        e.stopPropagation();
        book.classList.add('active');
        shiftBooks(book);
      };

      const handleFrontClick = (e) => {
        e.stopPropagation();
        book.classList.remove('active');
        resetBooks();
      };

      // Add event listeners
      book.addEventListener('mouseenter', handleMouseEnter);
      book.addEventListener('mouseleave', handleMouseLeave);
      
      if (leftSide) {
        leftSide.addEventListener('click', handleLeftSideClick);
      }

      if (front) {
        front.addEventListener('click', handleFrontClick);
      }

      // Store handlers for cleanup
      eventHandlers.push({
        book,
        leftSide,
        front,
        handleMouseEnter,
        handleMouseLeave,
        handleLeftSideClick,
        handleFrontClick,
      });
    });

    // Cleanup
    return () => {
      eventHandlers.forEach(({ book, leftSide, front, handleMouseEnter, handleMouseLeave, handleLeftSideClick, handleFrontClick }) => {
        book.removeEventListener('mouseenter', handleMouseEnter);
        book.removeEventListener('mouseleave', handleMouseLeave);
        if (leftSide) {
          leftSide.removeEventListener('click', handleLeftSideClick);
        }
        if (front) {
          front.removeEventListener('click', handleFrontClick);
        }
      });
    };
  }, []);

  return (
    <div className="page">
      <nav className="nav" ref={navRef}>
        <div className="nav-links">
        <Link to="/" className="nav-link">
          Resume
        </Link>
        <Link to="/projects" className="nav-link active">
          Projects
        </Link>
        <Link to="/music" className="nav-link">
          Music
        </Link>
          <Link to="/sales-operations" className="nav-link">
            Employment History
          </Link>
        </div>
        <DarkModeToggle />
      </nav>
      <main className="content projects-content">
        <section className="books-wrapper">
          <div className="books-container" ref={booksContainerRef}>
          <div className="wrap-original-transform book-1">
            <div className="original-transform">
              <div className="front"></div>
              <div className="back"></div>
              <div className="rightSide"></div>
              <div className="leftSide">
                <span className="author">LEO RASTOGI</span>
                <span className="title">ayam discover your beautiful self</span>
              </div>
              <div className="top"></div>
              <div className="bottom"></div>
            </div>
            <div className="text-container">
              <h2>Book Title</h2>
              <p>This is a description of the book. It contains interesting details about the content.</p>
              <button>Buy Now</button>
            </div>
          </div>

          <div className="wrap-original-transform book-2">
            <div className="original-transform">
              <div className="front"></div>
              <div className="back"></div>
              <div className="rightSide"></div>
              <div className="leftSide">
                <span className="author">LEO RASTOGI</span>
                <span className="title">The Lost Mysteries of Egypt</span>
              </div>
              <div className="top"></div>
              <div className="bottom"></div>
            </div>
            <div className="text-container">
              <h2>Book Title</h2>
              <p>This is a description of the book. It contains interesting details about the content.</p>
              <button>Buy Now</button>
            </div>
          </div>

          <div className="wrap-original-transform book-3">
            <div className="original-transform">
              <div className="front"></div>
              <div className="back"></div>
              <div className="rightSide"></div>
              <div className="leftSide">
                <span className="author">LEO RASTOGI</span>
                <span className="title">Many Paths, Many Truths</span>
              </div>
              <div className="top"></div>
              <div className="bottom"></div>
            </div>
          </div>

          <div className="wrap-original-transform book-4">
            <div className="original-transform">
              <div className="front"></div>
              <div className="back"></div>
              <div className="rightSide"></div>
              <div className="leftSide">
                <span className="author">LEO RASTOGI</span>
                <span className="title">Life is Good</span>
              </div>
              <div className="top"></div>
              <div className="bottom"></div>
            </div>
          </div>

          <div className="wrap-original-transform book-5">
            <div className="original-transform">
              <div className="front"></div>
              <div className="back"></div>
              <div className="rightSide"></div>
              <div className="leftSide">
                <span className="author">LEO RASTOGI</span>
                <span className="title">To Discover or To Believe</span>
              </div>
              <div className="top"></div>
              <div className="bottom"></div>
            </div>
          </div>

          <div className="wrap-original-transform book-6">
            <div className="original-transform">
              <div className="front"></div>
              <div className="back"></div>
              <div className="rightSide"></div>
              <div className="leftSide">
                <span className="author">LEO RASTOGI</span>
                <span className="title">Vedanta</span>
              </div>
              <div className="top"></div>
              <div className="bottom"></div>
            </div>
          </div>
        </div>
        </section>
        <section className="projects-showcase">
          <div className="section-heading">
            <p>Projects</p>
            <h2>Tools I’ve shipped</h2>
          </div>
          <div className="project-card highlight-zone">
            <div className="project-card__header">
              <div className="project-card__icon" aria-hidden="true" />
              <div>
                <h3>HighlightZone</h3>
                <span>Chrome Extension · November 2025</span>
              </div>
            </div>
            <p>
              HighlightZone detects timezones and current local time for any U.S. or Canadian phone number
              you highlight. The minimal popup works on top of any webpage without copying or leaving the
              browser, keeps privacy front and center, and stays Manifest V3 compliant for secure extension
              installs.
            </p>
            <ul className="project-card__features">
              <li>🕒 Instant timezone &amp; local time detection for every highlighted phone number.</li>
              <li>⚡ Inline popup that works on any webpage—no copying, no external tooling.</li>
              <li>🔒 Privacy-first; zero data collection or third-party requests.</li>
            </ul>
            <div className="project-card__actions">
              <a
                href="https://chromewebstore.google.com/detail/highlightzone/ioijeggbkkmefoolcebgaogdmnnfompj?utm_source=chatgpt.com"
                target="_blank"
                rel="noreferrer"
              >
                Visit on Chrome Web Store
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Projects;
