import { useEffect, useRef } from "react";

function TrailCursor() {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const mouseMovedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // For intro motion
    let mouseMoved = false;
    const pointer = {
      x: 0.5 * window.innerWidth,
      y: 0.5 * window.innerHeight,
    };

    const params = {
      pointsNumber: 40,
      widthFactor: 0.3,
      mouseThreshold: 0.6,
      spring: 0.4,
      friction: 0.5
    };

    const trail = new Array(params.pointsNumber);
    for (let i = 0; i < params.pointsNumber; i++) {
      trail[i] = {
        x: pointer.x,
        y: pointer.y,
        dx: 0,
        dy: 0,
      };
    }

    const updateMousePosition = (eX, eY) => {
      pointer.x = eX;
      pointer.y = eY;
    };

    const handleClick = (e) => {
      updateMousePosition(e.clientX, e.clientY);
    };

    const handleMouseMove = (e) => {
      mouseMoved = true;
      mouseMovedRef.current = true;
      updateMousePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      mouseMoved = true;
      mouseMovedRef.current = true;
      if (e.targetTouches && e.targetTouches[0]) {
        updateMousePosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
      }
    };

    const setupCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Reset pointer position on resize
      pointer.x = 0.5 * window.innerWidth;
      pointer.y = 0.5 * window.innerHeight;
    };

    let startTime = performance.now();

    const update = (t) => {
      // For intro motion
      if (!mouseMovedRef.current) {
        const elapsed = t - startTime;
        pointer.x = (0.5 + 0.3 * Math.cos(0.002 * elapsed) * (Math.sin(0.005 * elapsed))) * window.innerWidth;
        pointer.y = (0.5 + 0.2 * (Math.cos(0.005 * elapsed)) + 0.1 * Math.cos(0.01 * elapsed)) * window.innerHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trail.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
        const spring = pIdx === 0 ? 0.4 * params.spring : params.spring;

        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
      });

      // Get color based on dark mode
      const isDarkMode = document.body.classList.contains('dark-mode');
      ctx.strokeStyle = isDarkMode ? '#ffffff' : '#000000';
      
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);

      for (let i = 1; i < trail.length - 1; i++) {
        const xc = 0.5 * (trail[i].x + trail[i + 1].x);
        const yc = 0.5 * (trail[i].y + trail[i + 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
        ctx.stroke();
      }

      ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
      ctx.stroke();

      animationFrameRef.current = requestAnimationFrame(update);
    };

    setupCanvas();
    update(0);

    window.addEventListener("click", handleClick);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("resize", setupCanvas);

    // Hide default cursor
    document.body.style.cursor = "none";

    // Watch for dark mode changes
    const darkModeObserver = new MutationObserver(() => {
      // Color will be updated in the next frame
    });
    darkModeObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", setupCanvas);
      darkModeObserver.disconnect();
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
        backgroundColor: "transparent",
      }}
    />
  );
}

export default TrailCursor;

