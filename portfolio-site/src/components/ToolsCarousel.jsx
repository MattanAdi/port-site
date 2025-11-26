import { useState } from "react";
import "../App.css";

// Get image path helper
const getImagePath = (filename) => {
  const baseUrl = import.meta.env.BASE_URL || "/";
  const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const cleanFilename = filename.startsWith("/") ? filename.slice(1) : filename;
  return `${cleanBase}${cleanFilename}`;
};

const toolLabelOverrides = {
  "Adobe_Photoshop_CC_icon.svg.png": "Photoshop",
  "GoogleAn.png": "Google Analytics",
};

export const formatToolLabel = (filename) => {
  if (toolLabelOverrides[filename]) {
    return toolLabelOverrides[filename];
  }

  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .trim();
};

// Helper to convert filenames to image objects
const createToolImages = (filenames) => {
  return filenames.map((filename) => ({
    src: getImagePath(`tools/${filename}`),
    label: formatToolLabel(filename),
    filename,
  }));
};

const baseCategories = {
  design: {
    name: "Design, Media, and Creative Tools",
    filenames: [
      "Adobe_Photoshop_CC_icon.svg.png",
      "figma.png",
      "canva.png",
      "protopie.png"
    ]
  },
  business: {
    name: "Business and Ops Platforms",
    filenames: [
      "Salesforce.png",
      "Hubspot.png",
      "Looker.png",
      "GoogleAn.png",
      "salesloft.png",
      "Clarity.png",
      "BTT.png",
      "fireberry.png"
    ]
  },
  development: {
    name: "Development, Data & Infra",
    filenames: [
      "react.png",
      "Node.png",
      "nextjs.png",
      "Mongo.png",
      "Javascript.png",
      "CSS.png",
      "html.png",
      "Github.png",
      "amazon-s3.png"
    ]
  }
};

export const allToolFilenames = Array.from(
  new Set(
    Object.values(baseCategories).flatMap((category) => category.filenames)
  )
);

const categories = {
  all: {
    name: "All Tools",
    filenames: allToolFilenames,
  },
  ...baseCategories,
};

const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");

const smallToolSlugs = new Set(["javascript", "css", "nextjs", "html"]);

function ToolsCarousel() {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const getActiveCategoryImages = () => {
    const category = categories[activeCategory];
    return createToolImages(category.filenames);
  };
  
  const activeImages = getActiveCategoryImages();

  return (
    <div className="tools-carousel-section">
      <h2 className="tools-carousel-title">Tools & Technologies</h2>
      <div className="tools-category-navbar">
        {Object.entries(categories).map(([key, category]) => (
          <button
            key={key}
            className={`tools-category-item ${activeCategory === key ? 'active' : ''}`}
            onClick={() => setActiveCategory(key)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="tools-grid">
        {activeImages.map((tool, idx) => {
          const slug = slugify(tool.filename);
          const isCompact = smallToolSlugs.has(slug);
          return (
            <div
              key={`${tool.filename}-${idx}`}
              className={`tools-card ${isCompact ? "tools-card--compact" : ""} tools-card-${slug}`}
            >
              <div className="tools-card-inner">
                <img
                  src={tool.src}
                  alt={`${tool.label} logo`}
                  className="tools-card-logo"
                  loading="lazy"
                />
                <span className="tools-card-tooltip">{tool.label}</span>
              </div>
            </div>
          );
        })}
        {activeImages.length === 0 && (
        <div className="tools-carousel-empty">
          <p>No tools in this category yet. Add logos to see them here.</p>
        </div>
      )}
      </div>
    </div>
  );
}

export default ToolsCarousel;

