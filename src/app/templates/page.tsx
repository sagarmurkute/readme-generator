"use client";

import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TEMPLATES } from "@/lib/templates";
import { generateConfiguredReadme } from "@/utils/readmeGenerator";
import { ReadmeBuilderConfig } from "@/types/config";

const DUMMY_PREVIEW_CONFIG: ReadmeBuilderConfig = {
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
    content: "Full stack software developer focused on web apps and devtools.",
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
    languages: ["TypeScript", "JavaScript", "Python"],
    frontend: ["React", "Next.js", "Tailwind CSS"],
    backend: ["Node.js", "Express"],
    databases: ["PostgreSQL", "MongoDB"],
    mobile: [],
    cloud: ["Vercel"],
    devops: ["Docker", "Git"],
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
    showSnakeGrid: false,
    showDailyQuote: false,
  },
  projects: {
    enabled: true,
    displayStyle: "grid",
    selectedRepoIds: [],
    customProjects: [],
  },
  experience: {
    enabled: false,
    items: [],
  },
  sponsors: {
    enabled: false,
  },
  extras: {
    enabled: false,
    showSpotifyWidget: false,
    showJokeCard: false,
    showWakatime: false,
  },
  activity: {
    enabled: true,
    showActivityGraph: true,
  },
  custom: {
    enabled: false,
    heading: "",
    content: "",
  },
  sectionOrder: ["header", "about", "skills", "socials", "projects", "stats"],
};

export default function TemplatesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1f2328] font-sans">
      <Navbar />

      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-[#1f2328]">
            README Template Gallery
          </h1>
          <p className="text-xs text-[#656d76]">
            Select a real functional README layout template. Each template generates production GitHub markdown.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEMPLATES.map((tmpl) => {
            const fullConfig: ReadmeBuilderConfig = {
              ...DUMMY_PREVIEW_CONFIG,
              ...tmpl.config,
              header: {
                ...DUMMY_PREVIEW_CONFIG.header,
                ...(tmpl.config.header || {}),
              },
            };

            const markdown = generateConfiguredReadme(fullConfig, []);

            return (
              <div
                key={tmpl.id}
                className="border border-[#d0d7de] rounded-xl bg-white overflow-hidden shadow-2xs flex flex-col justify-between"
              >
                {/* Header Info */}
                <div className="p-4 bg-[#f6f8fa] border-b border-[#d0d7de] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{tmpl.icon}</span>
                    <div>
                      <h3 className="font-bold text-sm text-[#1f2328]">{tmpl.name}</h3>
                      <p className="text-xs text-[#656d76]">{tmpl.description}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-[#0969da] bg-white border border-[#d0d7de] px-2 py-0.5 rounded">
                    {tmpl.badge}
                  </span>
                </div>

                {/* Rendered Live Markdown Preview */}
                <div className="p-4 max-h-72 overflow-y-auto bg-white border-b border-[#d0d7de] text-xs leading-relaxed font-sans">
                  <div className="markdown-body">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {markdown}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-3 bg-white flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#656d76]">
                    {tmpl.config.sectionOrder?.length || 5} Sections Configured
                  </span>
                  <Link
                    href={`/?template=${tmpl.id}`}
                    className="px-4 py-1.5 bg-[#0969da] hover:bg-[#0858b9] text-white text-xs font-semibold rounded-md shadow-2xs transition-colors flex items-center gap-1"
                  >
                    <span>Use Template →</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
