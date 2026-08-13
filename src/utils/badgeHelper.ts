/**
 * Maps programming language names to Shields.io badge URLs with official brand logos and colors.
 */
interface BadgeConfig {
  label: string;
  color: string;
  logo: string;
  logoColor?: string;
}

const BADGE_MAP: Record<string, BadgeConfig> = {
  TypeScript: { label: "TypeScript", color: "3178C6", logo: "typescript", logoColor: "white" },
  JavaScript: { label: "JavaScript", color: "F7DF1E", logo: "javascript", logoColor: "black" },
  Python: { label: "Python", color: "3776AB", logo: "python", logoColor: "white" },
  HTML: { label: "HTML5", color: "E34F26", logo: "html5", logoColor: "white" },
  CSS: { label: "CSS3", color: "1572B6", logo: "css3", logoColor: "white" },
  Go: { label: "Go", color: "00ADD8", logo: "go", logoColor: "white" },
  Rust: { label: "Rust", color: "000000", logo: "rust", logoColor: "white" },
  Java: { label: "Java", color: "ED8B00", logo: "openjdk", logoColor: "white" },
  "C++": { label: "C++", color: "00599C", logo: "cplusplus", logoColor: "white" },
  "C#": { label: "C#", color: "239120", logo: "c-sharp", logoColor: "white" },
  C: { label: "C", color: "A8B9CC", logo: "c", logoColor: "white" },
  PHP: { label: "PHP", color: "777BB4", logo: "php", logoColor: "white" },
  Ruby: { label: "Ruby", color: "CC342D", logo: "ruby", logoColor: "white" },
  Swift: { label: "Swift", color: "F05138", logo: "swift", logoColor: "white" },
  Kotlin: { label: "Kotlin", color: "7F52FF", logo: "kotlin", logoColor: "white" },
  Dart: { label: "Dart", color: "0175C2", logo: "dart", logoColor: "white" },
  Shell: { label: "Shell", color: "89E051", logo: "gnu-bash", logoColor: "black" },
  Bash: { label: "Bash", color: "4EAA25", logo: "gnu-bash", logoColor: "white" },
  Vue: { label: "Vue.js", color: "4FC08D", logo: "vuedotjs", logoColor: "white" },
  React: { label: "React", color: "61DAFB", logo: "react", logoColor: "black" },
  Svelte: { label: "Svelte", color: "FF3E00", logo: "svelte", logoColor: "white" },
  Docker: { label: "Docker", color: "2496ED", logo: "docker", logoColor: "white" },
};

export function getShieldsBadgeUrl(language: string): string {
  const config = BADGE_MAP[language];
  if (config) {
    const encodedLabel = encodeURIComponent(config.label);
    const logoColor = config.logoColor || "white";
    return `https://img.shields.io/badge/${encodedLabel}-${config.color}?style=for-the-badge&logo=${config.logo}&logoColor=${logoColor}`;
  }

  // Fallback badge for unlisted languages
  const safeLang = encodeURIComponent(language);
  return `https://img.shields.io/badge/${safeLang}-ff6b00?style=for-the-badge`;
}

export function generateBadgeMarkdown(language: string): string {
  const badgeUrl = getShieldsBadgeUrl(language);
  return `![${language}](${badgeUrl})`;
}
