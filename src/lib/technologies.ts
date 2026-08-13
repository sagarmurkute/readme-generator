import { BadgeStyle } from "@/types/config";

export type TechCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Mobile"
  | "Databases"
  | "Cloud"
  | "DevOps"
  | "AI/ML"
  | "Testing"
  | "Tools"
  | "Design"
  | "Other";

export interface Technology {
  id: string;
  name: string;
  category: TechCategory;
  slug: string;
  color: string;
  logoColor?: string;
  aliases?: string[];
}

export const TECH_CATEGORIES: TechCategory[] = [
  "Languages",
  "Frontend",
  "Backend",
  "Mobile",
  "Databases",
  "Cloud",
  "DevOps",
  "AI/ML",
  "Testing",
  "Tools",
  "Design",
  "Other",
];

export const TECHNOLOGIES: Technology[] = [
  // Languages
  { id: "js", name: "JavaScript", category: "Languages", slug: "javascript", color: "F7DF1E", logoColor: "black", aliases: ["js", "ecmascript"] },
  { id: "ts", name: "TypeScript", category: "Languages", slug: "typescript", color: "3178C6", logoColor: "white", aliases: ["ts"] },
  { id: "py", name: "Python", category: "Languages", slug: "python", color: "3776AB", logoColor: "white", aliases: ["py"] },
  { id: "java", name: "Java", category: "Languages", slug: "openjdk", color: "ED8B00", logoColor: "white", aliases: ["java", "jvm"] },
  { id: "c", name: "C", category: "Languages", slug: "c", color: "A8B9CC", logoColor: "white", aliases: ["c-lang"] },
  { id: "cpp", name: "C++", category: "Languages", slug: "cplusplus", color: "00599C", logoColor: "white", aliases: ["cpp", "cplusplus"] },
  { id: "csharp", name: "C#", category: "Languages", slug: "csharp", color: "239120", logoColor: "white", aliases: ["cs", "csharp", "dotnet"] },
  { id: "go", name: "Go", category: "Languages", slug: "go", color: "00ADD8", logoColor: "white", aliases: ["golang"] },
  { id: "rust", name: "Rust", category: "Languages", slug: "rust", color: "000000", logoColor: "white", aliases: ["rs"] },
  { id: "php", name: "PHP", category: "Languages", slug: "php", color: "777BB4", logoColor: "white" },
  { id: "ruby", name: "Ruby", category: "Languages", slug: "ruby", color: "CC342D", logoColor: "white", aliases: ["rb"] },
  { id: "swift", name: "Swift", category: "Languages", slug: "swift", color: "F05138", logoColor: "white", aliases: ["ios"] },
  { id: "kotlin", name: "Kotlin", category: "Languages", slug: "kotlin", color: "7F52FF", logoColor: "white", aliases: ["kt"] },
  { id: "dart", name: "Dart", category: "Languages", slug: "dart", color: "0175C2", logoColor: "white", aliases: ["flutter"] },
  { id: "r", name: "R", category: "Languages", slug: "r", color: "276DC3", logoColor: "white" },
  { id: "scala", name: "Scala", category: "Languages", slug: "scala", color: "DC322F", logoColor: "white" },
  { id: "lua", name: "Lua", category: "Languages", slug: "lua", color: "2C2D72", logoColor: "white" },
  { id: "bash", name: "Bash", category: "Languages", slug: "gnubash", color: "4EAA25", logoColor: "white", aliases: ["sh", "shell"] },
  { id: "powershell", name: "PowerShell", category: "Languages", slug: "powershell", color: "5391FE", logoColor: "white", aliases: ["ps"] },
  { id: "sql", name: "SQL", category: "Languages", slug: "sqlite", color: "003B57", logoColor: "white" },

  // Frontend
  { id: "html5", name: "HTML5", category: "Frontend", slug: "html5", color: "E34F26", logoColor: "white", aliases: ["html"] },
  { id: "css3", name: "CSS3", category: "Frontend", slug: "css3", color: "1572B6", logoColor: "white", aliases: ["css"] },
  { id: "react", name: "React", category: "Frontend", slug: "react", color: "61DAFB", logoColor: "black", aliases: ["reactjs"] },
  { id: "nextjs", name: "Next.js", category: "Frontend", slug: "nextdotjs", color: "000000", logoColor: "white", aliases: ["next", "nextjs"] },
  { id: "vue", name: "Vue", category: "Frontend", slug: "vuedotjs", color: "4FC08D", logoColor: "white", aliases: ["vuejs"] },
  { id: "nuxt", name: "Nuxt", category: "Frontend", slug: "nuxtdotjs", color: "00DC82", logoColor: "white", aliases: ["nuxtjs"] },
  { id: "angular", name: "Angular", category: "Frontend", slug: "angular", color: "DD0031", logoColor: "white", aliases: ["ng"] },
  { id: "svelte", name: "Svelte", category: "Frontend", slug: "svelte", color: "FF3E00", logoColor: "white" },
  { id: "sveltekit", name: "SvelteKit", category: "Frontend", slug: "svelte", color: "FF3E00", logoColor: "white" },
  { id: "astro", name: "Astro", category: "Frontend", slug: "astro", color: "BC52EE", logoColor: "white" },
  { id: "vite", name: "Vite", category: "Frontend", slug: "vite", color: "646CFF", logoColor: "white" },
  { id: "tailwindcss", name: "Tailwind CSS", category: "Frontend", slug: "tailwindcss", color: "06B6D4", logoColor: "white", aliases: ["tailwind"] },
  { id: "bootstrap", name: "Bootstrap", category: "Frontend", slug: "bootstrap", color: "7952B3", logoColor: "white" },
  { id: "mui", name: "Material UI", category: "Frontend", slug: "mui", color: "007FFF", logoColor: "white", aliases: ["mui", "material-ui"] },
  { id: "redux", name: "Redux", category: "Frontend", slug: "redux", color: "764ABC", logoColor: "white" },
  { id: "zustand", name: "Zustand", category: "Frontend", slug: "react", color: "443E38", logoColor: "white" },
  { id: "framer-motion", name: "Framer Motion", category: "Frontend", slug: "framer", color: "0055FF", logoColor: "white", aliases: ["framer"] },
  { id: "threejs", name: "Three.js", category: "Frontend", slug: "threedotjs", color: "000000", logoColor: "white", aliases: ["three"] },

  // Backend
  { id: "nodejs", name: "Node.js", category: "Backend", slug: "nodedotjs", color: "339933", logoColor: "white", aliases: ["node"] },
  { id: "express", name: "Express", category: "Backend", slug: "express", color: "000000", logoColor: "white", aliases: ["expressjs"] },
  { id: "nestjs", name: "NestJS", category: "Backend", slug: "nestjs", color: "E0234E", logoColor: "white", aliases: ["nest"] },
  { id: "django", name: "Django", category: "Backend", slug: "django", color: "092E20", logoColor: "white" },
  { id: "flask", name: "Flask", category: "Backend", slug: "flask", color: "000000", logoColor: "white" },
  { id: "fastapi", name: "FastAPI", category: "Backend", slug: "fastapi", color: "009688", logoColor: "white" },
  { id: "spring", name: "Spring", category: "Backend", slug: "spring", color: "6DB33F", logoColor: "white", aliases: ["springboot"] },
  { id: "laravel", name: "Laravel", category: "Backend", slug: "laravel", color: "FF2D20", logoColor: "white" },
  { id: "rails", name: "Ruby on Rails", category: "Backend", slug: "rubyonrails", color: "D30001", logoColor: "white", aliases: ["rails"] },
  { id: "aspnet", name: "ASP.NET", category: "Backend", slug: "dotnet", color: "512BD4", logoColor: "white", aliases: ["net", "dotnet"] },

  // Mobile
  { id: "react-native", name: "React Native", category: "Mobile", slug: "react", color: "61DAFB", logoColor: "black", aliases: ["rn"] },
  { id: "flutter", name: "Flutter", category: "Mobile", slug: "flutter", color: "02569B", logoColor: "white" },
  { id: "android", name: "Android", category: "Mobile", slug: "android", color: "34A853", logoColor: "white" },
  { id: "ios", name: "iOS", category: "Mobile", slug: "apple", color: "000000", logoColor: "white" },
  { id: "expo", name: "Expo", category: "Mobile", slug: "expo", color: "000000", logoColor: "white" },

  // Databases
  { id: "mongodb", name: "MongoDB", category: "Databases", slug: "mongodb", color: "47A248", logoColor: "white", aliases: ["mongo"] },
  { id: "postgresql", name: "PostgreSQL", category: "Databases", slug: "postgresql", color: "4169E1", logoColor: "white", aliases: ["postgres"] },
  { id: "mysql", name: "MySQL", category: "Databases", slug: "mysql", color: "4479A1", logoColor: "white" },
  { id: "sqlite", name: "SQLite", category: "Databases", slug: "sqlite", color: "003B57", logoColor: "white" },
  { id: "redis", name: "Redis", category: "Databases", slug: "redis", color: "DC382D", logoColor: "white" },
  { id: "supabase", name: "Supabase", category: "Databases", slug: "supabase", color: "3ECF8E", logoColor: "white" },
  { id: "firebase", name: "Firebase", category: "Databases", slug: "firebase", color: "FFCA28", logoColor: "black" },
  { id: "prisma", name: "Prisma", category: "Databases", slug: "prisma", color: "2D3748", logoColor: "white" },
  { id: "drizzle", name: "Drizzle", category: "Databases", slug: "drizzle", color: "C5F74F", logoColor: "black" },

  // Cloud
  { id: "aws", name: "AWS", category: "Cloud", slug: "amazonwebservices", color: "232F3E", logoColor: "white", aliases: ["amazon"] },
  { id: "azure", name: "Microsoft Azure", category: "Cloud", slug: "microsoftazure", color: "0089D6", logoColor: "white", aliases: ["azure"] },
  { id: "gcp", name: "Google Cloud", category: "Cloud", slug: "googlecloud", color: "4285F4", logoColor: "white", aliases: ["gcp"] },
  { id: "cloudflare", name: "Cloudflare", category: "Cloud", slug: "cloudflare", color: "F38020", logoColor: "white" },
  { id: "vercel", name: "Vercel", category: "Cloud", slug: "vercel", color: "000000", logoColor: "white" },
  { id: "netlify", name: "Netlify", category: "Cloud", slug: "netlify", color: "00C7B7", logoColor: "white" },
  { id: "digitalocean", name: "DigitalOcean", category: "Cloud", slug: "digitalocean", color: "0080FF", logoColor: "white" },

  // DevOps
  { id: "docker", name: "Docker", category: "DevOps", slug: "docker", color: "2496ED", logoColor: "white" },
  { id: "kubernetes", name: "Kubernetes", category: "DevOps", slug: "kubernetes", color: "326CE5", logoColor: "white", aliases: ["k8s"] },
  { id: "github-actions", name: "GitHub Actions", category: "DevOps", slug: "githubactions", color: "2088FF", logoColor: "white", aliases: ["actions"] },
  { id: "jenkins", name: "Jenkins", category: "DevOps", slug: "jenkins", color: "D24939", logoColor: "white" },
  { id: "terraform", name: "Terraform", category: "DevOps", slug: "terraform", color: "844FBA", logoColor: "white" },
  { id: "nginx", name: "Nginx", category: "DevOps", slug: "nginx", color: "009639", logoColor: "white" },
  { id: "linux", name: "Linux", category: "DevOps", slug: "linux", color: "FCC624", logoColor: "black" },

  // AI / ML
  { id: "pytorch", name: "PyTorch", category: "AI/ML", slug: "pytorch", color: "EE4C2C", logoColor: "white" },
  { id: "tensorflow", name: "TensorFlow", category: "AI/ML", slug: "tensorflow", color: "FF6F00", logoColor: "white", aliases: ["tf"] },
  { id: "scikit-learn", name: "scikit-learn", category: "AI/ML", slug: "scikitlearn", color: "F7931E", logoColor: "white", aliases: ["sklearn"] },
  { id: "openai", name: "OpenAI", category: "AI/ML", slug: "openai", color: "412991", logoColor: "white" },
  { id: "huggingface", name: "Hugging Face", category: "AI/ML", slug: "huggingface", color: "FFD21E", logoColor: "black" },
  { id: "langchain", name: "LangChain", category: "AI/ML", slug: "langchain", color: "1C3C3C", logoColor: "white" },
  { id: "pandas", name: "Pandas", category: "AI/ML", slug: "pandas", color: "150458", logoColor: "white" },
  { id: "numpy", name: "NumPy", category: "AI/ML", slug: "numpy", color: "013243", logoColor: "white" },

  // Testing
  { id: "jest", name: "Jest", category: "Testing", slug: "jest", color: "C21325", logoColor: "white" },
  { id: "vitest", name: "Vitest", category: "Testing", slug: "vitest", color: "6E9F18", logoColor: "white" },
  { id: "cypress", name: "Cypress", category: "Testing", slug: "cypress", color: "69D3A7", logoColor: "black" },
  { id: "playwright", name: "Playwright", category: "Testing", slug: "playwright", color: "2EAD33", logoColor: "white" },
  { id: "selenium", name: "Selenium", category: "Testing", slug: "selenium", color: "43B02A", logoColor: "white" },

  // Tools
  { id: "git", name: "Git", category: "Tools", slug: "git", color: "F05032", logoColor: "white" },
  { id: "github", name: "GitHub", category: "Tools", slug: "github", color: "181717", logoColor: "white" },
  { id: "vscode", name: "VS Code", category: "Tools", slug: "visualstudiocode", color: "007ACC", logoColor: "white" },
  { id: "postman", name: "Postman", category: "Tools", slug: "postman", color: "FF6C37", logoColor: "white" },
  { id: "npm", name: "npm", category: "Tools", slug: "npm", color: "CB3837", logoColor: "white" },
  { id: "pnpm", name: "pnpm", category: "Tools", slug: "pnpm", color: "F69220", logoColor: "white" },
  { id: "yarn", name: "Yarn", category: "Tools", slug: "yarn", color: "2C8EBB", logoColor: "white" },

  // Design
  { id: "figma", name: "Figma", category: "Design", slug: "figma", color: "F24E1E", logoColor: "white" },
  { id: "photoshop", name: "Photoshop", category: "Design", slug: "adobephotoshop", color: "31A8FF", logoColor: "white" },
  { id: "illustrator", name: "Illustrator", category: "Design", slug: "adobeillustrator", color: "FF9A00", logoColor: "white" },
  { id: "canva", name: "Canva", category: "Design", slug: "canva", color: "00C4CC", logoColor: "white" },
  { id: "affinity-designer", name: "Affinity Designer", category: "Design", slug: "affinitydesigner", color: "1B72BA", logoColor: "white" },
];

export function buildTechBadgeUrl(tech: Technology, style: BadgeStyle = "for-the-badge"): string {
  const logo = encodeURIComponent(tech.slug);
  const name = encodeURIComponent(tech.name.replace(/-/g, "_"));
  const color = tech.color || "0969da";
  const logoColor = tech.logoColor || "white";
  return `https://img.shields.io/badge/${name}-${color}?style=${style}&logo=${logo}&logoColor=${logoColor}`;
}

export function searchTechnologies(query: string, categoryFilter: TechCategory | "All" = "All"): Technology[] {
  const q = query.trim().toLowerCase();
  return TECHNOLOGIES.filter((tech) => {
    const matchesCategory = categoryFilter === "All" || tech.category === categoryFilter;
    if (!matchesCategory) return false;
    if (!q) return true;

    const nameMatch = tech.name.toLowerCase().includes(q);
    const aliasMatch = tech.aliases ? tech.aliases.some((a) => a.toLowerCase().includes(q)) : false;
    return nameMatch || aliasMatch;
  });
}
