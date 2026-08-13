"use client";

import React from "react";
import { ReadmeBuilderConfig, SectionId } from "@/types/config";
import { HeaderEditor } from "./editors/HeaderEditor";
import { AboutEditor } from "./editors/AboutEditor";
import { SkillsEditor } from "./editors/SkillsEditor";
import { StatsEditor } from "./editors/StatsEditor";
import { ExperienceEditor } from "./editors/ExperienceEditor";
import { SponsorsEditor } from "./editors/SponsorsEditor";
import { ExtrasEditor } from "./editors/ExtrasEditor";
import { SocialsEditor } from "./editors/SocialsEditor";
import { RepositoryPicker } from "../RepositoryPicker";
import { GitHubRepo } from "@/types/github";

interface ActiveEditorColumnProps {
  config: ReadmeBuilderConfig;
  setConfig: React.Dispatch<React.SetStateAction<ReadmeBuilderConfig>>;
  repos: GitHubRepo[];
  activeSectionId: SectionId;
  setActiveSectionId: (id: SectionId) => void;
}

export function ActiveEditorColumn({
  config,
  setConfig,
  repos,
  activeSectionId,
}: ActiveEditorColumnProps) {
  const toggleSectionEnabled = (key: keyof Omit<ReadmeBuilderConfig, "username" | "sectionOrder">) => {
    setConfig((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] as any),
        enabled: !(prev[key] as any)?.enabled,
      },
    }));
  };

  return (
    <div className="border border-[#d0d7de] rounded-xl bg-white p-3.5 shadow-2xs font-sans text-xs space-y-3">
      {activeSectionId === "header" && (
        <HeaderEditor config={config} setConfig={setConfig} />
      )}

      {activeSectionId === "about" && (
        <AboutEditor config={config} setConfig={setConfig} />
      )}

      {activeSectionId === "skills" && (
        <SkillsEditor config={config} setConfig={setConfig} />
      )}

      {activeSectionId === "socials" && (
        <SocialsEditor config={config} setConfig={setConfig} />
      )}

      {activeSectionId === "stats" && (
        <StatsEditor config={config} setConfig={setConfig} />
      )}

      {activeSectionId === "experience" && (
        <ExperienceEditor config={config} setConfig={setConfig} />
      )}

      {activeSectionId === "sponsors" && (
        <SponsorsEditor config={config} setConfig={setConfig} />
      )}

      {activeSectionId === "extras" && (
        <ExtrasEditor config={config} setConfig={setConfig} />
      )}

      {activeSectionId === "projects" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-[#d0d7de] pb-2">
            <h3 className="font-bold text-sm text-[#1f2328]">Featured Projects</h3>
            <button
              type="button"
              onClick={() => toggleSectionEnabled("projects")}
              className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
                config.projects.enabled ? "bg-[#0969da]" : "bg-zinc-300"
              }`}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                  config.projects.enabled ? "translate-x-3.5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block text-[#656d76] font-semibold mb-1">Display Style</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() =>
                  setConfig((prev) => ({
                    ...prev,
                    projects: { ...prev.projects, displayStyle: "grid" },
                  }))
                }
                className={`py-1 px-2 rounded border text-xs font-semibold ${
                  (config.projects.displayStyle || "grid") === "grid"
                    ? "bg-[#0969da] text-white border-[#0969da]"
                    : "bg-white text-[#1f2328] border-[#d0d7de]"
                }`}
              >
                Grid Stat Cards
              </button>
              <button
                type="button"
                onClick={() =>
                  setConfig((prev) => ({
                    ...prev,
                    projects: { ...prev.projects, displayStyle: "table" },
                  }))
                }
                className={`py-1 px-2 rounded border text-xs font-semibold ${
                  config.projects.displayStyle === "table"
                    ? "bg-[#0969da] text-white border-[#0969da]"
                    : "bg-white text-[#1f2328] border-[#d0d7de]"
                }`}
              >
                Markdown Table
              </button>
            </div>
          </div>

          <RepositoryPicker
            repos={repos}
            selectedRepoIds={config.projects.selectedRepoIds}
            onToggleRepo={(id) => {
              setConfig((prev) => {
                const current = prev.projects.selectedRepoIds || [];
                const updated = current.includes(id)
                  ? current.filter((r) => r !== id)
                  : [...current, id];
                return { ...prev, projects: { ...prev.projects, selectedRepoIds: updated } };
              });
            }}
          />
        </div>
      )}

      {activeSectionId === "custom" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-[#d0d7de] pb-2">
            <h3 className="font-bold text-sm text-[#1f2328]">Custom Section</h3>
            <button
              type="button"
              onClick={() => toggleSectionEnabled("custom")}
              className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
                config.custom.enabled ? "bg-[#0969da]" : "bg-zinc-300"
              }`}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                  config.custom.enabled ? "translate-x-3.5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block text-[#656d76] font-medium mb-1">Heading</label>
            <input
              type="text"
              value={config.custom.heading}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  custom: { ...prev.custom, heading: e.target.value },
                }))
              }
              className="w-full px-2.5 py-1.5 border border-[#d0d7de] rounded-md text-[#1f2328] focus:outline-none focus:border-[#0969da]"
            />
          </div>

          <div>
            <label className="block text-[#656d76] font-medium mb-1">Markdown Content</label>
            <textarea
              value={config.custom.content}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  custom: { ...prev.custom, content: e.target.value },
                }))
              }
              rows={4}
              className="w-full p-2.5 border border-[#d0d7de] rounded-md text-[#1f2328] font-mono text-xs focus:outline-none focus:border-[#0969da]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
