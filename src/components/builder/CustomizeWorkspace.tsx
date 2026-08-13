"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { ReadmeBuilderConfig, SectionId } from "@/types/config";
import { GitHubRepo, GitHubUserProfile, RepoAnalysisResult } from "@/types/github";
import { PRESETS, applyPresetToConfig } from "@/lib/presets";
import { SectionsListColumn } from "./SectionsListColumn";
import { ActiveEditorColumn } from "./ActiveEditorColumn";

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
  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const [viewMode, setViewMode] = useState<"rendered" | "code">("rendered");
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);
  const [pendingPresetId, setPendingPresetId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close presets dropdown on outside click
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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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

  const handleOpenSectionEditor = (id: SectionId) => {
    setActiveSectionId(id);
    setIsEditorOpen(true);
  };

  return (
    <div className="w-full max-w-[1700px] mx-auto text-left font-sans px-2 sm:px-4 space-y-3">
      {/* Preset Confirmation Dialog */}
      {pendingPresetId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#D9D7D2] rounded-lg p-5 max-w-sm w-full space-y-3 shadow-lg text-xs">
            <h3 className="font-bold text-sm text-[#171717]">Apply Preset Layout?</h3>
            <p className="text-[#6B6B6B] leading-relaxed">
              Applying this preset will update your README section layout and options while preserving your fetched profile data.
            </p>
            <div className="flex justify-end gap-2 pt-2 border-t border-[#D9D7D2]">
              <button
                type="button"
                onClick={() => setPendingPresetId(null)}
                className="px-3 py-1.5 border border-[#D9D7D2] rounded bg-white text-[#171717] font-medium hover:bg-[#EFEEE9]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => executeApplyPreset(pendingPresetId)}
                className="px-3.5 py-1.5 bg-[#171717] text-white rounded font-semibold hover:bg-black"
              >
                Apply Preset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Editorial Toolbar */}
      <div className="flex items-center justify-between p-2.5 bg-[#F6F5F1] border border-[#D9D7D2] rounded-lg shadow-2xs text-xs">
        <div className="flex items-center gap-3">
          {/* View Mode Switcher */}
          <div className="inline-flex rounded-md p-0.5 border border-[#D9D7D2] bg-white text-xs font-medium">
            <button
              type="button"
              onClick={() => setViewMode("rendered")}
              className={`px-3 py-1 rounded transition-colors ${
                viewMode === "rendered"
                  ? "bg-[#171717] text-white font-semibold"
                  : "text-[#6B6B6B] hover:text-[#171717]"
              }`}
            >
              Document
            </button>
            <button
              type="button"
              onClick={() => setViewMode("code")}
              className={`px-3 py-1 rounded transition-colors ${
                viewMode === "code"
                  ? "bg-[#171717] text-white font-semibold"
                  : "text-[#6B6B6B] hover:text-[#171717]"
              }`}
            >
              Markdown
            </button>
          </div>

          {/* Presets Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsPresetsOpen((prev) => !prev)}
              className="px-3 py-1.5 bg-white border border-[#D9D7D2] hover:bg-[#EFEEE9] text-[#171717] font-medium rounded flex items-center gap-1.5 transition-colors"
            >
              <span>⚡ Presets</span>
              <span className="text-[10px] text-[#6B6B6B]">▾</span>
            </button>

            {isPresetsOpen && (
              <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-[#D9D7D2] rounded-lg shadow-lg z-50 p-1.5 space-y-1">
                <div className="text-[10px] font-bold text-[#6B6B6B] px-2 py-1 uppercase tracking-wider">
                  Select Presets
                </div>
                {PRESETS.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => handleSelectPreset(tmpl.id)}
                    className={`w-full text-left p-2 rounded hover:bg-[#EFEEE9] transition-colors flex items-start gap-2 ${
                      activePreset === tmpl.id ? "bg-[#EFEEE9] font-semibold" : ""
                    }`}
                  >
                    <span className="text-sm mt-0.5">{tmpl.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-xs text-[#171717] flex items-center justify-between">
                        <span>{tmpl.name}</span>
                        <span className="text-[9px] font-mono text-[#6B6B6B] bg-white border border-[#D9D7D2] px-1 rounded">
                          {tmpl.badge}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#6B6B6B] truncate">{tmpl.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onReset}
            className="px-3 py-1.5 bg-white border border-[#D9D7D2] hover:bg-[#EFEEE9] text-[#6B6B6B] hover:text-[#171717] font-medium rounded transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Action Buttons Right */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1.5 bg-white border border-[#D9D7D2] hover:bg-[#EFEEE9] text-[#171717] font-medium rounded transition-colors flex items-center gap-1.5"
          >
            <span>📋</span>
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="px-3.5 py-1.5 bg-[#171717] hover:bg-black text-white font-medium rounded transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <span>📥</span>
            <span>Download README</span>
          </button>
        </div>
      </div>

      {/* Digital Notebook 3-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_auto] gap-4 h-[calc(100vh-150px)] min-h-[650px] items-stretch">
        {/* COLUMN 1: DOCUMENT OUTLINE SIDEBAR (240px) */}
        <div className="h-full overflow-y-auto pr-0.5 bg-[#F6F5F1]">
          <SectionsListColumn
            config={config}
            setConfig={setConfig}
            activeSectionId={activeSectionId}
            setActiveSectionId={(id) => handleOpenSectionEditor(id)}
          />
        </div>

        {/* COLUMN 2: CENTER DIGITAL NOTEBOOK DOCUMENT SURFACE (Primary) */}
        <div className="h-full overflow-y-auto border border-[#D9D7D2] rounded-xl bg-white shadow-xs p-6 relative flex flex-col">
          <div className="border-b border-[#D9D7D2] pb-3 mb-4 flex items-center justify-between text-xs text-[#6B6B6B] font-mono">
            <span>README.md — Notebook View</span>
            <span>{viewMode === "rendered" ? "Rendered Preview" : "Markdown Code"}</span>
          </div>

          {viewMode === "rendered" ? (
            <div className="markdown-body flex-1 leading-relaxed text-[#171717] font-sans">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          ) : (
            <textarea
              value={markdown}
              readOnly
              className="w-full flex-1 min-h-[500px] p-4 font-mono text-xs text-[#171717] bg-[#F6F5F1] rounded-lg border border-[#D9D7D2] focus:outline-none resize-none leading-relaxed"
              spellCheck={false}
            />
          )}
        </div>

        {/* COLUMN 3: CONTEXTUAL SECTION SETTINGS PANEL (340px) */}
        {isEditorOpen && (
          <div className="w-full lg:w-[340px] h-full overflow-y-auto border border-[#D9D7D2] rounded-xl bg-white p-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#D9D7D2] pb-2 mb-3">
              <span className="font-bold text-xs text-[#171717] uppercase tracking-wider">
                Section Settings
              </span>
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="text-[#6B6B6B] hover:text-[#171717] font-bold text-xs p-1"
                title="Close settings panel"
              >
                ✕
              </button>
            </div>
            <ActiveEditorColumn
              config={config}
              setConfig={setConfig}
              repos={repos}
              activeSectionId={activeSectionId}
              setActiveSectionId={setActiveSectionId}
            />
          </div>
        )}
      </div>
    </div>
  );
}
