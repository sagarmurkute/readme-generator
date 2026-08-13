import { GitHubRepo } from "@/types/github";
import { ReadmeBuilderConfig } from "@/types/config";

function escapeTableCell(text: string | null | undefined): string {
  if (!text) return "—";
  return text.replace(/\|/g, "\\|").replace(/[\r\n]+/g, " ").trim();
}

export function generateProjectsSection(
  config: ReadmeBuilderConfig,
  repos: GitHubRepo[] = []
): string[] {
  const { projects, username } = config;
  if (!projects.enabled) return [];

  const lines: string[] = [];

  let selectedRepos: GitHubRepo[] = [];

  if (projects.selectedRepoIds && projects.selectedRepoIds.length > 0) {
    selectedRepos = repos.filter((r) =>
      projects.selectedRepoIds.includes(r.id)
    );
  } else if (repos.length > 0) {
    selectedRepos = [...repos]
      .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
      .slice(0, 6);
  }

  const customProjects = projects.customProjects || [];

  if (selectedRepos.length === 0 && customProjects.length === 0) {
    return [];
  }

  lines.push("## ⭐ Featured Projects\n");

  if (projects.displayStyle === "grid" && username && selectedRepos.length > 0) {
    lines.push('<div align="center">\n');
    for (const repo of selectedRepos) {
      lines.push(
        `<a href="${repo.html_url}"><img src="https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${repo.name}&theme=${config.stats.theme || "radial"}" alt="${repo.name}" /></a>\n`
      );
    }
    lines.push("</div>\n");
  } else {
    // Table format
    lines.push("| Project | Description | Language | Stars | Forks |");
    lines.push("| :--- | :--- | :--- | :---: | :---: |");

    for (const project of selectedRepos) {
      const nameLink = `[**${escapeTableCell(project.name)}**](${project.html_url})`;
      const desc = escapeTableCell(project.description);
      const lang = project.language ? `\`${project.language}\`` : "—";
      const stars = `⭐ ${project.stargazers_count || 0}`;
      const forks = `🍴 ${project.forks_count || 0}`;

      lines.push(`| ${nameLink} | ${desc} | ${lang} | ${stars} | ${forks} |`);
    }

    for (const custom of customProjects) {
      const nameLink = custom.url ? `[**${escapeTableCell(custom.name)}**](${custom.url})` : `**${escapeTableCell(custom.name)}**`;
      const desc = escapeTableCell(custom.description);
      const lang = custom.language ? `\`${custom.language}\`` : "—";
      const stars = `⭐ ${custom.stars || 0}`;
      const forks = "—";

      lines.push(`| ${nameLink} | ${desc} | ${lang} | ${stars} | ${forks} |`);
    }
    lines.push("");
  }

  return lines;
}
