import { ReadmeBuilderConfig } from "@/types/config";

function escapeTableCell(text: string | null | undefined): string {
  if (!text) return "—";
  return text.replace(/\|/g, "\\|").replace(/[\r\n]+/g, " ").trim();
}

export function generateHeaderSection(config: ReadmeBuilderConfig): string[] {
  const { header, username } = config;
  if (!header.enabled) return [];

  const lines: string[] = [];
  const displayName = header.name || username || "Developer";
  const greeting = header.greeting || "Hi there";
  const isCenter = header.alignment === "center";

  // Alignment Wrapper
  lines.push(isCenter ? '<div align="center">\n' : '<div align="left">\n');

  // Header Banner
  if (header.bannerType === "capsule") {
    const theme = header.bannerCapsuleTheme || "waving";
    const textParam = encodeURIComponent(displayName);
    lines.push(
      `![Header Banner](https://capsule-render.vercel.app/api?type=${theme}&color=auto&height=180&section=header&text=${textParam}&fontSize=40&animation=fadeIn)\n`
    );
  } else if (header.bannerType === "custom" && header.bannerUrl) {
    lines.push(`![Banner](${header.bannerUrl})\n`);
  }

  // Greeting & Title
  lines.push(`# ${greeting}, I'm ${displayName} 👋\n`);

  // Status Badge
  if (header.statusBadge && header.statusBadge.trim()) {
    const statusText = encodeURIComponent(header.statusBadge.trim());
    lines.push(
      `![Status](https://img.shields.io/badge/Status-${statusText}-0969da?style=flat-square)\n`
    );
  }

  // Avatar Image
  if (header.showAvatar && header.avatarUrl) {
    const borderRadius =
      header.avatarStyle === "circle"
        ? "50%"
        : header.avatarStyle === "rounded"
        ? "16px"
        : "4px";
    lines.push(
      `<img src="${header.avatarUrl}" width="120" height="120" style="border-radius: ${borderRadius};" alt="${escapeTableCell(
        displayName
      )}" />\n`
    );
  }

  // Typing SVG Animation
  if (header.showTypingSvg) {
    const rawLines =
      header.typingLines && header.typingLines.length > 0
        ? header.typingLines
        : header.typingText
        ? header.typingText.split(",")
        : ["Full Stack Developer", "Open Source Contributor"];

    const encoded = rawLines
      .map((l) => encodeURIComponent(l.trim()))
      .join(";");

    const centerParam = isCenter ? "&center=true" : "";
    lines.push(
      `![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=0969DA${centerParam}&vCenter=true&width=500&lines=${encoded})\n`
    );
  }

  // Badges: Profile Views, Followers, Stars
  const badges: string[] = [];
  if (header.showProfileViews && username) {
    badges.push(
      `![Profile Views](https://komarev.com/ghpvc/?username=${username}&color=0969da)`
    );
  }
  if (header.showFollowersBadge && username) {
    badges.push(
      `![Followers](https://img.shields.io/github/followers/${username}?style=flat-square&color=0969da)`
    );
  }

  if (badges.length > 0) {
    lines.push(`${badges.join(" ")}\n`);
  }

  lines.push("</div>\n");

  return lines;
}
