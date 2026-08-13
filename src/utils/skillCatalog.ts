import { BadgeStyle } from "@/types/config";

export interface SkillItem {
  name: string;
  slug: string;
  color: string;
  logoColor?: string;
  defaultBadgeUrl?: string;
}

export interface SkillCategory {
  title: string;
  key:
    | "languages"
    | "frontend"
    | "backend"
    | "databases"
    | "mobile"
    | "cloud"
    | "devops"
    | "ai"
    | "design"
    | "tools"
    | "other";
  items: SkillItem[];
}

export function buildBadgeUrl(skill: SkillItem, style: BadgeStyle = "for-the-badge"): string {
  const logo = encodeURIComponent(skill.slug);
  const name = encodeURIComponent(skill.name.replace(/-/g, "_"));
  const color = skill.color;
  const logoColor = skill.logoColor || (color.toLowerCase() === "ffffff" || color.toLowerCase() === "f7df1e" ? "black" : "white");
  return `https://img.shields.io/badge/${name}-${color}?style=${style}&logo=${logo}&logoColor=${logoColor}`;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    key: "languages",
    items: [
      { name: "TypeScript", slug: "typescript", color: "3178C6" },
      { name: "JavaScript", slug: "javascript", color: "F7DF1E", logoColor: "black" },
      { name: "Python", slug: "python", color: "3776AB" },
      { name: "C++", slug: "cplusplus", color: "00599C" },
      { name: "Java", slug: "openjdk", color: "ED8B00" },
      { name: "Go", slug: "go", color: "00ADD8" },
      { name: "Rust", slug: "rust", color: "000000" },
      { name: "PHP", slug: "php", color: "777BB4" },
      { name: "Ruby", slug: "ruby", color: "CC342D" },
      { name: "Swift", slug: "swift", color: "F05138" },
      { name: "Kotlin", slug: "kotlin", color: "7F52FF" },
      { name: "C#", slug: "c-sharp", color: "239120" },
      { name: "Dart", slug: "dart", color: "0175C2" },
      { name: "HTML5", slug: "html5", color: "E34F26" },
      { name: "CSS3", slug: "css3", color: "1572B6" },
    ],
  },
  {
    title: "Frontend Development",
    key: "frontend",
    items: [
      { name: "React", slug: "react", color: "61DAFB", logoColor: "black" },
      { name: "Next.js", slug: "nextdotjs", color: "000000" },
      { name: "Vue.js", slug: "vuedotjs", color: "4FC08D" },
      { name: "Nuxt.js", slug: "nuxtdotjs", color: "00DC82" },
      { name: "Svelte", slug: "svelte", color: "FF3E00" },
      { name: "Angular", slug: "angular", color: "DD0031" },
      { name: "TailwindCSS", slug: "tailwind-css", color: "38B2AC" },
      { name: "Bootstrap", slug: "bootstrap", color: "7952B3" },
      { name: "Sass", slug: "sass", color: "CC6699" },
      { name: "Redux", slug: "redux", color: "764ABC" },
      { name: "GraphQL", slug: "graphql", color: "E10098" },
    ],
  },
  {
    title: "Backend Development",
    key: "backend",
    items: [
      { name: "Node.js", slug: "nodedotjs", color: "339933" },
      { name: "Express.js", slug: "express", color: "000000" },
      { name: "Django", slug: "django", color: "092E20" },
      { name: "Flask", slug: "flask", color: "000000" },
      { name: "FastAPI", slug: "fastapi", color: "009688" },
      { name: "NestJS", slug: "nestjs", color: "E0234E" },
      { name: "Spring Boot", slug: "springboot", color: "6DB33F" },
      { name: "Laravel", slug: "laravel", color: "FF2D20" },
      { name: ".NET", slug: "dotnet", color: "512BD4" },
    ],
  },
  {
    title: "Mobile Development",
    key: "mobile",
    items: [
      { name: "Flutter", slug: "flutter", color: "02569B" },
      { name: "React Native", slug: "react", color: "61DAFB", logoColor: "black" },
      { name: "Android", slug: "android", color: "3DDC84", logoColor: "black" },
      { name: "iOS", slug: "apple", color: "000000" },
      { name: "Expo", slug: "expo", color: "000002" },
    ],
  },
  {
    title: "AI, ML & Data Science",
    key: "ai",
    items: [
      { name: "PyTorch", slug: "pytorch", color: "EE4C2C" },
      { name: "TensorFlow", slug: "tensorflow", color: "FF6F00" },
      { name: "OpenAI", slug: "openai", color: "412991" },
      { name: "Pandas", slug: "pandas", color: "150458" },
      { name: "NumPy", slug: "numpy", color: "013243" },
      { name: "Scikit-Learn", slug: "scikitlearn", color: "F7931E" },
      { name: "Keras", slug: "keras", color: "D00000" },
    ],
  },
  {
    title: "Databases & Storage",
    key: "databases",
    items: [
      { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
      { name: "MongoDB", slug: "mongodb", color: "47A248" },
      { name: "MySQL", slug: "mysql", color: "4479A1" },
      { name: "Redis", slug: "redis", color: "DC382D" },
      { name: "SQLite", slug: "sqlite", color: "003B57" },
      { name: "Firebase", slug: "firebase", color: "FFCA28", logoColor: "black" },
      { name: "Supabase", slug: "supabase", color: "3ECF8E" },
      { name: "Prisma", slug: "prisma", color: "2D3748" },
    ],
  },
  {
    title: "Cloud & Hosting",
    key: "cloud",
    items: [
      { name: "AWS", slug: "amazon-aws", color: "232F3E" },
      { name: "Google Cloud", slug: "google-cloud", color: "4285F4" },
      { name: "Azure", slug: "microsoft-azure", color: "0089D6" },
      { name: "Vercel", slug: "vercel", color: "000000" },
      { name: "Netlify", slug: "netlify", color: "00C7B7" },
      { name: "Cloudflare", slug: "cloudflare", color: "F38020" },
      { name: "DigitalOcean", slug: "digitalocean", color: "0080FF" },
    ],
  },
  {
    title: "DevOps & CI/CD",
    key: "devops",
    items: [
      { name: "Docker", slug: "docker", color: "2496ED" },
      { name: "Kubernetes", slug: "kubernetes", color: "326CE5" },
      { name: "Git", slug: "git", color: "F05032" },
      { name: "GitHub Actions", slug: "github-actions", color: "2088FF" },
      { name: "Terraform", slug: "terraform", color: "7B42BC" },
      { name: "Nginx", slug: "nginx", color: "009639" },
    ],
  },
  {
    title: "Design & UI Tools",
    key: "design",
    items: [
      { name: "Figma", slug: "figma", color: "F24E1E" },
      { name: "Adobe XD", slug: "adobexd", color: "FF61F6" },
      { name: "Canva", slug: "canva", color: "00C4CC" },
      { name: "Photoshop", slug: "adobephotoshop", color: "31A8FF" },
    ],
  },
  {
    title: "Tools & Utilities",
    key: "tools",
    items: [
      { name: "VS Code", slug: "visual-studio-code", color: "007ACC" },
      { name: "Postman", slug: "postman", color: "FF6C37" },
      { name: "Linux", slug: "linux", color: "FCC624", logoColor: "black" },
      { name: "Vite", slug: "vite", color: "646CFF" },
      { name: "Webpack", slug: "webpack", color: "8DD6F9", logoColor: "black" },
      { name: "Neovim", slug: "neovim", color: "57A143" },
    ],
  },
  {
    title: "Other Technologies",
    key: "other",
    items: [
      { name: "WebAssembly", slug: "webassembly", color: "654FF0" },
      { name: "Jest", slug: "jest", color: "C21325" },
      { name: "Cypress", slug: "cypress", color: "17202C" },
      { name: "Playwright", slug: "playwright", color: "2EAD33" },
    ],
  },
];

