import { ReadmeBuilderConfig } from "@/types/config";

function escapeTableCell(text: string | null | undefined): string {
  if (!text) return "—";
  return text.replace(/\|/g, "\\|").replace(/[\r\n]+/g, " ").trim();
}

export function generateSocialsSection(config: ReadmeBuilderConfig): string[] {
  const { socials } = config;
  if (!socials.enabled) return [];

  const lines: string[] = [];
  const badges: string[] = [];
  const style = socials.badgeStyle || "for-the-badge";

  if (socials.github) {
    const handle = socials.github.replace(/^https?:\/\/github\.com\//, "");
    badges.push(
      `[![GitHub](https://img.shields.io/badge/GitHub-100000?style=${style}&logo=github&logoColor=white)](https://github.com/${handle})`
    );
  }
  if (socials.linkedin) {
    const link = socials.linkedin.startsWith("http")
      ? socials.linkedin
      : `https://linkedin.com/in/${socials.linkedin}`;
    badges.push(
      `[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=${style}&logo=linkedin&logoColor=white)](${link})`
    );
  }
  if (socials.twitter) {
    const handle = socials.twitter.replace(/^@/, "");
    badges.push(
      `[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=${style}&logo=twitter&logoColor=white)](https://twitter.com/${handle})`
    );
  }
  if (socials.instagram) {
    const handle = socials.instagram.replace(/^@/, "");
    badges.push(
      `[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=${style}&logo=instagram&logoColor=white)](https://instagram.com/${handle})`
    );
  }
  if (socials.youtube) {
    const link = socials.youtube.startsWith("http")
      ? socials.youtube
      : `https://youtube.com/@${socials.youtube}`;
    badges.push(
      `[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=${style}&logo=youtube&logoColor=white)](${link})`
    );
  }
  if (socials.facebook) {
    badges.push(
      `[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=${style}&logo=facebook&logoColor=white)](https://facebook.com/${socials.facebook})`
    );
  }
  if (socials.discord) {
    badges.push(
      `[![Discord](https://img.shields.io/badge/Discord-5865F2?style=${style}&logo=discord&logoColor=white)](${socials.discord})`
    );
  }
  if (socials.email) {
    badges.push(
      `[![Email](https://img.shields.io/badge/Email-D14836?style=${style}&logo=gmail&logoColor=white)](mailto:${socials.email})`
    );
  }
  if (socials.portfolio) {
    const link = socials.portfolio.startsWith("http")
      ? socials.portfolio
      : `https://${socials.portfolio}`;
    badges.push(
      `[![Portfolio](https://img.shields.io/badge/Website-000000?style=${style}&logo=aboutdotme&logoColor=white)](${link})`
    );
  }

  if (socials.customLinks && socials.customLinks.length > 0) {
    for (const customLink of socials.customLinks) {
      if (customLink.url) {
        const link = customLink.url.startsWith("http")
          ? customLink.url
          : `https://${customLink.url}`;
        badges.push(
          `[**${escapeTableCell(customLink.label || "Link")}**](${link})`
        );
      }
    }
  }

  if (badges.length > 0) {
    lines.push("## 📬 Connect with Me\n");
    lines.push('<div align="left">\n');
    lines.push(badges.join(" "));
    lines.push("\n</div>\n");
  }

  return lines;
}
