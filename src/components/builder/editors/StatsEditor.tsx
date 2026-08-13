"use client";

import React from "react";
import { ReadmeBuilderConfig, StatsTheme } from "@/types/config";

interface StatsEditorProps {
  config: ReadmeBuilderConfig;
  setConfig: React.Dispatch<React.SetStateAction<ReadmeBuilderConfig>>;
}

export function StatsEditor({ config, setConfig }: StatsEditorProps) {
  const { stats } = config;

  const themes: { id: StatsTheme; label: string }[] = [
    { id: "radial", label: "Radial Blue" },
    { id: "tokyonight", label: "Tokyo Night" },
    { id: "github_dark", label: "GitHub Dark" },
    { id: "dracula", label: "Dracula" },
    { id: "synthwave", label: "Synthwave" },
    { id: "one-dark", label: "One Dark" },
    { id: "nord", label: "Nord" },
    { id: "gruvbox", label: "Gruvbox" },
    { id: "catppuccin_mocha", label: "Catppuccin" },
  ];

  return (
    <div className="space-y-4 text-xs font-sans">
      <div className="flex items-center justify-between border-b border-[#d0d7de] pb-2">
        <h4 className="font-bold text-sm text-[#1f2328]">GitHub Analytics & Cards</h4>
        <label className="flex items-center gap-1.5 cursor-pointer text-[#656d76]">
          <input
            type="checkbox"
            checked={stats.enabled}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                stats: { ...prev.stats, enabled: e.target.checked },
              }))
            }
            className="h-3.5 w-3.5 accent-[#0969da] rounded"
          />
          <span>Enable Section</span>
        </label>
      </div>

      {/* Theme Picker */}
      <div>
        <label className="block text-[#656d76] font-semibold mb-1">Card Color Theme</label>
        <select
          value={stats.theme || "radial"}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              stats: { ...prev.stats, theme: e.target.value as StatsTheme },
            }))
          }
          className="w-full px-2.5 py-1.5 border border-[#d0d7de] rounded-md bg-white text-[#1f2328] font-sans text-xs focus:outline-none focus:border-[#0969da]"
        >
          {themes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Card Toggles Grid */}
      <div className="space-y-2">
        <span className="block font-semibold text-[#1f2328]">Active Widgets:</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <label className="flex items-center gap-2 p-2 border border-[#d0d7de] rounded-lg bg-[#f6f8fa] cursor-pointer">
            <input
              type="checkbox"
              checked={stats.showStatsCard}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  stats: { ...prev.stats, showStatsCard: e.target.checked },
                }))
              }
              className="h-3.5 w-3.5 accent-[#0969da] rounded"
            />
            <span>GitHub Stats Card</span>
          </label>

          <label className="flex items-center gap-2 p-2 border border-[#d0d7de] rounded-lg bg-[#f6f8fa] cursor-pointer">
            <input
              type="checkbox"
              checked={stats.showTopLangsCard}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  stats: { ...prev.stats, showTopLangsCard: e.target.checked },
                }))
              }
              className="h-3.5 w-3.5 accent-[#0969da] rounded"
            />
            <span>Top Languages Card</span>
          </label>

          <label className="flex items-center gap-2 p-2 border border-[#d0d7de] rounded-lg bg-[#f6f8fa] cursor-pointer">
            <input
              type="checkbox"
              checked={stats.showStreakCard}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  stats: { ...prev.stats, showStreakCard: e.target.checked },
                }))
              }
              className="h-3.5 w-3.5 accent-[#0969da] rounded"
            />
            <span>GitHub Streak Card</span>
          </label>

          <label className="flex items-center gap-2 p-2 border border-[#d0d7de] rounded-lg bg-[#f6f8fa] cursor-pointer">
            <input
              type="checkbox"
              checked={stats.showTrophies}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  stats: { ...prev.stats, showTrophies: e.target.checked },
                }))
              }
              className="h-3.5 w-3.5 accent-[#0969da] rounded"
            />
            <span>GitHub Profile Trophies</span>
          </label>

          <label className="flex items-center gap-2 p-2 border border-[#d0d7de] rounded-lg bg-[#f6f8fa] cursor-pointer">
            <input
              type="checkbox"
              checked={stats.showSnakeGrid}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  stats: { ...prev.stats, showSnakeGrid: e.target.checked },
                }))
              }
              className="h-3.5 w-3.5 accent-[#0969da] rounded"
            />
            <span>Snake Grid Animation</span>
          </label>

          <label className="flex items-center gap-2 p-2 border border-[#d0d7de] rounded-lg bg-[#f6f8fa] cursor-pointer">
            <input
              type="checkbox"
              checked={stats.showDailyQuote}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  stats: { ...prev.stats, showDailyQuote: e.target.checked },
                }))
              }
              className="h-3.5 w-3.5 accent-[#0969da] rounded"
            />
            <span>Daily Tech Quote Card</span>
          </label>
        </div>
      </div>
    </div>
  );
}
