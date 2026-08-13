import { ReadmeBuilderConfig } from "@/types/config";

export function generateStatsSection(config: ReadmeBuilderConfig): string[] {
  const { stats, username } = config;
  if (!stats.enabled || !username) return [];

  const lines: string[] = [];
  const theme = stats.theme || "radial";

  lines.push("## 📊 GitHub Analytics\n");

  // GitHub Trophies Card
  if (stats.showTrophies) {
    lines.push(
      `<div align="center">\n  <img src="https://github-profile-trophy.vercel.app/?username=${username}&theme=${theme}&column=6&margin-w=15&margin-h=15" alt="GitHub Trophies" />\n</div>\n`
    );
  }

  lines.push('<div align="center">\n');

  if (stats.showStatsCard) {
    lines.push(
      `![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${theme}&count_private=true)\n`
    );
  }

  if (stats.showStreakCard) {
    lines.push(
      `![GitHub Streak](https://streak-stats.demolab.com?user=${username}&theme=${theme})\n`
    );
  }

  if (stats.showTopLangsCard) {
    lines.push(
      `![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${theme})\n`
    );
  }

  lines.push("</div>\n");

  // Daily Quote
  if (stats.showDailyQuote) {
    lines.push(
      `<div align="center">\n  <img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=${theme}" alt="Daily Quote" />\n</div>\n`
    );
  }

  // Snake Grid Animation
  if (stats.showSnakeGrid) {
    lines.push("### 🐍 Contribution Snake\n");
    lines.push(
      `<div align="center">\n  <img src="https://raw.githubusercontent.com/${username}/${username}/output/github-contribution-grid-snake.svg" alt="Snake Animation" />\n</div>\n`
    );
  }

  return lines;
}

export function generateActivitySection(config: ReadmeBuilderConfig): string[] {
  const { activity, username } = config;
  if (!activity.enabled || !username) return [];

  const lines: string[] = [];
  lines.push("## 📈 GitHub Activity Graph\n");
  lines.push(
    `<div align="center">\n  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=github-compact" alt="Activity Graph" />\n</div>\n`
  );
  return lines;
}
