import { ReadmeBuilderConfig } from "@/types/config";
import {
  TECHNOLOGIES,
  TECH_CATEGORIES,
  TechCategory,
  buildTechBadgeUrl,
} from "@/lib/technologies";

export function generateSkillsSection(config: ReadmeBuilderConfig): string[] {
  const { skills } = config;
  if (!skills || !skills.enabled) return [];

  const lines: string[] = [];
  const badgeStyle = skills.badgeStyle || "for-the-badge";
  let hasAnySkill = false;

  const categoryBlocks: { title: string; badges: string[] }[] = [];

  for (const cat of TECH_CATEGORIES) {
    const listKey = cat === "Languages"
      ? "languages"
      : cat === "Frontend"
      ? "frontend"
      : cat === "Backend"
      ? "backend"
      : cat === "Databases"
      ? "databases"
      : cat === "Mobile"
      ? "mobile"
      : cat === "Cloud"
      ? "cloud"
      : cat === "DevOps"
      ? "devops"
      : cat === "AI/ML"
      ? "ai"
      : cat === "Design"
      ? "design"
      : cat === "Tools"
      ? "tools"
      : "other";

    const selectedNames = ((skills as any)[listKey] || []) as string[];
    const categoryBadges: string[] = [];

    for (const name of selectedNames) {
      const found = TECHNOLOGIES.find(
        (t) => t.category === cat && t.name.toLowerCase() === name.toLowerCase()
      );
      if (found) {
        const url = buildTechBadgeUrl(found, badgeStyle);
        categoryBadges.push(`![${found.name}](${url})`);
      } else {
        // Fallback for custom or unlisted names in that category
        const safeName = encodeURIComponent(name);
        categoryBadges.push(
          `![${name}](https://img.shields.io/badge/${safeName}-0969da?style=${badgeStyle})`
        );
      }
    }

    if (categoryBadges.length > 0) {
      categoryBlocks.push({
        title: cat,
        badges: categoryBadges,
      });
      hasAnySkill = true;
    }
  }

  // Custom skills
  if (skills.customSkills && skills.customSkills.length > 0) {
    const customBadges: string[] = [];
    for (const custom of skills.customSkills) {
      if (custom.name && custom.badgeUrl) {
        customBadges.push(`![${custom.name}](${custom.badgeUrl})`);
      }
    }
    if (customBadges.length > 0) {
      categoryBlocks.push({
        title: "Other Tools & Tech",
        badges: customBadges,
      });
      hasAnySkill = true;
    }
  }

  if (!hasAnySkill) return [];

  lines.push("## 🛠️ Tech Stack\n");

  for (const block of categoryBlocks) {
    lines.push(`### ${block.title}\n`);
    lines.push('<div align="left">\n');
    lines.push(block.badges.join(" "));
    lines.push("\n</div>\n");
  }

  return lines;
}
