import { generateConfiguredReadme } from "../readmeGenerator";
import { ReadmeBuilderConfig } from "@/types/config";
import { GitHubRepo } from "@/types/github";

const DEFAULT_TEST_CONFIG: ReadmeBuilderConfig = {
  username: "sagarmurkute",
  header: {
    enabled: true,
    name: "Sagar Murkute",
    greeting: "Hi there",
    typingText: "Full Stack Developer",
    typingLines: ["Full Stack Developer"],
    showTypingSvg: true,
    showAvatar: true,
    avatarUrl: "https://avatars.githubusercontent.com/u/9919?v=4",
    avatarStyle: "rounded",
    alignment: "left",
    bannerType: "capsule",
    bannerUrl: "",
    bannerCapsuleTheme: "waving",
    statusBadge: "🟢 Open for work",
    showProfileViews: true,
    showStarsBadge: true,
    showFollowersBadge: true,
  },
  about: {
    enabled: true,
    content: "Full Stack Developer focused on building modern web apps.",
    workingOn: "Scalable Apps",
    learning: "Next.js 16",
    collaborateOn: "DevTools",
    askMeAbout: "TypeScript",
    funFact: "Turns coffee into code",
    reachMe: "Email",
  },
  socials: {
    enabled: true,
    badgeStyle: "for-the-badge",
    github: "sagarmurkute",
    linkedin: "sagarmurkute",
    twitter: "sagarmurkute",
    instagram: "",
    youtube: "",
    facebook: "",
    discord: "",
    email: "sagar@example.com",
    portfolio: "https://sagarmurkute.design",
    customLinks: [],
  },
  skills: {
    enabled: true,
    badgeStyle: "for-the-badge",
    languages: ["TypeScript", "JavaScript"],
    frontend: ["React", "Next.js"],
    backend: ["Node.js"],
    databases: ["PostgreSQL"],
    mobile: [],
    cloud: ["Vercel"],
    devops: ["Git"],
    ai: [],
    design: [],
    tools: ["VS Code"],
    other: [],
    customSkills: [],
  },
  stats: {
    enabled: true,
    theme: "tokyonight",
    showStatsCard: true,
    showTopLangsCard: true,
    showStreakCard: true,
    showProfileViews: true,
    showTrophies: true,
    showSnakeGrid: true,
    showDailyQuote: false,
  },
  projects: {
    enabled: true,
    displayStyle: "grid",
    selectedRepoIds: [101],
    customProjects: [],
  },
  experience: {
    enabled: true,
    items: [
      {
        id: "1",
        role: "Senior Software Engineer",
        company: "Tech Corp",
        period: "2023 - Present",
        description: "Leading frontend architecture",
      },
    ],
  },
  sponsors: {
    enabled: true,
    buyMeACoffee: "sagarmurkute",
    kofi: "",
    patreon: "",
    githubSponsors: "",
  },
  extras: {
    enabled: true,
    showJokeCard: true,
    showSpotifyWidget: false,
    showWakatime: false,
  },
  activity: {
    enabled: true,
    showActivityGraph: true,
  },
  custom: {
    enabled: true,
    heading: "⚡ Quick Note",
    content: "Building in public every day!",
  },
  sectionOrder: [
    "header",
    "about",
    "skills",
    "socials",
    "projects",
    "experience",
    "stats",
    "sponsors",
    "extras",
    "contributionGraph",
    "custom",
  ],
};

const MOCK_REPOS: GitHubRepo[] = [
  {
    id: 101,
    name: "readme-generator",
    full_name: "sagarmurkute/readme-generator",
    html_url: "https://github.com/sagarmurkute/readme-generator",
    description: "GitHub Profile README Builder Pro",
    stargazers_count: 42,
    forks_count: 12,
    fork: false,
    language: "TypeScript",
    updated_at: "2026-08-13T00:00:00Z",
  },
];

export function runReadmeGeneratorTests(): { passed: boolean; logs: string[] } {
  const logs: string[] = [];
  let passed = true;

  const assert = (condition: boolean, message: string) => {
    if (!condition) {
      passed = false;
      logs.push(`❌ FAIL: ${message}`);
    } else {
      logs.push(`✅ PASS: ${message}`);
    }
  };

  // Test 1: Full config readme generation
  const fullMd = generateConfiguredReadme(DEFAULT_TEST_CONFIG, MOCK_REPOS);
  assert(fullMd.length > 0, "Full README should generate non-empty content");
  assert(!fullMd.includes("undefined"), "Full README must NOT contain 'undefined'");
  assert(!fullMd.includes("null"), "Full README must NOT contain 'null'");
  assert(fullMd.includes("# Hi there, I'm Sagar Murkute 👋"), "Header greeting should be generated");
  assert(fullMd.includes("## 👨‍💻 About Me"), "About Me section should be generated");
  assert(fullMd.includes("## 🛠️ Tech Stack"), "Tech Stack section should be generated");

  // Test 2: Disabled header
  const noHeaderConfig = { ...DEFAULT_TEST_CONFIG, header: { ...DEFAULT_TEST_CONFIG.header, enabled: false } };
  const noHeaderMd = generateConfiguredReadme(noHeaderConfig, MOCK_REPOS);
  assert(!noHeaderMd.includes("![Header Banner]"), "Disabled header should omit banner");

  // Test 3: Custom section order
  const customOrderConfig: ReadmeBuilderConfig = {
    ...DEFAULT_TEST_CONFIG,
    sectionOrder: ["about", "header"],
  };
  const customOrderMd = generateConfiguredReadme(customOrderConfig, MOCK_REPOS);
  const aboutIdx = customOrderMd.indexOf("About Me");
  const headerIdx = customOrderMd.indexOf("Hi there");
  assert(aboutIdx >= 0 && headerIdx >= 0 && aboutIdx < headerIdx, "Section order must strictly follow custom user sectionOrder");

  // Test 4: Empty / Minimal Profile
  const emptyConfig: ReadmeBuilderConfig = {
    ...DEFAULT_TEST_CONFIG,
    username: "emptyuser",
    header: { ...DEFAULT_TEST_CONFIG.header, enabled: true, name: "Empty User", greeting: "Hello" },
    about: { ...DEFAULT_TEST_CONFIG.about, enabled: false },
    socials: { ...DEFAULT_TEST_CONFIG.socials, enabled: false },
    skills: { ...DEFAULT_TEST_CONFIG.skills, enabled: false },
    stats: { ...DEFAULT_TEST_CONFIG.stats, enabled: false },
    projects: { ...DEFAULT_TEST_CONFIG.projects, enabled: false },
    activity: { ...DEFAULT_TEST_CONFIG.activity, enabled: false },
    custom: { ...DEFAULT_TEST_CONFIG.custom, enabled: false },
    sectionOrder: ["header"],
  };
  const emptyMd = generateConfiguredReadme(emptyConfig, []);
  assert(!emptyMd.includes("undefined"), "Empty profile must not contain 'undefined'");
  assert(!emptyMd.includes("null"), "Empty profile must not contain 'null'");

  return { passed, logs };
}
