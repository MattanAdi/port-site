import { useState } from "react";
import { useLocation } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

function Layout({ children }) {
  const location = useLocation(); // kept in case we later want route-based behavior

  const baseUrl = import.meta.env.BASE_URL || "/";
  const chefLogoSrc = `${baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`}chef.png`;

  const [showWelcome, setShowWelcome] = useState(true);
  const [isZooming, setIsZooming] = useState(false);

  const handleWelcomeClick = () => {
    if (isZooming) return;
    setIsZooming(true);

    // After the zoom animation, hide the welcome screen and reveal the main page
    setTimeout(() => {
      setShowWelcome(false);
    }, 950);
  };

  return (
    <>
      {showWelcome && (
        <div className={`welcome-overlay ${isZooming ? "welcome-overlay--zooming" : ""}`}>
          <div className="welcome-logo-wrap">
            <img
              src={`${baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`}tools/chefwelcome.png`}
              alt="Chef welcome logo"
              className={`welcome-logo ${isZooming ? "welcome-logo--zooming" : ""}`}
              onClick={handleWelcomeClick}
            />
          </div>
        </div>
      )}

      <div className="top-bar">
        <div className="top-bar-left">
          <img src={chefLogoSrc} alt="Chef logo" className="top-bar-logo" />
        </div>
        <div className="top-bar-right">
          <DarkModeToggle />
        </div>
      </div>

      {children}
    </>
  );
}

export default Layout;

