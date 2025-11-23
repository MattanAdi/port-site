import { useEffect, useRef } from "react";
import "./LoadingScreen.css";

function LoadingScreen({ onComplete }) {
  const loaderRef = useRef(null);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    // After animation completes, fade out and call onComplete
    const fadeTimeout = setTimeout(() => {
      if (loader.parentElement) {
        loader.parentElement.style.opacity = '0';
        loader.parentElement.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
          if (loader.parentElement) {
            loader.parentElement.style.display = 'none';
          }
          if (onComplete) {
            onComplete();
          }
        }, 500);
      }
    }, 5000); // Show loading for 5 seconds

    return () => {
      clearTimeout(fadeTimeout);
    };
  }, [onComplete]);

  return (
    <div className="loading-screen">
      <div className="snowflakes" ref={loaderRef}>
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i} className="snowflake">
            <img src="https://bestanimations.com/media/discs/895872755cd-animated-gif-9.gif" width="50" alt="snowflake" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoadingScreen;
