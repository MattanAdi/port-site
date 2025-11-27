import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const baseUrl = import.meta.env.BASE_URL || "/";
  const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const welcomeLogoSrc = `${cleanBase}tools/chefwelcome.png`;
  const navigate = useNavigate();

  const [isZooming, setIsZooming] = useState(false);

  const handleWelcomeClick = () => {
    if (isZooming) return;

    setIsZooming(true);

    setTimeout(() => {
      navigate("/", { replace: true });
    }, 950);
  };

  return (
    <div className={`welcome-overlay ${isZooming ? "welcome-overlay--zooming" : ""}`}>
      <div className="welcome-logo-wrap">
        <img
          src={welcomeLogoSrc}
          alt="Chef welcome logo"
          className={`welcome-logo ${isZooming ? "welcome-logo--zooming" : ""}`}
          onClick={handleWelcomeClick}
        />
      </div>
    </div>
  );
}

export default Welcome;

