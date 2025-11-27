import { useLocation } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

function Layout({ children }) {
  const location = useLocation(); // kept in case we later want route-based behavior

  const baseUrl = import.meta.env.BASE_URL || "/";
  const chefLogoSrc = `${baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`}chef.png`;

  const sectionLinks = [
    { id: "companies", label: "Companies" },
    { id: "tools", label: "Tools & Technologies" },
    { id: "projects", label: "Projects" },
  ];

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-left">
          <img src={chefLogoSrc} alt="Chef logo" className="top-bar-logo" />
        </div>
        <div className="top-bar-right">
          <DarkModeToggle />
        </div>
      </div>

      <nav className="vertical-section-nav" aria-label="Jump to sections">
        {sectionLinks.map((link) => (
          <a key={link.id} href={`#${link.id}`}>
            {link.label}
          </a>
        ))}
        <a className="vertical-section-nav__welcome-link" href="/welcome">
          Welcome page
        </a>
      </nav>

      {children}
    </>
  );
}

export default Layout;

