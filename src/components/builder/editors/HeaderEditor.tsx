"use client";

import React, { useState } from "react";
import { ReadmeBuilderConfig } from "@/types/config";

interface HeaderEditorProps {
  config: ReadmeBuilderConfig;
  setConfig: React.Dispatch<React.SetStateAction<ReadmeBuilderConfig>>;
}

export function HeaderEditor({ config, setConfig }: HeaderEditorProps) {
  const { header } = config;
  const [newLineText, setNewLineText] = useState("");

  const addTypingLine = () => {
    if (!newLineText.trim()) return;
    const currentLines = header.typingLines || (header.typingText ? header.typingText.split(",") : []);
    const updated = [...currentLines, newLineText.trim()];

    setConfig((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        typingLines: updated,
        typingText: updated.join(", "),
      },
    }));
    setNewLineText("");
  };

  const removeTypingLine = (index: number) => {
    const currentLines = header.typingLines || (header.typingText ? header.typingText.split(",") : []);
    const updated = currentLines.filter((_, i) => i !== index);

    setConfig((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        typingLines: updated,
        typingText: updated.join(", "),
      },
    }));
  };

  return (
    <div className="space-y-3 text-xs font-sans">
      <div className="flex items-center justify-between border-b border-[#d0d7de] pb-2">
        <h4 className="font-bold text-sm text-[#1f2328]">Header & Banner Settings</h4>
        <label className="flex items-center gap-1.5 cursor-pointer text-[#656d76]">
          <input
            type="checkbox"
            checked={header.enabled}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                header: { ...prev.header, enabled: e.target.checked },
              }))
            }
            className="h-3.5 w-3.5 accent-[#0969da] rounded"
          />
          <span>Enable Section</span>
        </label>
      </div>

      {/* Banner Selection */}
      <div className="space-y-2 p-2.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-lg">
        <label className="block text-[#656d76] font-semibold">Header Banner Style</label>
        <div className="grid grid-cols-3 gap-1.5">
          {(["none", "capsule", "custom"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                setConfig((prev) => ({
                  ...prev,
                  header: { ...prev.header, bannerType: type },
                }))
              }
              className={`py-1 px-2 rounded border text-xs font-medium capitalize transition-colors ${
                (header.bannerType || "none") === type
                  ? "bg-[#0969da] text-white border-[#0969da]"
                  : "bg-white text-[#1f2328] border-[#d0d7de] hover:bg-zinc-50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {header.bannerType === "capsule" && (
          <div className="pt-1">
            <label className="block text-[11px] text-[#656d76] font-medium mb-1">Capsule Theme</label>
            <select
              value={header.bannerCapsuleTheme || "waving"}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  header: { ...prev.header, bannerCapsuleTheme: e.target.value },
                }))
              }
              className="w-full px-2 py-1 border border-[#d0d7de] rounded bg-white text-[#1f2328] text-xs font-sans"
            >
              <option value="waving">Waving Wave</option>
              <option value="slice">Slice Diagonal</option>
              <option value="rect">Clean Rectangle</option>
              <option value="soft">Soft Gradient</option>
              <option value="synthwave">Synthwave Neon</option>
              <option value="ocean">Ocean Blue</option>
              <option value="transparent">Minimal Transparent</option>
            </select>
          </div>
        )}

        {header.bannerType === "custom" && (
          <div className="pt-1">
            <label className="block text-[11px] text-[#656d76] font-medium mb-1">Custom Banner Image URL</label>
            <input
              type="text"
              value={header.bannerUrl || ""}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  header: { ...prev.header, bannerUrl: e.target.value },
                }))
              }
              placeholder="https://user-images.githubusercontent.com/banner.png"
              className="w-full px-2.5 py-1 border border-[#d0d7de] rounded bg-white text-[#1f2328] text-xs"
            />
          </div>
        )}
      </div>

      {/* Greeting & Name */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[#656d76] font-medium mb-1">Greeting</label>
          <input
            type="text"
            value={header.greeting}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                header: { ...prev.header, greeting: e.target.value },
              }))
            }
            className="w-full px-2.5 py-1 border border-[#d0d7de] rounded text-[#1f2328] focus:outline-none focus:border-[#0969da]"
            placeholder="Hi there"
          />
        </div>

        <div>
          <label className="block text-[#656d76] font-medium mb-1">Display Name</label>
          <input
            type="text"
            value={header.name}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                header: { ...prev.header, name: e.target.value },
              }))
            }
            className="w-full px-2.5 py-1 border border-[#d0d7de] rounded text-[#1f2328] focus:outline-none focus:border-[#0969da]"
          />
        </div>
      </div>

      {/* Status Badge Input */}
      <div>
        <label className="block text-[#656d76] font-medium mb-1">Status Badge Text</label>
        <input
          type="text"
          value={header.statusBadge || ""}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              header: { ...prev.header, statusBadge: e.target.value },
            }))
          }
          placeholder="e.g. 🟢 Open for work & open-source collaboration"
          className="w-full px-2.5 py-1 border border-[#d0d7de] rounded text-[#1f2328] focus:outline-none focus:border-[#0969da]"
        />
      </div>

      {/* Alignment & Avatar */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <div>
          <label className="block text-[#656d76] font-medium mb-1">Alignment</label>
          <select
            value={header.alignment}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                header: {
                  ...prev.header,
                  alignment: e.target.value as "left" | "center",
                },
              }))
            }
            className="w-full px-2 py-1 border border-[#d0d7de] rounded bg-white text-[#1f2328]"
          >
            <option value="left">Left Aligned</option>
            <option value="center">Center Aligned</option>
          </select>
        </div>

        <div>
          <label className="block text-[#656d76] font-medium mb-1">Avatar Shape</label>
          <select
            value={header.avatarStyle || "rounded"}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                header: {
                  ...prev.header,
                  avatarStyle: e.target.value as "circle" | "rounded" | "square",
                },
              }))
            }
            className="w-full px-2 py-1 border border-[#d0d7de] rounded bg-white text-[#1f2328]"
          >
            <option value="circle">Circle (Round)</option>
            <option value="rounded">Rounded Square</option>
            <option value="square">Sharp Square</option>
          </select>
        </div>
      </div>

      {/* Typing SVG Animation */}
      <div className="pt-2 border-t border-[#d0d7de] space-y-2">
        <label className="flex items-center gap-2 cursor-pointer font-medium text-[#1f2328]">
          <input
            type="checkbox"
            checked={header.showTypingSvg}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                header: { ...prev.header, showTypingSvg: e.target.checked },
              }))
            }
            className="h-3.5 w-3.5 accent-[#0969da] rounded"
          />
          <span>Enable Typing Animation SVG</span>
        </label>

        {header.showTypingSvg && (
          <div className="space-y-2 p-2.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-lg">
            <span className="block text-[11px] font-semibold text-[#656d76]">
              Typing Lines:
            </span>

            <div className="space-y-1">
              {(header.typingLines || (header.typingText ? header.typingText.split(",") : [])).map(
                (line, idx) => (
                  <div key={idx} className="flex items-center justify-between p-1 px-2 bg-white border border-[#d0d7de] rounded-md">
                    <span className="font-mono text-[11px] text-[#1f2328]">{line.trim()}</span>
                    <button
                      type="button"
                      onClick={() => removeTypingLine(idx)}
                      className="text-red-600 font-bold px-1 text-[11px] hover:bg-red-50 rounded"
                    >
                      ✕
                    </button>
                  </div>
                )
              )}
            </div>

            <div className="flex gap-1.5 pt-1">
              <input
                type="text"
                value={newLineText}
                onChange={(e) => setNewLineText(e.target.value)}
                placeholder="e.g. Full Stack Developer"
                className="flex-1 px-2 py-1 border border-[#d0d7de] rounded bg-white text-xs"
              />
              <button
                type="button"
                onClick={addTypingLine}
                className="px-3 py-1 bg-[#0969da] text-white rounded text-xs font-semibold"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Badges Toggle */}
      <div className="pt-2 border-t border-[#d0d7de] space-y-1.5">
        <span className="block font-semibold text-[#1f2328]">Header Badges:</span>

        <div className="grid grid-cols-2 gap-2">
          <label className="flex items-center gap-2 p-1.5 border border-[#d0d7de] rounded-md bg-[#f6f8fa] cursor-pointer">
            <input
              type="checkbox"
              checked={header.showProfileViews}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  header: { ...prev.header, showProfileViews: e.target.checked },
                }))
              }
              className="h-3.5 w-3.5 accent-[#0969da] rounded"
            />
            <span>Visitors Counter</span>
          </label>

          <label className="flex items-center gap-2 p-1.5 border border-[#d0d7de] rounded-md bg-[#f6f8fa] cursor-pointer">
            <input
              type="checkbox"
              checked={header.showFollowersBadge}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  header: { ...prev.header, showFollowersBadge: e.target.checked },
                }))
              }
              className="h-3.5 w-3.5 accent-[#0969da] rounded"
            />
            <span>Followers Badge</span>
          </label>
        </div>
      </div>
    </div>
  );
}
