import { useEffect, useRef } from "react";

function TubesCursor() {
  const canvasRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || appRef.current) return;

    let isCancelled = false;

    // Dynamically import the TubesCursor library
    const initTubesCursor = async () => {
      try {
        // Try dynamic import
        const module = await import("https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js");
        const TubesCursor = module.default || module;

        if (!isCancelled && canvas) {
          // Use getElementById to match the original code pattern
          const canvasElement = document.getElementById("canvas");
          if (canvasElement) {
            appRef.current = TubesCursor(canvasElement, {
              tubes: {
                colors: ["#f967fb", "#53bc28", "#6958d5"],
                radius: 0.1,
                thickness: 0.1,
                size: 0.1,
                scale: 0.2,
                strokeWidth: 0,
                border: false,
                wireframe: false,
                lights: {
                  intensity: 100,
                  colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"]
                }
              },
              // Ensure transparent background
              renderer: {
                alpha: true,
                transparent: true,
                clearColor: 0x000000,
                clearAlpha: 0
              },
              // Set scene background to transparent
              scene: {
                background: null
              }
            });
            
            // Try to access the renderer and scene directly to set transparency
            if (appRef.current) {
              try {
                // Access renderer if available
                if (appRef.current.renderer) {
                  appRef.current.renderer.setClearColor(0x000000, 0);
                }
                // Access scene if available
                if (appRef.current.scene) {
                  appRef.current.scene.background = null;
                }
              } catch (e) {
                // API might not support direct access
              }
            }
            
            // Try to access the renderer and set transparent background
            setTimeout(() => {
              if (appRef.current && !isCancelled) {
                try {
                  // Access renderer if available to set transparent background
                  if (appRef.current.renderer) {
                    appRef.current.renderer.setClearColor(0x000000, 0);
                  }
                  // Access scene if available
                  if (appRef.current.scene) {
                    appRef.current.scene.background = null;
                  }
                  // Try different API methods to reduce size
                  if (appRef.current.tubes) {
                    if (appRef.current.tubes.setRadius) {
                      appRef.current.tubes.setRadius(0.1);
                    }
                    if (appRef.current.tubes.setScale) {
                      appRef.current.tubes.setScale(0.2);
                    }
                    if (appRef.current.tubes.setSize) {
                      appRef.current.tubes.setSize(0.2);
                    }
                  }
                  if (appRef.current.scale) {
                    appRef.current.scale = 0.2;
                  }
                } catch (e) {
                  console.log("Could not access renderer/scene directly:", e);
                }
              }
            }, 100);
          }
        }
      } catch (error) {
        console.error("Failed to load TubesCursor:", error);
      }
    };

    initTubesCursor();

    // Click handler to change colors
    const randomColors = (count) => {
      return new Array(count)
        .fill(0)
        .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"));
    };

    const handleClick = () => {
      if (appRef.current) {
        const colors = randomColors(3);
        const lightsColors = randomColors(4);
        appRef.current.tubes.setColors(colors);
        appRef.current.tubes.setLightsColors(lightsColors);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      isCancelled = true;
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
        backgroundColor: "transparent",
        background: "transparent",
        opacity: 1,
        border: "none",
        outline: "none",
      }}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}

export default TubesCursor;

