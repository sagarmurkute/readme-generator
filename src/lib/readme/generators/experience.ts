import { ReadmeBuilderConfig } from "@/types/config";

export function generateExperienceSection(config: ReadmeBuilderConfig): string[] {
  const { experience } = config;
  if (!experience || !experience.enabled || !experience.items || experience.items.length === 0) {
    return [];
  }

  const lines: string[] = [];
  lines.push("## 💼 Work Experience\n");

  for (const item of experience.items) {
    if (item.role || item.company) {
      lines.push(`### ${item.role || "Role"} @ **${item.company || "Company"}**`);
      if (item.period) lines.push(`*${item.period}*\n`);
      if (item.description) lines.push(`${item.description}\n`);
    }
  }

  return lines;
}
