"use client";

import React, { useState, useRef, useEffect } from "react";
import { ReadmeBuilderConfig, SectionId } from "@/types/config";
import { GitHubRepo, GitHubUserProfile, RepoAnalysisResult } from "@/types/github";
import { PRESETS, applyPresetToConfig } from "@/lib/presets";
import { SectionsListColumn } from "./SectionsListColumn";
import { ActiveEditorColumn } from "./ActiveEditorColumn";
import { LivePreviewColumn } from "./LivePreviewColumn";

interface CustomizeWorkspaceProps {
  config: ReadmeBuilderConfig;
  setConfig: React.Dispatch<React.SetStateAction<ReadmeBuilderConfig>>;
  repos: GitHubRepo[];
  markdown: string;
  profile: GitHubUserProfile | null;
  analysis: RepoAnalysisResult | null;
  onReset: () => void;
  onProceedToEditor: () => void;
}

export function CustomizeWorkspace({
  config,
  setConfig,
  repos,
  markdown,
  profile,
  analysis,
  onReset,
}: CustomizeWorkspaceProps) {
  const [activeSectionId, setActiveSectionId] = useState<SectionId>("header");
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);
  const [pendingPresetId, setPendingPresetId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsPresetsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectPreset = (presetId: string) => {
    setIsPresetsOpen(false);
    // Check if configuration has custom content or changes
    const hasCustomContent =
      Boolean(config.about.content) ||
      Boolean(config.custom.content) ||
      (config.skills.languages && config.skills.languages.length > 3);

    if (hasCustomContent) {
      setPendingPresetId(presetId);
    } else {
      executeApplyPreset(presetId);
    }
  };

  const executeApplyPreset = (presetId: string) => {
    setActivePreset(presetId);
    setPendingPresetId(null);
    setConfig((prev) => applyPresetToConfig(presetId, prev));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
    } catch (err) {
      console.error("Copy error:", err);
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8;" });
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

  return (
    <div className="w-full max-w-[1700px] mx-auto text-left font-sans px-2 sm:px-4 space-y-2">
      {/* Preset Confirmation Dialog */}
      {pendingPresetId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#d0d7de] rounded-xl p-5 max-w-sm w-full space-y-3 shadow-xl text-xs">
            <h3 className="font-bold text-sm text-[#1f2328]">Apply Preset?</h3>
            <p className="text-[#656d76] leading-relaxed">
              Applying this preset will update your README section layout and defaults while preserving your profile information.
            </p>
            <div className="flex justify-end gap-2 pt-2 border-t border-[#d0d7de]">
              <button
                type="button"
                onClick={() => setPendingPresetId(null)}
                className="px-3 py-1.5 border border-[#d0d7de] rounded bg-white text-[#1f2328] font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => executeApplyPreset(pendingPresetId)}
                className="px-3.5 py-1.5 bg-[#0969da] text-white rounded font-semibold"
              >
                Apply Preset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Action Toolbar */}
      <div className="flex items-center justify-between p-2 bg-[#f6f8fa] border border-[#d0d7de] rounded-lg shadow-2xs text-xs">
        <div className="flex items-center gap-2">
          {/* Presets Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsPresetsOpen((prev) => !prev)}
              className="px-3 py-1.5 bg-white border border-[#d0d7de] hover:bg-zinc-50 text-[#1f2328] font-semibold rounded-md flex items-center gap-1.5 transition-colors"
            >
              <span>⚡ Presets</span>
              <span className="text-[10px] text-[#656d76]">▾</span>
            </button>

            {isPresetsOpen && (
              <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-[#d0d7de] rounded-lg shadow-lg z-50 p-1.5 space-y-1">
                <div className="text-[10px] font-bold text-[#656d76] px-2 py-1 uppercase tracking-wider">
                  Select Starter Preset
                </div>
                {PRESETS.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => handleSelectPreset(tmpl.id)}
                    className={`w-full text-left p-2 rounded-md hover:bg-[#f0f6ff] transition-colors flex items-start gap-2 ${
                      activePreset === tmpl.id ? "bg-[#f0f6ff] border border-[#0969da]/30" : ""
                    }`}
                  >
                    <span className="text-sm mt-0.5">{tmpl.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs text-[#1f2328] flex items-center justify-between">
                        <span>{tmpl.name}</span>
                        <span className="text-[9px] font-mono text-[#0969da] bg-white border border-[#d0d7de] px-1 rounded">
                          {tmpl.badge}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#656d76] truncate">{tmpl.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onReset}
            className="px-3 py-1.5 bg-white border border-[#d0d7de] hover:bg-zinc-50 text-[#656d76] hover:text-[#1f2328] font-medium rounded-md transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Action Buttons Right */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1.5 bg-white border border-[#d0d7de] hover:bg-zinc-50 text-[#1f2328] font-semibold rounded-md transition-colors flex items-center gap-1.5"
          >
            <span>📋</span>
            <span>Copy Markdown</span>
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="px-3.5 py-1.5 bg-[#0969da] hover:bg-[#0858b9] text-white font-semibold rounded-md transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <span>📥</span>
            <span>Download README</span>
          </button>
        </div>
      </div>

      {/* 3-Column Desktop Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(320px,380px)_minmax(0,1fr)] gap-3 h-[calc(100vh-140px)] min-h-[650px] items-stretch">
        {/* COLUMN 1: SECTIONS SIDEBAR (240px) */}
        <div className="h-full overflow-y-auto pr-0.5">
          <SectionsListColumn
            config={config}
            setConfig={setConfig}
            activeSectionId={activeSectionId}
            setActiveSectionId={setActiveSectionId}
          />
        </div>

        {/* COLUMN 2: SETTINGS PANEL (320px - 380px) */}
        <div className="h-full overflow-y-auto pr-0.5 font-sans">
          <ActiveEditorColumn
            config={config}
            setConfig={setConfig}
            repos={repos}
            activeSectionId={activeSectionId}
            setActiveSectionId={setActiveSectionId}
          />
        </div>

        {/* COLUMN 3: PREVIEW PANEL (Primary - max remaining width minmax(0, 1fr)) */}
        <div className="h-full overflow-y-auto">
          <LivePreviewColumn
            config={config}
            repos={repos}
            markdown={markdown}
            profile={profile}
            analysis={analysis}
          />
        </div>
      </div>
    </div>
  );
}
