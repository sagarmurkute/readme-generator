"use client";

import React from "react";
import { ReadmeBuilderConfig, SectionId } from "@/types/config";

interface SectionsListColumnProps {
  config: ReadmeBuilderConfig;
  setConfig: React.Dispatch<React.SetStateAction<ReadmeBuilderConfig>>;
  activeSectionId: SectionId;
  setActiveSectionId: (id: SectionId) => void;
}

const SECTION_ITEMS: { id: SectionId; label: string; icon: string }[] = [
  { id: "header", label: "Header & Banner", icon: "✨" },
  { id: "about", label: "About Me", icon: "👤" },
  { id: "skills", label: "Tech Stack", icon: "🛠️" },
  { id: "socials", label: "Social Links", icon: "🔗" },
  { id: "stats", label: "GitHub Analytics", icon: "📊" },
  { id: "projects", label: "Featured Projects", icon: "📁" },
  { id: "experience", label: "Work Experience", icon: "💼" },
  { id: "sponsors", label: "Sponsor & Support", icon: "💖" },
  { id: "extras", label: "Fun & Extras", icon: "🎯" },
  { id: "contributionGraph", label: "Contribution Graph", icon: "📈" },
  { id: "custom", label: "Custom Section", icon: "⚡" },
];

export function SectionsListColumn({
  config,
  setConfig,
  activeSectionId,
  setActiveSectionId,
}: SectionsListColumnProps) {
  const getSectionEnabled = (id: SectionId): boolean => {
    switch (id) {
      case "header": return config.header.enabled;
      case "about": return config.about.enabled;
      case "socials": return config.socials.enabled;
      case "skills": return config.skills.enabled;
      case "stats": return config.stats.enabled;
      case "projects": return config.projects.enabled;
      case "experience": return config.experience?.enabled ?? true;
      case "sponsors": return config.sponsors?.enabled ?? true;
      case "extras": return config.extras?.enabled ?? true;
      case "contributionGraph": return config.activity.enabled;
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
        case "projects":
          return { ...prev, projects: { ...prev.projects, enabled: !prev.projects.enabled } };
        case "experience":
          return { ...prev, experience: { ...(prev.experience || { items: [] }), enabled: !(prev.experience?.enabled ?? true) } };
        case "sponsors":
          return { ...prev, sponsors: { ...(prev.sponsors || {}), enabled: !(prev.sponsors?.enabled ?? true) } };
        case "extras":
          return { ...prev, extras: { ...(prev.extras || { showJokeCard: true }), enabled: !(prev.extras?.enabled ?? true) } };
        case "contributionGraph":
          return { ...prev, activity: { ...prev.activity, enabled: !prev.activity.enabled } };
        case "custom":
          return { ...prev, custom: { ...prev.custom, enabled: !prev.custom.enabled } };
        default:
          return prev;
      }
    });
  };

  return (
    <div className="border border-[#d0d7de] rounded-xl bg-white p-3 space-y-3 shadow-2xs font-sans">
      <div className="font-bold text-xs text-[#1f2328] px-1 flex items-center justify-between pb-1 border-b border-[#d0d7de]">
        <span>Sections</span>
        <span className="text-[10px] text-[#656d76] font-mono">11 Items</span>
      </div>

      <div className="space-y-1 text-xs">
        {SECTION_ITEMS.map((item) => {
          const isActive = activeSectionId === item.id;
          const isEnabled = getSectionEnabled(item.id);

          return (
            <div
              key={item.id}
              onClick={() => setActiveSectionId(item.id)}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                isActive
                  ? "bg-[#f0f6ff] text-[#0969da] font-semibold border border-[#0969da]/30 shadow-2xs"
                  : "hover:bg-[#f6f8fa] text-[#1f2328]"
              }`}
            >
              {/* Drag Handle & Icon & Name */}
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[#656d76]/40 font-mono text-[10px] cursor-grab select-none">
                  ::
                </span>
                <span className="text-xs shrink-0">{item.icon}</span>
                <span className="truncate text-xs">{item.label}</span>
              </div>

              {/* Toggle Switch & Active Arrow */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={(e) => toggleSectionEnabled(item.id, e)}
                  className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
                    isEnabled ? "bg-[#0969da]" : "bg-zinc-300"
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      isEnabled ? "translate-x-3.5" : "translate-x-0.5"
                    }`}
                  />
                </button>

                {isActive && (
                  <span className="text-[#0969da] font-bold text-xs ml-0.5">›</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Section Button */}
      <button
        onClick={() => {
          setActiveSectionId("custom");
          setConfig((prev) => ({
            ...prev,
            custom: { ...prev.custom, enabled: true },
          }));
        }}
        className="w-full py-2 border border-dashed border-[#d0d7de] hover:border-[#0969da] text-[#656d76] hover:text-[#0969da] rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1 bg-white"
      >
        <span>+ Add Custom Section</span>
      </button>
    </div>
  );
}
