import { useEffect, useRef, useState } from "react";
import "../App.css";

// Get image path helper
const getImagePath = (filename) => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanFilename = filename.startsWith('/') ? filename.slice(1) : filename;
  return `${cleanBase}${cleanFilename}`;
};

// Helper to convert filenames to image objects
const createToolImages = (filenames) => {
  return filenames.map(filename => ({
    src: getImagePath(`tools/${filename}`),
    name: filename.replace(/\.[^.]+$/, '').replace(/([A-Z])/g, ' $1').trim()
  }));
};

// Category definitions - add filenames to each array as needed
// To add a logo: 1. Add image to public/tools/ folder, 2. Add filename to the appropriate category array below
const categories = {
  design: {
    name: "Design, Media, and Creative Tools",
    filenames: [
      // Add filenames here (e.g., 'Figma.png', 'Adobe.png')
    ]
  },
  business: {
    name: "Business and Operations Platforms",
    filenames: [
      // Add filenames here (e.g., 'Salesforce.png', 'Hubspot.png')
    ]
  },
  development: {
    name: "Development and Engineering",
    filenames: [
      // Add filenames here (e.g., 'React.png', 'Node.png')
    ]
  }
};

function ToolsCarousel() {
  const [activeCategory, setActiveCategory] = useState(null);
  const carouselRef = useRef(null);
  
  // Get images for the active category
  const getActiveCategoryImages = () => {
    if (!activeCategory) return [];
    const category = categories[activeCategory];
    return createToolImages(category.filenames);
  };
  
  const activeImages = getActiveCategoryImages();
  
  // Create multiple duplicates for seamless infinite scroll
  const duplicatedImages = activeImages.length > 0 ? [
    ...activeImages, 
    ...activeImages, 
    ...activeImages, 
    ...activeImages
  ] : [];

  return (
    <div className="tools-carousel-section">
      <h2 className="tools-carousel-title">Tools & Technologies</h2>
      
      {/* Category Navbar */}
      <div className="tools-category-navbar">
        {Object.keys(categories).map((key) => (
          <div
            key={key}
            className={`tools-category-item ${activeCategory === key ? 'active' : ''}`}
            onMouseEnter={() => setActiveCategory(key)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            {categories[key].name}
          </div>
        ))}
      </div>
      
      {/* Carousel - only shows when a category is hovered */}
      {activeCategory && activeImages.length > 0 && (
        <div className="tools-carousel-wrapper">
          <div className="tools-carousel" ref={carouselRef}>
            <div className="tools-carousel-track">
              {duplicatedImages.map((tool, index) => (
                <div key={`${tool.name}-${index}`} className="tools-carousel-item">
                  <img 
                    src={tool.src} 
                    alt={tool.name}
                    className="tools-carousel-logo"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Show message when category is hovered but empty */}
      {activeCategory && activeImages.length === 0 && (
        <div className="tools-carousel-empty">
          <p>No tools in this category yet. Add logos to see them here.</p>
        </div>
      )}
    </div>
  );
}

export default ToolsCarousel;

