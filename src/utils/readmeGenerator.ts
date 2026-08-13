import { GitHubRepo } from "@/types/github";
import { ReadmeBuilderConfig } from "@/types/config";
import { generateFullReadme } from "@/lib/readme";

export function generateConfiguredReadme(
  config: ReadmeBuilderConfig,
  repos: GitHubRepo[] = []
): string {
  return generateFullReadme(config, repos);
}
