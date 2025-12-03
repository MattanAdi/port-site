// Use BASE_URL for proper asset paths in production
const getImagePath = (filename) => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  // Remove leading slash from filename if present, ensure baseUrl ends with /
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanFilename = filename.startsWith('/') ? filename.slice(1) : filename;
  return `${cleanBase}${cleanFilename}`;
};

export const companies = [
  {
    id: 1,
    name: "Connecteam",
    role: "Sales Development Representative",
    period: "Present",
    logoAlt: "Connecteam logo",
    background: "rgba(33, 150, 243, 0.1)",
    image: getImagePath('connecteam.png'),
    slug: "connecteam",
    bullets: [
      "Handled and qualified 50–100+ inbound leads weekly via chat, email, and demo requests",
      "Ensured strong first impressions and effective engagement in a B2B environment.",
    ],
  },
  {
    id: 2,
    name: "Haika Real Estate",
    role: "Sales Operations Manager",
    period: "2023 - 2025",
    logoAlt: "Haika Real Estate logo",
    background: "rgba(255, 213, 79, 0.12)",
    image: getImagePath('hakiala.png'),
    slug: "haika",
    bullets: [
      "Managed a sales team of 10 representatives, improving performance and increasing closing rates",
      "Conducted weekly 1:1s and team meetings to monitor KPIs and implement improvement strategies.",
      "Developed onboarding and training programs that reduced ramp-up time for new sales hires",
    ],
  },
  {
    id: 3,
    name: "El Al Airlines",
    role: "Back Office Representative",
    period: "2022",
    logoAlt: "El Al Airlines logo",
    background: "rgba(21, 101, 192, 0.12)",
    image: getImagePath('elal1.png'),
    slug: "elal",
    bullets: [
      "Provided B2C administrative support by assisting customer service agents with real-time issue resolution",
      "Coordinated between internal departments to quickly retrieve and verify passenger information",
      "Streamlined operational processes to help meet service-level deadlines and maintain workflow efficiency",
    ],
  },
  {
    id: 4,
    name: "Abilisense",
    role: "Full Stack Developer",
    period: "2022",
    logoAlt: "Abilisense logo",
    background: "rgba(239, 83, 80, 0.1)",
    image: getImagePath('abilisense.png'),
    slug: "abilisense",
    bullets: [
      "Built accessible, responsive web applications using React.js, HTML5, CSS3, and Node.js",
      "Integrated RESTful APIs to connect front-end interfaces with scalable back-end systems",
      "Collaborated in debugging and performance optimization to ensure smooth user experience across platforms",
    ],
  },
  {
    id: 5,
    name: "eToro",
    role: "Customer Service Representative",
    period: "2019 - 2021",
    logoAlt: "eToro logo",
    background: "rgba(76, 175, 80, 0.1)",
    image: getImagePath('eToro.png'),
    slug: "etoro",
    bullets: [
      "Collected and verified KYC documentation to support regulatory compliance and account activation",
      "Managed client accounts and responded to inquiries regarding trading activity, account access, and platform use",
      "Investigated technical issues related to trade execution, including potential platform errors and market gaps",
      "Handled escalated complaints with a focus on timely resolution and maintaining high client satisfaction",
    ],
  },
];

export const getCompanyBySlug = (slug) => {
  return companies.find((company) => company.slug === slug);
};

