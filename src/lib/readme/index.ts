import { GitHubRepo } from "@/types/github";
import { ReadmeBuilderConfig } from "@/types/config";
import { generateHeaderSection } from "./generators/header";
import { generateAboutSection } from "./generators/about";
import { generateSkillsSection } from "./generators/skills";
import { generateStatsSection, generateActivitySection } from "./generators/stats";
import { generateSocialsSection } from "./generators/socials";
import { generateProjectsSection } from "./generators/projects";
import { generateExperienceSection } from "./generators/experience";
import { generateSponsorsSection } from "./generators/sponsors";
import { generateExtrasSection } from "./generators/extras";

export function generateFullReadme(
  config: ReadmeBuilderConfig,
  repos: GitHubRepo[] = []
): string {
  const { custom, sectionOrder } = config;
  const allLines: string[] = [];

  for (const sectionId of sectionOrder) {
    switch (sectionId) {
      case "header": {
        const lines = generateHeaderSection(config);
        allLines.push(...lines);
        break;
      }
      case "about": {
        const lines = generateAboutSection(config);
        allLines.push(...lines);
        break;
      }
      case "socials": {
        const lines = generateSocialsSection(config);
        allLines.push(...lines);
        break;
      }
      case "skills": {
        const lines = generateSkillsSection(config);
        allLines.push(...lines);
        break;
      }
      case "stats": {
        const lines = generateStatsSection(config);
        allLines.push(...lines);
        break;
      }
      case "projects": {
        const lines = generateProjectsSection(config, repos);
        allLines.push(...lines);
        break;
      }
      case "experience": {
        const lines = generateExperienceSection(config);
        allLines.push(...lines);
        break;
      }
      case "sponsors": {
        const lines = generateSponsorsSection(config);
        allLines.push(...lines);
        break;
      }
      case "extras": {
        const lines = generateExtrasSection(config);
        allLines.push(...lines);
        break;
      }
      case "contributionGraph":
      case "activity": {
        const lines = generateActivitySection(config);
        allLines.push(...lines);
        break;
      }
      case "custom": {
        if (custom && custom.enabled && custom.heading) {
          allLines.push(`## ${custom.heading.trim()}\n`);
          if (custom.content) {
            allLines.push(custom.content.trim() + "\n");
          }
        }
        break;
      }
    }
  }

  return allLines.join("\n");
}
