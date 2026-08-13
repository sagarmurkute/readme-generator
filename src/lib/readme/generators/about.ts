import { ReadmeBuilderConfig } from "@/types/config";

export function generateAboutSection(config: ReadmeBuilderConfig): string[] {
  const { about, username } = config;
  if (!about.enabled) return [];

  const lines: string[] = [];
  lines.push("## 🚀 About Me\n");

  if (about.content && about.content.trim()) {
    lines.push(about.content.trim() + "\n");
  } else {
    lines.push(`Software developer on GitHub as **@${username || "developer"}**.\n`);
  }

  const bullets: string[] = [];
  if (about.workingOn) bullets.push(`- 🔭 **I’m currently working on**: ${about.workingOn}`);
  if (about.learning) bullets.push(`- 🌱 **I’m currently learning**: ${about.learning}`);
  if (about.collaborateOn) bullets.push(`- 👯 **I’m looking to collaborate on**: ${about.collaborateOn}`);
  if (about.askMeAbout) bullets.push(`- 💬 **Ask me about**: ${about.askMeAbout}`);
  if (about.funFact) bullets.push(`- ⚡ **Fun fact**: ${about.funFact}`);
  if (about.reachMe) bullets.push(`- 📫 **How to reach me**: ${about.reachMe}`);

  if (bullets.length > 0) {
    lines.push("\n" + bullets.join("\n") + "\n");
  }

  return lines;
}
