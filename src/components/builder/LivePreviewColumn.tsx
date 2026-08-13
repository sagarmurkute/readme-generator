"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { ReadmeBuilderConfig } from "@/types/config";
import { GitHubRepo, GitHubUserProfile, RepoAnalysisResult } from "@/types/github";
import { SKILL_CATEGORIES } from "@/utils/skillCatalog";

interface LivePreviewColumnProps {
  config: ReadmeBuilderConfig;
  repos: GitHubRepo[];
  markdown: string;
  profile: GitHubUserProfile | null;
  analysis: RepoAnalysisResult | null;
}

export function LivePreviewColumn({
  config,
  repos,
  markdown,
  profile,
  analysis,
}: LivePreviewColumnProps) {
  const [previewTab, setPreviewTab] = useState<"rendered" | "code">("rendered");
  const [viewportMode, setViewportMode] = useState<"desktop" | "mobile">("desktop");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy error:", err);
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([markdown], {
        type: "text/markdown;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "README.md");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  const displayName = config.header.name || profile?.name || profile?.login || "Sagar Murkute";
  const avatarUrl =
    config.header.avatarUrl || profile?.avatar_url || "https://avatars.githubusercontent.com/u/9919?v=4";
  const bio =
    config.about.content ||
    profile?.bio ||
    "Full Stack Developer building modern Web, Mobile & AI applications with React, Next.js, Flutter, Node.js and TypeScript.";

  // Selected tech stack list
  const selectedSkills: { name: string; color: string; logo: string }[] = [];
  for (const cat of SKILL_CATEGORIES) {
    const selectedNames = ((config.skills as any)[cat.key] || []) as string[];
    for (const item of cat.items) {
      if (selectedNames.includes(item.name)) {
        selectedSkills.push({ name: item.name, color: item.color, logo: item.slug });
      }
    }
  }

  // Selected projects list
  let selectedRepos: GitHubRepo[] = [];
  if (config.projects.selectedRepoIds && config.projects.selectedRepoIds.length > 0) {
    selectedRepos = repos.filter((r) => config.projects.selectedRepoIds.includes(r.id));
  } else if (repos && repos.length > 0) {
    selectedRepos = repos.slice(0, 3);
  }

  return (
    <div className="border border-[#d0d7de] rounded-xl bg-white overflow-hidden shadow-2xs font-sans">
      {/* Top Action Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#f6f8fa] border-b border-[#d0d7de]">
        {/* Rendered vs Markdown Tabs */}
        <div className="inline-flex rounded-lg p-0.5 border border-[#d0d7de] bg-white text-xs font-medium">
          <button
            onClick={() => setPreviewTab("rendered")}
            className={`px-3 py-1 rounded-md transition-colors ${
              previewTab === "rendered"
                ? "bg-white text-[#1f2328] font-semibold shadow-2xs border border-[#d0d7de]"
                : "text-[#656d76] hover:text-[#1f2328]"
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setPreviewTab("code")}
            className={`px-3 py-1 rounded-md transition-colors ${
              previewTab === "code"
                ? "bg-white text-[#1f2328] font-semibold shadow-2xs border border-[#d0d7de]"
                : "text-[#656d76] hover:text-[#1f2328]"
            }`}
          >
            Markdown
          </button>
        </div>

        {/* Action Buttons: Copy, Download & Viewport Icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-white border border-[#d0d7de] hover:bg-[#f6f8fa] text-[#1f2328] text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5"
          >
            <span>📋</span>
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-3.5 py-1.5 bg-[#0969da] hover:bg-[#0858b9] text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <span>📥</span>
            <span>Download</span>
          </button>

          {/* Desktop vs Mobile Toggle */}
          <div className="hidden sm:inline-flex rounded-md p-0.5 border border-[#d0d7de] bg-white text-xs text-[#656d76] ml-1">
            <button
              onClick={() => setViewportMode("desktop")}
              className={`p-1.5 rounded ${
                viewportMode === "desktop" ? "bg-[#f6f8fa] text-[#0969da] font-bold" : "hover:text-[#1f2328]"
              }`}
              title="Desktop view"
            >
              💻
            </button>
            <button
              onClick={() => setViewportMode("mobile")}
              className={`p-1.5 rounded ${
                viewportMode === "mobile" ? "bg-[#f6f8fa] text-[#0969da] font-bold" : "hover:text-[#1f2328]"
              }`}
              title="Mobile view"
            >
              📱
            </button>
          </div>
        </div>
      </div>

      {/* Rendered README Container */}
      <div
        className={`p-6 sm:p-8 min-h-[750px] max-h-[82vh] h-full overflow-y-auto bg-white transition-all ${
          viewportMode === "mobile" ? "max-w-md mx-auto border-x border-[#d0d7de]" : "w-full"
        }`}
      >
        {previewTab === "rendered" ? (
          <div className="space-y-6 text-[#1f2328]">
            {/* HEADER SECTION */}
            {config.header.enabled && (
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                {/* Profile Avatar */}
                {config.header.showAvatar && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className={`h-28 w-28 object-cover border border-[#d0d7de] shadow-2xs shrink-0 ${
                      config.header.avatarStyle === "circle"
                        ? "rounded-full"
                        : config.header.avatarStyle === "square"
                        ? "rounded-md"
                        : "rounded-2xl"
                    }`}
                  />
                )}

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <h1 className="text-2xl font-bold text-[#1f2328] tracking-tight flex items-center justify-center sm:justify-start gap-1.5">
                    <span>{config.header.greeting || "Hi there"}, I&apos;m {displayName}</span>
                    <span>👋</span>
                  </h1>

                  {/* Typing animation line */}
                  {config.header.showTypingSvg && (
                    <div className="text-base font-medium text-[#0969da] font-sans">
                      {config.header.typingText || "Full Stack Developer"}
                    </div>
                  )}

                  {/* Badges Bar (Visitors, Followers, Stars, Forks) */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1 text-xs">
                    {config.header.showProfileViews && (
                      <span className="inline-flex items-center rounded bg-[#1f2328] text-white text-[11px] font-mono overflow-hidden">
                        <span className="bg-[#656d76] px-2 py-0.5">Visitors</span>
                        <span className="px-2 py-0.5 font-bold">1.2k</span>
                      </span>
                    )}
                    {config.header.showFollowersBadge && (
                      <span className="inline-flex items-center rounded bg-[#1f2328] text-white text-[11px] font-mono overflow-hidden">
                        <span className="bg-[#656d76] px-2 py-0.5">Followers</span>
                        <span className="px-2 py-0.5 font-bold">{profile?.followers || "1.1k"}</span>
                      </span>
                    )}
                    {config.header.showStarsBadge && (
                      <span className="inline-flex items-center rounded bg-[#1f2328] text-white text-[11px] font-mono overflow-hidden">
                        <span className="bg-[#656d76] px-2 py-0.5">Stars</span>
                        <span className="px-2 py-0.5 font-bold">{analysis?.totalStars || "87"}</span>
                      </span>
                    )}
                    <span className="inline-flex items-center rounded bg-[#1f2328] text-white text-[11px] font-mono overflow-hidden">
                      <span className="bg-[#656d76] px-2 py-0.5">Forks</span>
                      <span className="px-2 py-0.5 font-bold">{analysis?.totalForks || "23"}</span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ABOUT ME SECTION */}
            {config.about.enabled && (
              <div className="space-y-1.5 pt-2">
                <h3 className="flex items-center gap-2 font-bold text-sm text-[#1f2328]">
                  <span className="text-base">👤</span>
                  <span>About Me</span>
                </h3>
                <p className="text-xs text-[#1f2328] leading-relaxed">{bio}</p>

                {(config.about.workingOn || config.about.learning || config.about.askMeAbout) && (
                  <div className="space-y-1 pt-1 text-xs text-[#1f2328]">
                    {config.about.workingOn && <div>- 🔭 <strong>Currently working on</strong>: {config.about.workingOn}</div>}
                    {config.about.learning && <div>- 🌱 <strong>Currently learning</strong>: {config.about.learning}</div>}
                    {config.about.askMeAbout && <div>- 💬 <strong>Ask me about</strong>: {config.about.askMeAbout}</div>}
                  </div>
                )}
              </div>
            )}

            {/* CONNECT WITH ME SECTION */}
            {config.socials.enabled && (
              <div className="space-y-2 pt-2">
                <h3 className="flex items-center gap-2 font-bold text-sm text-[#1f2328]">
                  <span className="text-base">🔗</span>
                  <span>Connect with me</span>
                </h3>
                <div className="flex items-center gap-2.5 text-xl">
                  {config.socials.github && <a href={`https://github.com/${config.socials.github}`} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">🐙</a>}
                  {config.socials.linkedin && <a href={config.socials.linkedin} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">💼</a>}
                  {config.socials.twitter && <a href={config.socials.twitter} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">🐦</a>}
                  {config.socials.instagram && <a href={config.socials.instagram} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">📷</a>}
                  {config.socials.youtube && <a href={config.socials.youtube} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">▶️</a>}
                  {config.socials.email && <a href={`mailto:${config.socials.email}`} className="hover:opacity-80 transition-opacity">✉️</a>}
                  {!config.socials.github && (
                    <>
                      <span>🐙</span><span>💼</span><span>🐦</span><span>📷</span><span>▶️</span><span>✉️</span>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* TECH STACK SECTION */}
            {config.skills.enabled && (
              <div className="space-y-2 pt-2">
                <h3 className="flex items-center gap-2 font-bold text-sm text-[#1f2328]">
                  <span className="text-base font-mono text-[#0969da]">&lt;/&gt;</span>
                  <span>Tech Stack</span>
                </h3>
                <div className="flex flex-wrap gap-2 text-xs">
                  {selectedSkills.length > 0 ? (
                    selectedSkills.map((s, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#d0d7de] bg-[#f6f8fa] font-medium text-[#1f2328]"
                      >
                        <span className="font-bold text-[10px] uppercase px-1 rounded bg-[#1f2328] text-white">
                          {s.name.slice(0, 2)}
                        </span>{" "}
                        {s.name}
                      </span>
                    ))
                  ) : (
                    <>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#d0d7de] bg-[#f6f8fa] font-medium text-[#1f2328]">
                        <span className="bg-amber-400 text-black font-bold px-1 rounded text-[10px]">JS</span> JavaScript
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#d0d7de] bg-[#f6f8fa] font-medium text-[#1f2328]">
                        <span className="bg-blue-600 text-white font-bold px-1 rounded text-[10px]">TS</span> TypeScript
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#d0d7de] bg-[#f6f8fa] font-medium text-[#1f2328]">
                        <span className="text-cyan-500 font-bold">⚛</span> React
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#d0d7de] bg-[#f6f8fa] font-medium text-[#1f2328]">
                        <span className="bg-black text-white font-bold px-1 rounded-full text-[10px]">N</span> Node.js
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#d0d7de] bg-[#f6f8fa] font-medium text-[#1f2328]">
                        <span className="text-teal-500 font-bold">🌊</span> Tailwind CSS
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#d0d7de] bg-[#f6f8fa] font-medium text-[#1f2328]">
                        <span className="text-emerald-600 font-bold">🍃</span> MongoDB
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#d0d7de] bg-[#f6f8fa] font-medium text-[#1f2328]">
                        <span className="text-indigo-600 font-bold">🐘</span> PostgreSQL
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* GITHUB STATS GRID */}
            {config.stats.enabled && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                {/* Card 1: GitHub Stats */}
                <div className="border border-[#d0d7de] rounded-xl p-3.5 bg-white space-y-2 shadow-2xs">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[#1f2328]">
                    <span>⚡</span>
                    <span>GitHub Stats</span>
                  </div>
                  <div className="space-y-1 text-xs font-mono text-[#656d76]">
                    <div className="flex justify-between"><span>Repos</span><span className="font-semibold text-[#1f2328]">{profile?.public_repos || 56}</span></div>
                    <div className="flex justify-between"><span>Followers</span><span className="font-semibold text-[#1f2328]">{profile?.followers || "1.1k"}</span></div>
                    <div className="flex justify-between"><span>Following</span><span className="font-semibold text-[#1f2328]">{profile?.following || 150}</span></div>
                    <div className="flex justify-between"><span>Stars</span><span className="font-semibold text-[#1f2328]">{analysis?.totalStars || 87}</span></div>
                  </div>
                </div>

                {/* Card 2: Top Languages */}
                <div className="border border-[#d0d7de] rounded-xl p-3.5 bg-white space-y-2 shadow-2xs">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[#1f2328]">
                    <span>🎯</span>
                    <span>Top Languages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-14 w-14 shrink-0" viewBox="0 0 36 36">
                      <path className="text-blue-500 stroke-current" strokeWidth="6" fill="none" strokeDasharray="42, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-amber-400 stroke-current" strokeWidth="6" fill="none" strokeDasharray="28, 100" strokeDashoffset="-42" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-orange-500 stroke-current" strokeWidth="6" fill="none" strokeDasharray="12, 100" strokeDashoffset="-70" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="space-y-0.5 text-[10px] font-mono text-[#656d76]">
                      <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-500"/><span>TypeScript 42.6%</span></div>
                      <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400"/><span>JavaScript 28.4%</span></div>
                      <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-orange-500"/><span>HTML 12.7%</span></div>
                      <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-sky-400"/><span>CSS 8.3%</span></div>
                    </div>
                  </div>
                </div>

                {/* Card 3: GitHub Streak */}
                <div className="border border-[#d0d7de] rounded-xl p-3.5 bg-white space-y-2 text-center shadow-2xs">
                  <div className="flex items-center justify-center gap-1.5 font-bold text-xs text-[#1f2328]">
                    <span>🔥</span>
                    <span>GitHub Streak</span>
                  </div>
                  <div className="py-1">
                    <span className="text-[10px] text-[#656d76] block">Current streak</span>
                    <span className="text-lg font-bold text-[#0969da]">23 days</span>
                    <span className="text-[10px] text-[#656d76] block mt-0.5">Longest streak: 45 days</span>
                  </div>
                </div>
              </div>
            )}

            {/* CONTRIBUTION GRAPH */}
            {config.activity.enabled && (
              <div className="space-y-2 pt-3">
                <h3 className="flex items-center gap-2 font-bold text-sm text-[#1f2328]">
                  <span>📉</span>
                  <span>Contribution Graph</span>
                </h3>
                <div className="border border-[#d0d7de] rounded-xl p-3.5 bg-[#f6f8fa] overflow-x-auto">
                  <div className="flex justify-between text-[10px] text-[#656d76] font-mono mb-1.5">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                  </div>
                  <div className="grid grid-flow-col grid-rows-4 gap-1 w-max">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-2.5 w-2.5 rounded-2xs ${
                          i % 5 === 0 ? "bg-emerald-600" : i % 3 === 0 ? "bg-emerald-400" : i % 2 === 0 ? "bg-emerald-200" : "bg-zinc-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* FEATURED PROJECTS GRID */}
            {config.projects.enabled && (
              <div className="space-y-2 pt-3">
                <h3 className="flex items-center gap-2 font-bold text-sm text-[#1f2328]">
                  <span>📁</span>
                  <span>Featured Projects</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedRepos.length > 0 ? (
                    selectedRepos.map((repo) => (
                      <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="border border-[#d0d7de] rounded-xl p-3 bg-white space-y-1 shadow-2xs hover:border-[#0969da] transition-colors block"
                      >
                        <div className="flex items-center gap-1 font-bold text-xs text-[#1f2328] truncate">
                          <span>🔒</span>
                          <span className="truncate">{repo.name}</span>
                        </div>
                        <p className="text-[11px] text-[#656d76] line-clamp-2">{repo.description || "Project repo"}</p>
                      </a>
                    ))
                  ) : (
                    <>
                      <div className="border border-[#d0d7de] rounded-xl p-3 bg-white space-y-1 shadow-2xs">
                        <div className="flex items-center gap-1 font-bold text-xs text-[#1f2328]">
                          <span>🔒</span>
                          <span>sagar.design</span>
                        </div>
                        <p className="text-[11px] text-[#656d76]">Personal portfolio built with Next.js</p>
                      </div>

                      <div className="border border-[#d0d7de] rounded-xl p-3 bg-white space-y-1 shadow-2xs">
                        <div className="flex items-center gap-1 font-bold text-xs text-[#1f2328]">
                          <span>🔒</span>
                          <span>VehiLedger</span>
                        </div>
                        <p className="text-[11px] text-[#656d76]">Operating system for vehicle businesses</p>
                      </div>

                      <div className="border border-[#d0d7de] rounded-xl p-3 bg-white space-y-1 shadow-2xs">
                        <div className="flex items-center gap-1 font-bold text-xs text-[#1f2328]">
                          <span>🔒</span>
                          <span>AI Learning Platform</span>
                        </div>
                        <p className="text-[11px] text-[#656d76]">Full-stack learning platform with AI</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* WORK EXPERIENCE SECTION */}
            {config.experience?.enabled && config.experience?.items && config.experience.items.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-[#d0d7de]">
                <h3 className="flex items-center gap-2 font-bold text-sm text-[#1f2328]">
                  <span>💼</span>
                  <span>Work Experience</span>
                </h3>
                <div className="space-y-2">
                  {config.experience.items.map((exp) => (
                    <div key={exp.id} className="border border-[#d0d7de] rounded-xl p-3 bg-white space-y-1 shadow-2xs">
                      <div className="flex items-center justify-between font-bold text-xs text-[#1f2328]">
                        <span>{exp.role} @ {exp.company}</span>
                        <span className="text-[11px] text-[#656d76] font-normal">{exp.period}</span>
                      </div>
                      {exp.description && <p className="text-[11px] text-[#656d76] leading-relaxed">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SPONSORS & SUPPORT SECTION */}
            {config.sponsors?.enabled && (config.sponsors?.buyMeACoffee || config.sponsors?.kofi || config.sponsors?.patreon || config.sponsors?.githubSponsors) && (
              <div className="space-y-2 pt-3 border-t border-[#d0d7de]">
                <h3 className="flex items-center gap-2 font-bold text-sm text-[#1f2328]">
                  <span>💖</span>
                  <span>Support & Sponsor</span>
                </h3>
                <div className="flex flex-wrap gap-2 text-xs font-semibold">
                  {config.sponsors.buyMeACoffee && <span className="bg-[#FFDD00] text-black px-3 py-1 rounded-md">☕ Buy Me A Coffee</span>}
                  {config.sponsors.kofi && <span className="bg-[#F16061] text-white px-3 py-1 rounded-md">☕ Ko-Fi</span>}
                  {config.sponsors.patreon && <span className="bg-[#F96854] text-white px-3 py-1 rounded-md">🎨 Patreon</span>}
                  {config.sponsors.githubSponsors && <span className="bg-[#EA4AAA] text-white px-3 py-1 rounded-md">💖 GitHub Sponsors</span>}
                </div>
              </div>
            )}

            {/* EXTRAS & JOKES SECTION */}
            {config.extras?.enabled && (config.extras?.showJokeCard || config.extras?.showWakatime) && (
              <div className="space-y-2 pt-3 border-t border-[#d0d7de]">
                <h3 className="flex items-center gap-2 font-bold text-sm text-[#1f2328]">
                  <span>🎯</span>
                  <span>Fun & Extras</span>
                </h3>
                <div className="border border-[#d0d7de] rounded-xl p-3 bg-[#f6f8fa] text-xs space-y-1 shadow-2xs">
                  {config.extras.showJokeCard && (
                    <div className="italic text-[#656d76]">
                      &quot;There are 10 types of people in the world: those who understand binary, and those who don&apos;t.&quot;
                    </div>
                  )}
                  {config.extras.showWakatime && config.extras.wakatimeUsername && (
                    <div className="font-mono text-[11px] text-[#0969da]">
                      📊 WakaTime Stats tracked for @{config.extras.wakatimeUsername}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="markdown-body space-y-4 text-[#1f2328]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
