import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

function Layout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Show loading screen on every route change
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Match animation duration

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        {children}
      </div>
    </>
  );
}

export default Layout;

