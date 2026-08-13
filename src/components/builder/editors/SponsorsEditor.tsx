"use client";

import React from "react";
import { ReadmeBuilderConfig } from "@/types/config";

interface SponsorsEditorProps {
  config: ReadmeBuilderConfig;
  setConfig: React.Dispatch<React.SetStateAction<ReadmeBuilderConfig>>;
}

export function SponsorsEditor({ config, setConfig }: SponsorsEditorProps) {
  const sponsors = config.sponsors || { enabled: true };

  return (
    <div className="space-y-3 text-xs font-sans">
      <div className="flex items-center justify-between border-b border-[#d0d7de] pb-2">
        <h4 className="font-bold text-sm text-[#1f2328]">Sponsor & Support Links</h4>
        <label className="flex items-center gap-1.5 cursor-pointer text-[#656d76]">
          <input
            type="checkbox"
            checked={sponsors.enabled}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                sponsors: {
                  ...(prev.sponsors || {}),
                  enabled: e.target.checked,
                },
              }))
            }
            className="h-3.5 w-3.5 accent-[#0969da] rounded"
          />
          <span>Enable Section</span>
        </label>
      </div>

      <div className="space-y-2">
        <div>
          <label className="block text-[#656d76] font-medium mb-1">Buy Me A Coffee Username / URL</label>
          <input
            type="text"
            value={sponsors.buyMeACoffee || ""}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                sponsors: { ...prev.sponsors, buyMeACoffee: e.target.value },
              }))
            }
            placeholder="e.g. sagarmurkute"
            className="w-full px-2.5 py-1 border border-[#d0d7de] rounded text-[#1f2328]"
          />
        </div>

        <div>
          <label className="block text-[#656d76] font-medium mb-1">Ko-Fi Username</label>
          <input
            type="text"
            value={sponsors.kofi || ""}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                sponsors: { ...prev.sponsors, kofi: e.target.value },
              }))
            }
            placeholder="e.g. sagarmurkute"
            className="w-full px-2.5 py-1 border border-[#d0d7de] rounded text-[#1f2328]"
          />
        </div>

        <div>
          <label className="block text-[#656d76] font-medium mb-1">Patreon Username</label>
          <input
            type="text"
            value={sponsors.patreon || ""}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                sponsors: { ...prev.sponsors, patreon: e.target.value },
              }))
            }
            placeholder="e.g. sagarmurkute"
            className="w-full px-2.5 py-1 border border-[#d0d7de] rounded text-[#1f2328]"
          />
        </div>

        <div>
          <label className="block text-[#656d76] font-medium mb-1">GitHub Sponsors Username</label>
          <input
            type="text"
            value={sponsors.githubSponsors || ""}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                sponsors: { ...prev.sponsors, githubSponsors: e.target.value },
              }))
            }
            placeholder="e.g. sagarmurkute"
            className="w-full px-2.5 py-1 border border-[#d0d7de] rounded text-[#1f2328]"
          />
        </div>
      </div>
    </div>
  );
}
