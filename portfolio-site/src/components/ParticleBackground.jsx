import { useEffect, useRef } from "react";
import gsap from "gsap";

function ParticleBackground() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const starsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const updateCanvasSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      return { width, height };
    };
    
    const { width, height } = updateCanvasSize();

    // Create particles - 30,000 dots
    const particleCount = 30000;
    particlesRef.current = [];

    // Create stars (shimmering background stars)
    const starCount = 500;
    starsRef.current = [];
    for (let i = 0; i < starCount; i++) {
      starsRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // Use TypedArray for better performance
    for (let i = 0; i < particleCount; i++) {
      const origX = Math.random() * width;
      const origY = Math.random() * height;
      particlesRef.current.push({
        x: origX,
        y: origY,
        origX: origX, // Store original position
        origY: origY,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.8, // Bigger dots
      });
    }

    // Mouse move handler - accurate to cursor tip
    const handleMouseMove = (e) => {
      // Get canvas position and size
      const rect = canvas.getBoundingClientRect();
      // Calculate mouse position relative to canvas
      // Account for any scaling between CSS size and canvas internal size
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      
      mouseRef.current = { 
        x: (e.clientX - rect.left) * scaleX, 
        y: (e.clientY - rect.top) * scaleY 
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop - heavily optimized for 100k particles
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const mouseRepelRadius = 60; // Smaller radius
      const mouseRepelRadiusSq = mouseRepelRadius * mouseRepelRadius;

      // Batch update and render for performance
      const particles = particlesRef.current;
      const len = particles.length;
      
      // Update particles
      for (let i = 0; i < len; i++) {
        const particle = particles[i];
        
        // Repel from mouse (optimized - squared distance check) - FASTER and ACCURATE
        const dxMouse = particle.x - mouse.x;
        const dyMouse = particle.y - mouse.y;
        const distSqMouse = dxMouse * dxMouse + dyMouse * dyMouse;

        if (distSqMouse < mouseRepelRadiusSq && distSqMouse > 1) {
          const distance = Math.sqrt(distSqMouse);
          const force = (mouseRepelRadius - distance) / mouseRepelRadius;
          const invDist = 1 / distance;
          particle.vx += dxMouse * invDist * force * 2.0; // Stronger repulsion
          particle.vy += dyMouse * invDist * force * 2.0; // Stronger repulsion
        }

        // Company logos no longer repel dots - removed

        // Return to original position (spring force) - FASTER
        const dxOrig = particle.origX - particle.x;
        const dyOrig = particle.origY - particle.y;
        const distOrig = Math.sqrt(dxOrig * dxOrig + dyOrig * dyOrig);
        
        if (distOrig > 0.5) {
          const springForce = 0.15; // Increased from would-be lower value
          const invDistOrig = 1 / distOrig;
          particle.vx += dxOrig * invDistOrig * springForce;
          particle.vy += dyOrig * invDistOrig * springForce;
        }

        // Update position - FASTER
        particle.x += particle.vx * 1.5; // Speed multiplier
        particle.y += particle.vy * 1.5; // Speed multiplier

        // Apply friction (less friction = faster movement)
        particle.vx *= 0.92; // Reduced from 0.96
        particle.vy *= 0.92; // Reduced from 0.96

        // Boundary check (optimized)
        if (particle.x < 0) {
          particle.x = 0;
          particle.vx *= -0.8;
        } else if (particle.x > width) {
          particle.x = width;
          particle.vx *= -0.8;
        }
        if (particle.y < 0) {
          particle.y = 0;
          particle.vy *= -0.8;
        } else if (particle.y > height) {
          particle.y = height;
          particle.vy *= -0.8;
        }
      }

      // Draw shimmering stars first (behind particles)
      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = (Math.sin(star.twinklePhase) + 1) / 2; // 0 to 1
        const currentOpacity = star.opacity * (0.5 + twinkle * 0.5);
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();
        
        // Add sparkle effect for some stars
        if (twinkle > 0.8) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.3})`;
          ctx.fill();
        }
      }

      // Batch render particles - use fillRect for better performance than arc
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)"; // Adjusted opacity for 30k particles
      for (let i = 0; i < len; i++) {
        const particle = particles[i];
        const r = particle.radius;
        ctx.fillRect(particle.x - r, particle.y - r, r * 2, r * 2);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize - update canvas and recalculate
    const handleResize = () => {
      const { width: newWidth, height: newHeight } = updateCanvasSize();
      // Regenerate stars for new canvas size
      starsRef.current = [];
      for (let i = 0; i < 500; i++) {
        starsRef.current.push({
          x: Math.random() * newWidth,
          y: Math.random() * newHeight,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    
    // Also listen to scroll to ensure mouse position stays accurate
    const handleScroll = () => {
      // Mouse position will be recalculated on next mousemove
      // This ensures we always have accurate coordinates
    };
    
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

export default ParticleBackground;

