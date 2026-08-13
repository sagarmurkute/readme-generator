"use client";

import React, { useState } from "react";
import { ReadmeBuilderConfig, BadgeStyle, CustomLinkItem } from "@/types/config";

interface SocialsEditorProps {
  config: ReadmeBuilderConfig;
  setConfig: React.Dispatch<React.SetStateAction<ReadmeBuilderConfig>>;
}

export function SocialsEditor({ config, setConfig }: SocialsEditorProps) {
  const { socials } = config;

  const [customLabel, setCustomLabel] = useState("");
  const [customUrl, setCustomUrl] = useState("");

  const badgeStyles: { id: BadgeStyle; label: string }[] = [
    { id: "for-the-badge", label: "For The Badge" },
    { id: "flat-square", label: "Flat Square" },
    { id: "flat", label: "Flat" },
    { id: "plastic", label: "Plastic" },
  ];

  const addCustomLink = () => {
    if (!customLabel.trim() || !customUrl.trim()) return;
    const newLink: CustomLinkItem = {
      id: Date.now().toString(),
      label: customLabel.trim(),
      url: customUrl.trim(),
    };

    setConfig((prev) => ({
      ...prev,
      socials: {
        ...prev.socials,
        customLinks: [...(prev.socials.customLinks || []), newLink],
      },
    }));

    setCustomLabel("");
    setCustomUrl("");
  };

  const removeCustomLink = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      socials: {
        ...prev.socials,
        customLinks: (prev.socials.customLinks || []).filter((l) => l.id !== id),
      },
    }));
  };

  return (
    <div className="space-y-3.5 text-xs font-sans">
      <div className="flex items-center justify-between border-b border-[#d0d7de] pb-2">
        <h4 className="font-bold text-sm text-[#1f2328]">Social Links & Connect</h4>
        <label className="flex items-center gap-1.5 cursor-pointer text-[#656d76]">
          <input
            type="checkbox"
            checked={socials.enabled}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                socials: { ...prev.socials, enabled: e.target.checked },
              }))
            }
            className="h-3.5 w-3.5 accent-[#0969da] rounded"
          />
          <span>Enable Section</span>
        </label>
      </div>

      {/* Badge Style Switcher */}
      <div>
        <label className="block text-[#656d76] font-semibold mb-1">Badge Style</label>
        <div className="grid grid-cols-4 gap-1.5">
          {badgeStyles.map((style) => (
            <button
              key={style.id}
              type="button"
              onClick={() =>
                setConfig((prev) => ({
                  ...prev,
                  socials: { ...prev.socials, badgeStyle: style.id },
                }))
              }
              className={`py-1 px-2 rounded border text-[11px] font-medium transition-colors ${
                (socials.badgeStyle || "for-the-badge") === style.id
                  ? "bg-[#0969da] text-white border-[#0969da]"
                  : "bg-white text-[#1f2328] border-[#d0d7de] hover:bg-zinc-50"
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>

      {/* Social Input Fields */}
      <div className="space-y-2">
        <div>
          <label className="block text-[11px] text-[#656d76] font-medium mb-1">🐙 GitHub Username</label>
          <input
            type="text"
            value={socials.github || ""}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                socials: { ...prev.socials, github: e.target.value },
              }))
            }
            placeholder="e.g. sagarmurkute"
            className="w-full px-2.5 py-1 border border-[#d0d7de] rounded text-[#1f2328]"
          />
        </div>

        <div>
          <label className="block text-[11px] text-[#656d76] font-medium mb-1">💼 LinkedIn Profile / Handle</label>
          <input
            type="text"
            value={socials.linkedin || ""}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                socials: { ...prev.socials, linkedin: e.target.value },
              }))
            }
            placeholder="e.g. sagarmurkute"
            className="w-full px-2.5 py-1 border border-[#d0d7de] rounded text-[#1f2328]"
          />
        </div>

        <div>
          <label className="block text-[11px] text-[#656d76] font-medium mb-1">🐦 Twitter / X Handle</label>
          <input
            type="text"
            value={socials.twitter || ""}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                socials: { ...prev.socials, twitter: e.target.value },
              }))
            }
            placeholder="e.g. sagarmurkute"
            className="w-full px-2.5 py-1 border border-[#d0d7de] rounded text-[#1f2328]"
          />
        </div>

        <div>
          <label className="block text-[11px] text-[#656d76] font-medium mb-1">📷 Instagram Handle</label>
          <input
            type="text"
            value={socials.instagram || ""}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                socials: { ...prev.socials, instagram: e.target.value },
              }))
            }
            placeholder="e.g. sagarmurkute"
            className="w-full px-2.5 py-1 border border-[#d0d7de] rounded text-[#1f2328]"
          />
        </div>

        <div>
          <label className="block text-[11px] text-[#656d76] font-medium mb-1">▶️ YouTube Handle / Channel</label>
          <input
            type="text"
            value={socials.youtube || ""}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                socials: { ...prev.socials, youtube: e.target.value },
              }))
            }
            placeholder="e.g. sagarmurkute"
            className="w-full px-2.5 py-1 border border-[#d0d7de] rounded text-[#1f2328]"
          />
        </div>

        <div>
          <label className="block text-[11px] text-[#656d76] font-medium mb-1">✉️ Email Address</label>
          <input
            type="text"
            value={socials.email || ""}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                socials: { ...prev.socials, email: e.target.value },
              }))
            }
            placeholder="e.g. sagar@example.com"
            className="w-full px-2.5 py-1 border border-[#d0d7de] rounded text-[#1f2328]"
          />
        </div>

        <div>
          <label className="block text-[11px] text-[#656d76] font-medium mb-1">🌐 Portfolio / Website URL</label>
          <input
            type="text"
            value={socials.portfolio || ""}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                socials: { ...prev.socials, portfolio: e.target.value },
              }))
            }
            placeholder="e.g. sagarmurkute.design"
            className="w-full px-2.5 py-1 border border-[#d0d7de] rounded text-[#1f2328]"
          />
        </div>
      </div>

      {/* Custom Links */}
      <div className="pt-2 border-t border-[#d0d7de] space-y-2">
        <span className="block font-semibold text-[#1f2328]">Add Custom Link</span>
        <div className="flex gap-2">
          <input
            type="text"
            value={customLabel}
            onChange={(e) => setCustomLabel(e.target.value)}
            placeholder="Label (e.g. Medium)"
            className="w-1/3 px-2 py-1 border border-[#d0d7de] rounded bg-white text-xs"
          />
          <input
            type="text"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="URL"
            className="flex-1 px-2 py-1 border border-[#d0d7de] rounded bg-white text-xs"
          />
          <button
            type="button"
            onClick={addCustomLink}
            className="px-3 py-1 bg-[#0969da] text-white rounded text-xs font-semibold"
          >
            Add
          </button>
        </div>

        {socials.customLinks && socials.customLinks.length > 0 && (
          <div className="space-y-1">
            {socials.customLinks.map((link) => (
              <div key={link.id} className="flex items-center justify-between p-1 px-2 bg-white border border-[#d0d7de] rounded">
                <span className="font-mono text-xs">{link.label}: {link.url}</span>
                <button
                  type="button"
                  onClick={() => removeCustomLink(link.id)}
                  className="text-red-600 font-bold px-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
