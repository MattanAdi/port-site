import { useEffect, useRef } from "react";
import "./LoadingScreen.css";

function LoadingScreen({ onComplete }) {
  const loaderRef = useRef(null);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    // Add JS_on class to activate animation
    setTimeout(() => {
      loader.classList.add('JS_on');
    }, 100);

    // After animation completes, fade out and call onComplete
    const fadeTimeout = setTimeout(() => {
      loader.classList.remove('JS_on');
      
      // Fade out
      setTimeout(() => {
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
      }, 100);
    }, 3000); // Show loading for 3 seconds

    return () => {
      clearTimeout(fadeTimeout);
    };
  }, [onComplete]);

  return (
    <div className="loading-screen">
      <div className="loader" ref={loaderRef}>
        <span className="binary"></span>
        <span className="binary"></span>
        <span className="getting-there">LOADING STUFF...</span>
      </div>
    </div>
  );
}

export default LoadingScreen;

