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

export function normalizeMarkdown(markdown: string): string {
  if (!markdown) return "";
  let result = markdown;
  // Replace undefined or null string occurrences
  result = result.replace(/undefined/g, "").replace(/null/g, "");
  // Replace 3+ consecutive newlines with 2 newlines
  result = result.replace(/\n{3,}/g, "\n\n");
  // Trim trailing line whitespace
  result = result
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");
  return result.trim() + "\n";
}

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
        if (lines.length > 0) allLines.push(...lines);
        break;
      }
      case "about": {
        const lines = generateAboutSection(config);
        if (lines.length > 0) allLines.push(...lines);
        break;
      }
      case "socials": {
        const lines = generateSocialsSection(config);
        if (lines.length > 0) allLines.push(...lines);
        break;
      }
      case "skills": {
        const lines = generateSkillsSection(config);
        if (lines.length > 0) allLines.push(...lines);
        break;
      }
      case "stats": {
        const lines = generateStatsSection(config);
        if (lines.length > 0) allLines.push(...lines);
        break;
      }
      case "projects": {
        const lines = generateProjectsSection(config, repos);
        if (lines.length > 0) allLines.push(...lines);
        break;
      }
      case "experience": {
        const lines = generateExperienceSection(config);
        if (lines.length > 0) allLines.push(...lines);
        break;
      }
      case "sponsors": {
        const lines = generateSponsorsSection(config);
        if (lines.length > 0) allLines.push(...lines);
        break;
      }
      case "extras": {
        const lines = generateExtrasSection(config);
        if (lines.length > 0) allLines.push(...lines);
        break;
      }
      case "contributionGraph":
      case "activity": {
        const lines = generateActivitySection(config);
        if (lines.length > 0) allLines.push(...lines);
        break;
      }
      case "custom": {
        if (custom && custom.enabled && custom.heading && custom.heading.trim()) {
          allLines.push(`## ${custom.heading.trim()}\n`);
          if (custom.content && custom.content.trim()) {
            allLines.push(custom.content.trim() + "\n");
          }
        }
        break;
      }
    }
  }

  const rawMarkdown = allLines.join("\n");
  return normalizeMarkdown(rawMarkdown);
}
