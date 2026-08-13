"use client";

import React from "react";
import { ReadmeBuilderConfig, SectionId } from "@/types/config";

interface SectionNavigationProps {
  config: ReadmeBuilderConfig;
  setConfig: React.Dispatch<React.SetStateAction<ReadmeBuilderConfig>>;
  activeSectionId: SectionId;
  setActiveSectionId: (id: SectionId) => void;
}

const SECTION_LABELS: Record<SectionId, { label: string; icon: string }> = {
  header: { label: "Header & Banner", icon: "✨" },
  about: { label: "About Me", icon: "👤" },
  socials: { label: "Social Links", icon: "🔗" },
  skills: { label: "Tech Stack", icon: "🛠️" },
  stats: { label: "GitHub Stats", icon: "📊" },
  topLangs: { label: "Top Languages", icon: "💻" },
  streak: { label: "Streak Stats", icon: "🔥" },
  profileViews: { label: "Profile Views", icon: "👁️" },
  contributionGraph: { label: "Contribution Graph", icon: "📈" },
  projects: { label: "Featured Projects", icon: "⭐" },
  experience: { label: "Work Experience", icon: "💼" },
  sponsors: { label: "Sponsor & Support", icon: "💖" },
  extras: { label: "Fun & Extras", icon: "🎯" },
  activity: { label: "Activity", icon: "⚡" },
  custom: { label: "Custom Section", icon: "✏️" },
};

export function SectionNavigation({
  config,
  setConfig,
  activeSectionId,
  setActiveSectionId,
}: SectionNavigationProps) {
  const isSectionEnabled = (id: SectionId): boolean => {
    switch (id) {
      case "header": return config.header.enabled;
      case "about": return config.about.enabled;
      case "socials": return config.socials.enabled;
      case "skills": return config.skills.enabled;
      case "stats": return config.stats.enabled;
      case "contributionGraph": return config.activity.enabled;
      case "projects": return config.projects.enabled;
      case "custom": return config.custom.enabled;
      default: return true;
    }
  };

  const toggleSectionEnabled = (id: SectionId, e: React.MouseEvent) => {
    e.stopPropagation();
    setConfig((prev) => {
      switch (id) {
        case "header":
          return { ...prev, header: { ...prev.header, enabled: !prev.header.enabled } };
        case "about":
          return { ...prev, about: { ...prev.about, enabled: !prev.about.enabled } };
        case "socials":
          return { ...prev, socials: { ...prev.socials, enabled: !prev.socials.enabled } };
        case "skills":
          return { ...prev, skills: { ...prev.skills, enabled: !prev.skills.enabled } };
        case "stats":
          return { ...prev, stats: { ...prev.stats, enabled: !prev.stats.enabled } };
        case "contributionGraph":
          return { ...prev, activity: { ...prev.activity, enabled: !prev.activity.enabled } };
        case "projects":
          return { ...prev, projects: { ...prev.projects, enabled: !prev.projects.enabled } };
        case "custom":
          return { ...prev, custom: { ...prev.custom, enabled: !prev.custom.enabled } };
        default:
          return prev;
      }
    });
  };

  const moveUp = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (index <= 0) return;
    const updated = [...config.sectionOrder];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setConfig((prev) => ({ ...prev, sectionOrder: updated }));
  };

  const moveDown = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (index >= config.sectionOrder.length - 1) return;
    const updated = [...config.sectionOrder];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setConfig((prev) => ({ ...prev, sectionOrder: updated }));
  };

  return (
    <div className="border border-[#d0d7de] rounded-md bg-white overflow-hidden text-xs">
      <div className="p-2.5 bg-[#f6f8fa] border-b border-[#d0d7de] font-semibold text-[#1f2328] flex items-center justify-between">
        <span>README Sections</span>
        <span className="font-mono text-[10px] text-[#656d76]">
          {config.sectionOrder.length} sections
        </span>
      </div>

      <div className="divide-y divide-[#d0d7de]">
        {config.sectionOrder.map((sectionId, idx) => {
          const info = SECTION_LABELS[sectionId] || { label: sectionId, icon: "📌" };
          const isActive = activeSectionId === sectionId;
          const enabled = isSectionEnabled(sectionId);

          return (
            <div
              key={sectionId}
              onClick={() => setActiveSectionId(sectionId)}
              className={`flex items-center justify-between p-2.5 cursor-pointer transition-colors ${
                isActive
                  ? "bg-[#f6f8fa] border-l-4 border-l-[#0969da] font-medium text-[#1f2328]"
                  : "hover:bg-[#f6f8fa]/60 text-[#656d76]"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm shrink-0">{info.icon}</span>
                <span className={`truncate text-xs ${enabled ? "text-[#1f2328]" : "text-[#656d76] opacity-60"}`}>
                  {info.label}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={(e) => moveUp(idx, e)}
                  disabled={idx === 0}
                  className="px-1 py-0.5 border border-[#d0d7de] rounded bg-white text-[9px] font-mono hover:bg-[#f6f8fa] disabled:opacity-20"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={(e) => moveDown(idx, e)}
                  disabled={idx === config.sectionOrder.length - 1}
                  className="px-1 py-0.5 border border-[#d0d7de] rounded bg-white text-[9px] font-mono hover:bg-[#f6f8fa] disabled:opacity-20"
                >
                  ▼
                </button>

                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => toggleSectionEnabled(sectionId, e as any)}
                  onClick={(e) => e.stopPropagation()}
                  className="h-3.5 w-3.5 accent-[#0969da] rounded cursor-pointer ml-1"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
