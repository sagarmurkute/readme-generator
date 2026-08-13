"use client";

import React from "react";
import { ReadmeBuilderConfig } from "@/types/config";

interface ExtrasEditorProps {
  config: ReadmeBuilderConfig;
  setConfig: React.Dispatch<React.SetStateAction<ReadmeBuilderConfig>>;
}

export function ExtrasEditor({ config, setConfig }: ExtrasEditorProps) {
  const extras = config.extras || {
    enabled: true,
    showSpotifyWidget: false,
    showJokeCard: true,
    showWakatime: false,
  };

  return (
    <div className="space-y-4 text-xs font-sans">
      <div className="flex items-center justify-between border-b border-[#d0d7de] pb-2">
        <h4 className="font-bold text-sm text-[#1f2328]">Fun Widgets & Extras</h4>
        <label className="flex items-center gap-1.5 cursor-pointer text-[#656d76]">
          <input
            type="checkbox"
            checked={extras.enabled}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                extras: {
                  ...(prev.extras || { showJokeCard: true, showSpotifyWidget: false, showWakatime: false }),
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
        <label className="flex items-center gap-2 p-2 border border-[#d0d7de] rounded-lg bg-[#f6f8fa] cursor-pointer">
          <input
            type="checkbox"
            checked={extras.showJokeCard}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                extras: { ...prev.extras, showJokeCard: e.target.checked },
              }))
            }
            className="h-3.5 w-3.5 accent-[#0969da] rounded"
          />
          <span>Random Programming Joke Card</span>
        </label>

        <label className="flex items-center gap-2 p-2 border border-[#d0d7de] rounded-lg bg-[#f6f8fa] cursor-pointer">
          <input
            type="checkbox"
            checked={extras.showWakatime}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                extras: { ...prev.extras, showWakatime: e.target.checked },
              }))
            }
            className="h-3.5 w-3.5 accent-[#0969da] rounded"
          />
          <span>WakaTime Coding Time Card</span>
        </label>

        {extras.showWakatime && (
          <div className="pl-4">
            <label className="block text-[#656d76] font-medium mb-1">WakaTime Username</label>
            <input
              type="text"
              value={extras.wakatimeUsername || ""}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  extras: { ...prev.extras, wakatimeUsername: e.target.value },
                }))
              }
              placeholder="e.g. sagarmurkute"
              className="w-full px-2.5 py-1 border border-[#d0d7de] rounded text-[#1f2328]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
