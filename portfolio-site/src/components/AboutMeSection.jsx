import "./AboutMeOverlay.css";

const buildAssetPath = (filename) => {
  const baseUrl = import.meta.env.BASE_URL || "/";
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const normalizedFilename = filename.startsWith("/") ? filename.slice(1) : filename;
  return `${normalizedBase}${normalizedFilename}`;
};

function AboutMeSection() {
  return (
    <section id="about-me" className="about-me-section" aria-label="About Mattan Adi">
      <div className="about-me-content">
        <div className="about-hero">
          <div className="about-hero-text">
            <span className="about-me-greeting">Hello, I'm</span>
            <h1 className="about-me-name">Mattan Adi</h1>
            <div className="about-me-tagline">
              Developer • Sales Specialist • Workflow Innovations
            </div>
            <p className="about-hero-intro">
              Developer and problem solver specializing in sales operations and workflow innovations.
              I build clean, functional products that bridge technology and real-world solutions,
              turning ideas into efficient, user-friendly experiences.
            </p>
          </div>
          <img
            src={buildAssetPath("DSCF6463-2.JPG")}
            alt="Mattan Adi"
            className="about-hero-image"
            loading="lazy"
          />
        </div>

        <section className="about-background-section">
          <div className="about-background-header">
            <span className="about-topic-label">01</span>
            <h2 className="about-topic-title">Background</h2>
          </div>
          <div className="about-background-text-wide">
            <p>
              I was born in Staten Island, New York, and raised in the U.S. until age 15, when I moved
              to Israel through the NA'ALE program. There, I attended a boarding school until 18, after
              which I served in the Israeli military as a combat engineer.
            </p>
            <p>
              Since then, I've continued to live in Israel, gaining experience in multiple customer-facing
              and operations roles. Along the way, I discovered a passion for development, combining my
              technical skills with practical problem-solving and a strong understanding of workflows and
              real-world systems.
            </p>
          </div>
          <div className="about-background-images-row">
            <img
              src={buildAssetPath("naale.jpg")}
              alt="NA'ALE boarding school"
              className="about-background-img"
              loading="lazy"
            />
            <img
              src={buildAssetPath("army.jpg")}
              alt="Israeli military service"
              className="about-background-img"
              loading="lazy"
            />
          </div>
        </section>

        <section className="about-topic">
          <div className="about-topic-text">
            <span className="about-topic-label">02</span>
            <h2 className="about-topic-title">Passions & Interests</h2>
            <p>
              Outside of work, I enjoy cooking, staying active, hiking through Israel, and traveling. I have
              a curiosity for history and how it shapes the world we live in today.
            </p>
            <p>
              On the tech side, I like building projects, experimenting with AI tools, and finding ways to improve
              workflows. I'm drawn to problem-solving and creating things that are both practical and well-designed.
            </p>
          </div>
          <img
            src={buildAssetPath("IMG_0677.GIF")}
            alt="Passions and interests"
            className="about-topic-image"
            loading="lazy"
          />
        </section>

        <section className="about-topic about-topic--reverse">
          <img
            src={buildAssetPath("thats-so-raven-raven-symone.gif")}
            alt="Vision for the future"
            className="about-topic-image"
            loading="lazy"
          />
          <div className="about-topic-text">
            <span className="about-topic-label">03</span>
            <h2 className="about-topic-title">Vision for the Future</h2>
            <p>
              I'm focused on building technology that makes real-world processes smarter and more intuitive. My
              vision is to combine my experience in operations, development, and creative problem-solving to design
              products and workflows that genuinely improve how people work and interact with technology.
            </p>
            <p>
              Beyond coding, I aim to continuously learn, explore new tools, and push the boundaries of what's possible—
              whether through AI, full-stack development, or innovative project design. Ultimately, I want to create solutions
              that are elegant, practical, and meaningful, leaving a lasting impact for users and the teams I work with.
            </p>
          </div>
        </section>

        <section className="about-footer">
          <h2>Let's Connect</h2>
          <p>Want to collaborate or learn more? I'm just a message away.</p>
          <div className="about-footer-links">
            <a
              href="https://www.linkedin.com/in/mattan-adi/"
              target="_blank"
              rel="noreferrer"
              className="about-footer-btn"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/MattanAdi"
              target="_blank"
              rel="noreferrer"
              className="about-footer-btn"
            >
              GitHub
            </a>
            <a href="mailto:mattanadi1@gmail.com" className="about-footer-btn">
              Email
            </a>
          </div>
        </section>
      </div>
    </section>
  );
}

export default AboutMeSection;

