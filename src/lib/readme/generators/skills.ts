import { ReadmeBuilderConfig } from "@/types/config";
import { SKILL_CATEGORIES, buildBadgeUrl } from "@/utils/skillCatalog";

export function generateSkillsSection(config: ReadmeBuilderConfig): string[] {
  const { skills } = config;
  if (!skills.enabled) return [];

  const lines: string[] = [];
  const activeBadges: string[] = [];
  const badgeStyle = skills.badgeStyle || "for-the-badge";

  for (const cat of SKILL_CATEGORIES) {
    const selectedNames = ((skills as any)[cat.key] || []) as string[];
    for (const item of cat.items) {
      if (selectedNames.includes(item.name)) {
        const badgeUrl = buildBadgeUrl(item, badgeStyle);
        activeBadges.push(`![${item.name}](${badgeUrl})`);
      }
    }
  }

  if (skills.customSkills && skills.customSkills.length > 0) {
    for (const custom of skills.customSkills) {
      if (custom.name && custom.badgeUrl) {
        activeBadges.push(`![${custom.name}](${custom.badgeUrl})`);
      }
    }
  }

  if (activeBadges.length > 0) {
    lines.push("## 🛠️ Tech Stack\n");
    lines.push('<div align="left">\n');
    lines.push(activeBadges.join(" "));
    lines.push("\n</div>\n");
  }

  return lines;
}
