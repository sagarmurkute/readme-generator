import { ReadmeBuilderConfig } from "@/types/config";

export function generateAboutSection(config: ReadmeBuilderConfig): string[] {
  const { about } = config;
  if (!about.enabled) return [];

  const lines: string[] = [];
  const bullets: string[] = [];

  if (about.workingOn && about.workingOn.trim()) {
    bullets.push(`- 🔭 **I’m currently working on**: ${about.workingOn.trim()}`);
  }
  if (about.learning && about.learning.trim()) {
    bullets.push(`- 🌱 **I’m currently learning**: ${about.learning.trim()}`);
  }
  if (about.collaborateOn && about.collaborateOn.trim()) {
    bullets.push(`- 👯 **I’m looking to collaborate on**: ${about.collaborateOn.trim()}`);
  }
  if (about.askMeAbout && about.askMeAbout.trim()) {
    bullets.push(`- 💬 **Ask me about**: ${about.askMeAbout.trim()}`);
  }
  if (about.funFact && about.funFact.trim()) {
    bullets.push(`- ⚡ **Fun fact**: ${about.funFact.trim()}`);
  }
  if (about.reachMe && about.reachMe.trim()) {
    bullets.push(`- 📫 **How to reach me**: ${about.reachMe.trim()}`);
  }

  const hasMainContent = about.content && about.content.trim().length > 0;
  if (!hasMainContent && bullets.length === 0) {
    return [];
  }

  lines.push("## 👨‍💻 About Me\n");

  if (hasMainContent) {
    lines.push(about.content.trim() + "\n");
  }

  if (bullets.length > 0) {
    lines.push(bullets.join("\n") + "\n");
  }

  return lines;
}
