import { ReadmeBuilderConfig } from "@/types/config";

export function generateExtrasSection(config: ReadmeBuilderConfig): string[] {
  const { extras, stats } = config;
  if (!extras || !extras.enabled) return [];

  const lines: string[] = [];
  const theme = stats.theme || "radial";

  if (extras.showSpotifyWidget || extras.showJokeCard || extras.showWakatime) {
    lines.push("## 🎯 Fun & Extras\n");
    lines.push('<div align="center">\n');

    if (extras.showJokeCard) {
      lines.push(
        `![Random Joke](https://readme-jokes.vercel.app/api?theme=${theme})\n`
      );
    }

    if (extras.showWakatime && extras.wakatimeUsername) {
      lines.push(
        `![WakaTime](https://github-readme-stats.vercel.app/api/wakatime?username=${extras.wakatimeUsername}&theme=${theme})\n`
      );
    }

    if (extras.showSpotifyWidget) {
      lines.push(
        `![Spotify](https://spotify-github-readme.vercel.app/api/spotify?theme=${theme})\n`
      );
    }

    lines.push("</div>\n");
  }

  return lines;
}
