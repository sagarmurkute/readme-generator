"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { PreviewArea } from "@/components/PreviewArea";
import { fetchGitHubData } from "@/services/github";
import { analyzeRepositories } from "@/utils/repoAnalyzer";
import { generateConfiguredReadme } from "@/utils/readmeGenerator";
import { TEMPLATES } from "@/lib/templates";
import { applyPresetToConfig } from "@/lib/presets";
import {
  GitHubUserProfile,
  GitHubRepo,
  RepoAnalysisResult,
} from "@/types/github";
import { ReadmeBuilderConfig } from "@/types/config";

const INITIAL_CONFIG: ReadmeBuilderConfig = {
  username: "",
  header: {
    enabled: true,
    name: "",
    greeting: "Hi there",
    typingText: "Full Stack Developer, Open Source Contributor, Tech Enthusiast",
    typingLines: [
      "Full Stack Developer",
      "Open Source Contributor",
      "Tech Enthusiast",
    ],
    showTypingSvg: true,
    showAvatar: true,
    avatarUrl: "",
    avatarStyle: "rounded",
    alignment: "left",
    bannerType: "capsule",
    bannerUrl: "",
    bannerCapsuleTheme: "waving",
    statusBadge: "🟢 Open for work & collaboration",
    showProfileViews: true,
    showStarsBadge: true,
    showFollowersBadge: true,
  },
  about: {
    enabled: true,
    content: "👋 Passionate software developer building scalable web applications, mobile products, and AI powered tools.",
    workingOn: "Scalable Full Stack Apps & Open Source DevTools",
    learning: "Next.js 16, Rust & Cloud Native Architecture",
    collaborateOn: "Developer tools & React ecosystem projects",
    askMeAbout: "TypeScript, React, Node.js, Next.js, PostgreSQL",
    funFact: "I turn coffee into clean, efficient code!",
    reachMe: "Connect on LinkedIn or send an email",
  },
  socials: {
    enabled: true,
    badgeStyle: "for-the-badge",
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    youtube: "",
    facebook: "",
    discord: "",
    email: "",
    portfolio: "",
    customLinks: [],
  },
  skills: {
    enabled: true,
    badgeStyle: "for-the-badge",
    languages: ["TypeScript", "JavaScript", "Python"],
    frontend: ["React", "Next.js", "TailwindCSS"],
    backend: ["Node.js", "Express.js"],
    databases: ["PostgreSQL", "MongoDB"],
    mobile: [],
    cloud: ["Vercel", "AWS"],
    devops: ["Docker", "Git"],
    ai: [],
    design: ["Figma"],
    tools: ["VS Code", "Postman"],
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
    selectedRepoIds: [],
    customProjects: [],
  },
  experience: {
    enabled: true,
    items: [],
  },
  sponsors: {
    enabled: true,
  },
  extras: {
    enabled: true,
    showSpotifyWidget: false,
    showJokeCard: true,
    showWakatime: false,
  },
  activity: {
    enabled: true,
    showActivityGraph: true,
  },
  custom: {
    enabled: false,
    heading: "⚡ Quick Note",
    content: "Building in public and learning every day!",
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

const STORAGE_KEY = "github_readme_builder_state_v2";

function BuilderContent() {
  const searchParams = useSearchParams();
  const templateIdParam = searchParams.get("template");

  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [profile, setProfile] = useState<GitHubUserProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[] | null>(null);
  const [analysis, setAnalysis] = useState<RepoAnalysisResult | null>(null);
  const [config, setConfig] = useState<ReadmeBuilderConfig>(INITIAL_CONFIG);

  // Restore local storage state or template configuration on initial mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.username) setUsername(parsed.username);
        if (parsed.profile) setProfile(parsed.profile);
        if (parsed.repos) setRepos(parsed.repos);
        if (parsed.analysis) setAnalysis(parsed.analysis);
        if (parsed.config) setConfig(parsed.config);
      }

      // If template parameter present, apply template configuration
      if (templateIdParam) {
        const matchedTemplate = TEMPLATES.find((t) => t.id === templateIdParam);
        if (matchedTemplate) {
          setConfig((prev) => applyPresetToConfig(matchedTemplate.id, prev));
        }
      }
    } catch (e) {
      console.error("Failed to restore saved session state:", e);
    }
  }, [templateIdParam]);

  // Save to local storage on state updates
  useEffect(() => {
    if (profile) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ username, profile, repos, analysis, config })
        );
      } catch (e) {
        console.error("Failed to save session state:", e);
      }
    }
  }, [username, profile, repos, analysis, config]);

  // Live Markdown computation
  const markdown = useMemo(() => {
    if (!profile) return null;
    return generateConfiguredReadme(config, repos || []);
  }, [config, repos, profile]);

  const executeFetch = async (targetUsername: string) => {
    const cleaned = targetUsername.trim();
    if (!cleaned) {
      setError("Please enter a GitHub username.");
      return;
    }

    setIsLoading(true);
    setLoadingStep("Connecting to GitHub REST API...");
    setError(null);

    const result = await fetchGitHubData(cleaned);

    if (!result.success) {
      setIsLoading(false);
      setError(result.error);
      return;
    }

    setLoadingStep("Analyzing repository metrics & top languages...");
    const analysisData = analyzeRepositories(result.profile, result.repos);

    setLoadingStep("Pre-populating configuration & skills...");

    const detectedLanguages = analysisData.topLanguages.map((l) => l.language);
    const topRepoIds = analysisData.featuredProjects.map((r) => r.id);

    const populatedConfig: ReadmeBuilderConfig = {
      ...INITIAL_CONFIG,
      username: result.profile.login,
      header: {
        ...INITIAL_CONFIG.header,
        name: result.profile.name || result.profile.login,
        avatarUrl: result.profile.avatar_url || "",
      },
      about: {
        ...INITIAL_CONFIG.about,
        content: result.profile.bio || INITIAL_CONFIG.about.content,
      },
      socials: {
        ...INITIAL_CONFIG.socials,
        github: result.profile.login,
        twitter: result.profile.twitter_username || "",
        portfolio: result.profile.blog || "",
      },
      skills: {
        ...INITIAL_CONFIG.skills,
        languages: Array.from(
          new Set([...INITIAL_CONFIG.skills.languages, ...detectedLanguages])
        ),
      },
      projects: {
        ...INITIAL_CONFIG.projects,
        enabled: true,
        selectedRepoIds: topRepoIds,
      },
    };

    setProfile(result.profile);
    setRepos(result.repos);
    setAnalysis(analysisData);
    setConfig(populatedConfig);
    setIsLoading(false);
  };

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    await executeFetch(username);
  };

  const handleRefetch = async () => {
    if (username) {
      await executeFetch(username);
    }
  };

  const handleReset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setUsername("");
    setIsLoading(false);
    setLoadingStep("");
    setError(null);
    setProfile(null);
    setRepos(null);
    setAnalysis(null);
    setConfig(INITIAL_CONFIG);
  };

  return (
    <main className="flex-1 flex flex-col items-center w-full">
      <HeroSection />
      <PreviewArea
        username={username}
        setUsername={setUsername}
        isLoading={isLoading}
        loadingStep={loadingStep}
        error={error}
        profile={profile}
        repos={repos}
        analysis={analysis}
        markdown={markdown}
        config={config}
        setConfig={setConfig}
        onFetchGitHub={handleFetch}
        onRefetchGitHub={handleRefetch}
        onReset={handleReset}
      />
    </main>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1f2328] font-sans selection:bg-[#0969da]/20 selection:text-[#1f2328]">
      <Header />
      <Suspense fallback={<div className="flex-1 p-8 text-center text-xs">Loading Builder Workspace...</div>}>
        <BuilderContent />
      </Suspense>
      <Footer />
    </div>
  );
}
