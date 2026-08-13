"use client";

import React, { useState } from "react";
import { ReadmeBuilderConfig, BadgeStyle } from "@/types/config";
import { SKILL_CATEGORIES } from "@/utils/skillCatalog";

interface SkillsEditorProps {
  config: ReadmeBuilderConfig;
  setConfig: React.Dispatch<React.SetStateAction<ReadmeBuilderConfig>>;
}

export function SkillsEditor({ config, setConfig }: SkillsEditorProps) {
  const { skills } = config;
  const [search, setSearch] = useState("");
  const [customName, setCustomName] = useState("");
  const [customBadgeUrl, setCustomBadgeUrl] = useState("");

  const toggleSkill = (categoryKey: string, name: string) => {
    setConfig((prev) => {
      const currentList = ((prev.skills as any)[categoryKey] || []) as string[];
      const isSelected = currentList.includes(name);
      const updatedList = isSelected
        ? currentList.filter((item) => item !== name)
        : [...currentList, name];

      return {
        ...prev,
        skills: {
          ...prev.skills,
          [categoryKey]: updatedList,
        },
      };
    });
  };

  const addCustomSkill = () => {
    if (!customName.trim() || !customBadgeUrl.trim()) return;
    setConfig((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        customSkills: [
          ...(prev.skills.customSkills || []),
          { name: customName.trim(), badgeUrl: customBadgeUrl.trim() },
        ],
      },
    }));
    setCustomName("");
    setCustomBadgeUrl("");
  };

  const removeCustomSkill = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        customSkills: (prev.skills.customSkills || []).filter((_, i) => i !== index),
      },
    }));
  };

  const badgeStyles: { id: BadgeStyle; label: string }[] = [
    { id: "for-the-badge", label: "For The Badge" },
    { id: "flat-square", label: "Flat Square" },
    { id: "flat", label: "Flat" },
    { id: "plastic", label: "Plastic" },
  ];

  return (
    <div className="space-y-4 text-xs font-sans">
      <div className="flex items-center justify-between border-b border-[#d0d7de] pb-2">
        <h4 className="font-bold text-sm text-[#1f2328]">Tech Stack & Skills</h4>
        <label className="flex items-center gap-1.5 cursor-pointer text-[#656d76]">
          <input
            type="checkbox"
            checked={skills.enabled}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                skills: { ...prev.skills, enabled: e.target.checked },
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
                  skills: { ...prev.skills, badgeStyle: style.id },
                }))
              }
              className={`py-1 px-2 rounded border text-[11px] font-medium transition-colors ${
                (skills.badgeStyle || "for-the-badge") === style.id
                  ? "bg-[#0969da] text-white border-[#0969da]"
                  : "bg-white text-[#1f2328] border-[#d0d7de] hover:bg-zinc-50"
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search technologies (e.g. React, Python, Docker)..."
          className="w-full px-3 py-1.5 border border-[#d0d7de] rounded-md bg-white text-[#1f2328] text-xs focus:outline-none focus:border-[#0969da]"
        />
      </div>

      {/* Skill Categories */}
      <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
        {SKILL_CATEGORIES.map((cat) => {
          const selectedList = ((skills as any)[cat.key] || []) as string[];
          const filteredItems = cat.items.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          );

          if (search && filteredItems.length === 0) return null;

          return (
            <div key={cat.key} className="space-y-1.5 p-2 bg-[#f6f8fa] border border-[#d0d7de] rounded-lg">
              <div className="flex items-center justify-between text-[#656d76] font-semibold text-[11px]">
                <span>{cat.title}</span>
                <span className="font-mono text-[#0969da]">{selectedList.length} selected</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {filteredItems.map((item) => {
                  const isChecked = selectedList.includes(item.name);
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => toggleSkill(cat.key, item.name)}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium border transition-colors ${
                        isChecked
                          ? "bg-[#0969da] text-white border-[#0969da] font-semibold"
                          : "bg-white text-[#1f2328] border-[#d0d7de] hover:border-[#0969da]"
                      }`}
                    >
                      {isChecked ? "✓ " : "+ "}{item.name}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Badge Add */}
      <div className="pt-2 border-t border-[#d0d7de] space-y-2">
        <span className="block font-semibold text-[#1f2328]">Add Custom Badge</span>
        <div className="flex gap-2">
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Name (e.g. Bun)"
            className="w-1/3 px-2 py-1 border border-[#d0d7de] rounded bg-white text-xs"
          />
          <input
            type="text"
            value={customBadgeUrl}
            onChange={(e) => setCustomBadgeUrl(e.target.value)}
            placeholder="Shields.io Badge URL"
            className="flex-1 px-2 py-1 border border-[#d0d7de] rounded bg-white text-xs"
          />
          <button
            type="button"
            onClick={addCustomSkill}
            className="px-3 py-1 bg-[#0969da] text-white rounded text-xs font-semibold"
          >
            Add
          </button>
        </div>

        {skills.customSkills && skills.customSkills.length > 0 && (
          <div className="space-y-1">
            {skills.customSkills.map((c, idx) => (
              <div key={idx} className="flex items-center justify-between p-1 px-2 bg-white border border-[#d0d7de] rounded">
                <span className="font-mono text-xs">{c.name}</span>
                <button
                  type="button"
                  onClick={() => removeCustomSkill(idx)}
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
