import { ReadmeBuilderConfig } from "@/types/config";

export function generateExperienceSection(config: ReadmeBuilderConfig): string[] {
  const { experience } = config;
  if (!experience || !experience.enabled || !experience.items || experience.items.length === 0) {
    return [];
  }

  const validItems = experience.items.filter((item) => item.role || item.company);
  if (validItems.length === 0) return [];

  const lines: string[] = [];
  lines.push("## 💼 Work Experience\n");

  for (const item of validItems) {
    const role = item.role || "Role";
    const company = item.company ? `**${item.company}**` : "";
    const period = item.period ? ` · ${item.period}` : "";

    lines.push(`### ${role}\n`);
    if (company || period) {
      lines.push(`${company}${period}\n`);
    }
    if (item.description && item.description.trim()) {
      lines.push(`${item.description.trim()}\n`);
    }
  }

  return lines;
}
