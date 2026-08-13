import { ReadmeBuilderConfig } from "@/types/config";

export function generateSponsorsSection(config: ReadmeBuilderConfig): string[] {
  const { sponsors } = config;
  if (!sponsors || !sponsors.enabled) return [];

  const lines: string[] = [];
  const badges: string[] = [];

  if (sponsors.buyMeACoffee) {
    const handle = sponsors.buyMeACoffee.replace(/^https?:\/\/buymeacoffee\.com\//, "");
    badges.push(
      `[![Buy Me A Coffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/${handle})`
    );
  }

  if (sponsors.kofi) {
    const handle = sponsors.kofi.replace(/^https?:\/\/ko-fi\.com\//, "");
    badges.push(
      `[![Ko-Fi](https://img.shields.io/badge/Ko--Fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/${handle})`
    );
  }

  if (sponsors.patreon) {
    const handle = sponsors.patreon.replace(/^https?:\/\/patreon\.com\//, "");
    badges.push(
      `[![Patreon](https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white)](https://patreon.com/${handle})`
    );
  }

  if (sponsors.githubSponsors) {
    const handle = sponsors.githubSponsors.replace(/^https?:\/\/github\.com\/sponsors\//, "");
    badges.push(
      `[![Sponsor](https://img.shields.io/badge/Sponsor_Me-EA4AAA?style=for-the-badge&logo=githubsponsors&logoColor=white)](https://github.com/sponsors/${handle})`
    );
  }

  if (badges.length > 0) {
    lines.push("## 💖 Support & Sponsor\n");
    lines.push('<div align="left">\n');
    lines.push(badges.join(" "));
    lines.push("\n</div>\n");
  }

  return lines;
}
