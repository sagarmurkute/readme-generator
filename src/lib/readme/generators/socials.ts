import { ReadmeBuilderConfig } from "@/types/config";

function escapeTableCell(text: string | null | undefined): string {
  if (!text) return "—";
  return text.replace(/\|/g, "\\|").replace(/[\r\n]+/g, " ").trim();
}

export function generateSocialsSection(config: ReadmeBuilderConfig): string[] {
  const { socials } = config;
  if (!socials || !socials.enabled) return [];

  const lines: string[] = [];
  const badges: string[] = [];
  const style = socials.badgeStyle || "for-the-badge";

  if (socials.github && socials.github.trim()) {
    const handle = socials.github.trim().replace(/^https?:\/\/github\.com\//, "");
    if (handle) {
      badges.push(
        `[![GitHub](https://img.shields.io/badge/GitHub-100000?style=${style}&logo=github&logoColor=white)](https://github.com/${handle})`
      );
    }
  }

  if (socials.linkedin && socials.linkedin.trim()) {
    const raw = socials.linkedin.trim();
    const link = raw.startsWith("http") ? raw : `https://linkedin.com/in/${raw}`;
    badges.push(
      `[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=${style}&logo=linkedin&logoColor=white)](${link})`
    );
  }

  if (socials.twitter && socials.twitter.trim()) {
    const handle = socials.twitter.trim().replace(/^@/, "");
    if (handle) {
      badges.push(
        `[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=${style}&logo=twitter&logoColor=white)](https://twitter.com/${handle})`
      );
    }
  }

  if (socials.instagram && socials.instagram.trim()) {
    const handle = socials.instagram.trim().replace(/^@/, "");
    if (handle) {
      badges.push(
        `[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=${style}&logo=instagram&logoColor=white)](https://instagram.com/${handle})`
      );
    }
  }

  if (socials.youtube && socials.youtube.trim()) {
    const raw = socials.youtube.trim();
    const link = raw.startsWith("http") ? raw : `https://youtube.com/@${raw}`;
    badges.push(
      `[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=${style}&logo=youtube&logoColor=white)](${link})`
    );
  }

  if (socials.facebook && socials.facebook.trim()) {
    const raw = socials.facebook.trim();
    badges.push(
      `[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=${style}&logo=facebook&logoColor=white)](https://facebook.com/${raw})`
    );
  }

  if (socials.discord && socials.discord.trim()) {
    const raw = socials.discord.trim();
    badges.push(
      `[![Discord](https://img.shields.io/badge/Discord-5865F2?style=${style}&logo=discord&logoColor=white)](${raw})`
    );
  }

  if (socials.email && socials.email.trim()) {
    const raw = socials.email.trim();
    badges.push(
      `[![Email](https://img.shields.io/badge/Email-D14836?style=${style}&logo=gmail&logoColor=white)](mailto:${raw})`
    );
  }

  if (socials.portfolio && socials.portfolio.trim()) {
    const raw = socials.portfolio.trim();
    const link = raw.startsWith("http") ? raw : `https://${raw}`;
    badges.push(
      `[![Website](https://img.shields.io/badge/Website-000000?style=${style}&logo=aboutdotme&logoColor=white)](${link})`
    );
  }

  if (socials.customLinks && socials.customLinks.length > 0) {
    for (const customLink of socials.customLinks) {
      if (customLink.url && customLink.url.trim()) {
        const link = customLink.url.trim().startsWith("http")
          ? customLink.url.trim()
          : `https://${customLink.url.trim()}`;
        badges.push(
          `[**${escapeTableCell(customLink.label || "Link")}**](${link})`
        );
      }
    }
  }

  if (badges.length === 0) return [];

  lines.push("## 🌐 Connect with me\n");
  lines.push('<div align="left">\n');
  lines.push(badges.join(" "));
  lines.push("\n</div>\n");

  return lines;
}
