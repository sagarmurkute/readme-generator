export type SectionId =
  | "header"
  | "about"
  | "socials"
  | "skills"
  | "stats"
  | "topLangs"
  | "streak"
  | "profileViews"
  | "contributionGraph"
  | "projects"
  | "experience"
  | "sponsors"
  | "extras"
  | "activity"
  | "custom";

export type BadgeStyle = "for-the-badge" | "flat-square" | "flat" | "plastic" | "social";

export type StatsTheme =
  | "radial"
  | "github_dark"
  | "dracula"
  | "synthwave"
  | "tokyonight"
  | "one-dark"
  | "nord"
  | "gruvbox"
  | "catppuccin_mocha"
  | "outrun";

export interface HeaderConfig {
  enabled: boolean;
  name: string;
  greeting: string;
  typingText: string;
  typingLines: string[];
  showTypingSvg: boolean;
  showAvatar: boolean;
  avatarUrl: string;
  avatarStyle: "circle" | "rounded" | "square";
  alignment: "left" | "center";
  bannerType: "none" | "capsule" | "custom";
  bannerUrl: string;
  bannerCapsuleTheme: string;
  statusBadge: string;
  showProfileViews: boolean;
  showStarsBadge: boolean;
  showFollowersBadge: boolean;
}

export interface AboutConfig {
  enabled: boolean;
  content: string;
  workingOn?: string;
  learning?: string;
  collaborateOn?: string;
  askMeAbout?: string;
  funFact?: string;
  reachMe?: string;
}

export interface CustomLinkItem {
  id: string;
  label: string;
  url: string;
}

export interface SocialsConfig {
  enabled: boolean;
  badgeStyle: BadgeStyle;
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  youtube: string;
  facebook: string;
  discord: string;
  email: string;
  portfolio: string;
  customLinks: CustomLinkItem[];
}

export interface SkillsConfig {
  enabled: boolean;
  badgeStyle: BadgeStyle;
  languages: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  mobile: string[];
  cloud: string[];
  devops: string[];
  ai: string[];
  design: string[];
  tools: string[];
  other: string[];
  customSkills: { name: string; badgeUrl: string }[];
}

export interface StatsConfig {
  enabled: boolean;
  theme: StatsTheme;
  showStatsCard: boolean;
  showTopLangsCard: boolean;
  showStreakCard: boolean;
  showProfileViews: boolean;
  showTrophies: boolean;
  showSnakeGrid: boolean;
  showDailyQuote: boolean;
}

export interface CustomProjectItem {
  id: string;
  name: string;
  description: string;
  language: string;
  url: string;
  stars: number;
}

export interface ProjectsConfig {
  enabled: boolean;
  displayStyle: "grid" | "table";
  selectedRepoIds: number[];
  customProjects: CustomProjectItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface ExperienceConfig {
  enabled: boolean;
  items: ExperienceItem[];
}

export interface SponsorsConfig {
  enabled: boolean;
  buyMeACoffee?: string;
  kofi?: string;
  patreon?: string;
  githubSponsors?: string;
}

export interface ExtrasConfig {
  enabled: boolean;
  spotifyTheme?: string;
  showSpotifyWidget: boolean;
  showJokeCard: boolean;
  showWakatime: boolean;
  wakatimeUsername?: string;
}

export interface ActivityConfig {
  enabled: boolean;
  showActivityGraph: boolean;
}

export interface CustomSectionConfig {
  enabled: boolean;
  heading: string;
  content: string;
}

export interface ReadmeBuilderConfig {
  username: string;
  header: HeaderConfig;
  about: AboutConfig;
  socials: SocialsConfig;
  skills: SkillsConfig;
  stats: StatsConfig;
  projects: ProjectsConfig;
  experience: ExperienceConfig;
  sponsors: SponsorsConfig;
  extras: ExtrasConfig;
  activity: ActivityConfig;
  custom: CustomSectionConfig;
  sectionOrder: SectionId[];
}

