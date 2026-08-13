"use client";

import React, { useState } from "react";
import { ReadmeBuilderConfig, BadgeStyle, CustomSkillItem } from "@/types/config";
import {
  TECHNOLOGIES,
  TECH_CATEGORIES,
  TechCategory,
  Technology,
  buildTechBadgeUrl,
  searchTechnologies,
} from "@/lib/technologies";

interface SkillsEditorProps {
  config: ReadmeBuilderConfig;
  setConfig: React.Dispatch<React.SetStateAction<ReadmeBuilderConfig>>;
}

export function SkillsEditor({ config, setConfig }: SkillsEditorProps) {
  const { skills } = config;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<TechCategory | "All">("All");

  const [customName, setCustomName] = useState("");
  const [customBadgeUrl, setCustomBadgeUrl] = useState("");

  const badgeStyles: { id: BadgeStyle; label: string }[] = [
    { id: "for-the-badge", label: "For The Badge" },
    { id: "flat-square", label: "Flat Square" },
    { id: "flat", label: "Flat" },
    { id: "plastic", label: "Plastic" },
  ];

  // Map category key in config to category name
  const isTechSelected = (tech: Technology): boolean => {
    const listKey = tech.category === "Languages"
      ? "languages"
      : tech.category === "Frontend"
      ? "frontend"
      : tech.category === "Backend"
      ? "backend"
      : tech.category === "Databases"
      ? "databases"
      : tech.category === "Mobile"
      ? "mobile"
      : tech.category === "Cloud"
      ? "cloud"
      : tech.category === "DevOps"
      ? "devops"
      : tech.category === "AI/ML"
      ? "ai"
      : tech.category === "Design"
      ? "design"
      : tech.category === "Tools"
      ? "tools"
      : "other";

    const currentList = ((skills as any)[listKey] || []) as string[];
    return currentList.includes(tech.name);
  };

  const toggleTech = (tech: Technology) => {
    const listKey = tech.category === "Languages"
      ? "languages"
      : tech.category === "Frontend"
      ? "frontend"
      : tech.category === "Backend"
      ? "backend"
      : tech.category === "Databases"
      ? "databases"
      : tech.category === "Mobile"
      ? "mobile"
      : tech.category === "Cloud"
      ? "cloud"
      : tech.category === "DevOps"
      ? "devops"
      : tech.category === "AI/ML"
      ? "ai"
      : tech.category === "Design"
      ? "design"
      : tech.category === "Tools"
      ? "tools"
      : "other";

    setConfig((prev) => {
      const currentList = ((prev.skills as any)[listKey] || []) as string[];
      const exists = currentList.includes(tech.name);
      const updatedList = exists
        ? currentList.filter((n) => n !== tech.name)
        : [...currentList, tech.name];

      return {
        ...prev,
        skills: {
          ...prev.skills,
          [listKey]: updatedList,
        },
      };
    });
  };

  // Get all currently selected technologies from config
  const getSelectedTechList = (): { name: string; tech?: Technology; isCustom?: boolean; customId?: string }[] => {
    const selected: { name: string; tech?: Technology; isCustom?: boolean; customId?: string }[] = [];

    for (const tech of TECHNOLOGIES) {
      if (isTechSelected(tech)) {
        selected.push({ name: tech.name, tech });
      }
    }

    if (skills.customSkills && skills.customSkills.length > 0) {
      for (const custom of skills.customSkills) {
        selected.push({ name: custom.name, isCustom: true, customId: custom.id || custom.name });
      }
    }

    return selected;
  };

  const selectedTechList = getSelectedTechList();
  const filteredTechnologies = searchTechnologies(searchQuery, selectedCategory);

  const addCustomSkill = () => {
    if (!customName.trim() || !customBadgeUrl.trim()) return;
    const newSkill: CustomSkillItem = {
      id: Date.now().toString(),
      name: customName.trim(),
      badgeUrl: customBadgeUrl.trim(),
    };

    setConfig((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        customSkills: [...(prev.skills.customSkills || []), newSkill],
      },
    }));

    setCustomName("");
    setCustomBadgeUrl("");
  };

  const removeCustomSkill = (identifier: string) => {
    setConfig((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        customSkills: (prev.skills.customSkills || []).filter(
          (s) => s.id !== identifier && s.name !== identifier
        ),
      },
    }));
  };

  return (
    <div className="space-y-3 text-xs font-sans">
      {/* Header & Enable Toggle */}
      <div className="flex items-center justify-between border-b border-[#d0d7de] pb-2">
        <h4 className="font-bold text-sm text-[#1f2328]">Tech Stack & Badges</h4>
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

      {/* Badge Style Selector */}
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
        <label className="block text-[#656d76] font-semibold mb-1">Search Technologies</label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search technologies... (e.g. Next.js, Python, MongoDB)"
            className="w-full pl-8 pr-3 py-1.5 border border-[#d0d7de] rounded-md text-[#1f2328] placeholder-[#656d76] focus:outline-none focus:border-[#0969da]"
          />
          <span className="absolute left-2.5 top-1.5 text-[#656d76]">🔍</span>
        </div>
      </div>

      {/* Compact Category Filters */}
      <div>
        <div className="flex flex-wrap gap-1">
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
              selectedCategory === "All"
                ? "bg-[#0969da] text-white"
                : "bg-[#f6f8fa] text-[#656d76] hover:bg-zinc-200"
            }`}
          >
            All
          </button>
          {TECH_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                selectedCategory === cat
                  ? "bg-[#0969da] text-white"
                  : "bg-[#f6f8fa] text-[#656d76] hover:bg-zinc-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Technologies Chips Bar */}
      {selectedTechList.length > 0 && (
        <div className="p-2 border border-[#d0d7de] rounded-md bg-[#f6f8fa] space-y-1.5">
          <div className="font-semibold text-[11px] text-[#1f2328]">
            Selected ({selectedTechList.length})
          </div>
          <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
            {selectedTechList.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-[#d0d7de] rounded text-[11px] font-medium text-[#1f2328]"
              >
                <span>{item.name}</span>
                <button
                  type="button"
                  onClick={() => {
                    if (item.isCustom && item.customId) {
                      removeCustomSkill(item.customId);
                    } else if (item.tech) {
                      toggleTech(item.tech);
                    }
                  }}
                  className="text-[#656d76] hover:text-red-600 font-bold ml-0.5"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Filtered Technologies Grid */}
      <div className="space-y-1">
        <label className="block text-[#656d76] font-semibold">Available Technologies</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-56 overflow-y-auto p-1 border border-[#d0d7de] rounded-md bg-white">
          {filteredTechnologies.map((tech) => {
            const selected = isTechSelected(tech);
            return (
              <button
                key={tech.id}
                type="button"
                onClick={() => toggleTech(tech)}
                className={`px-2 py-1.5 rounded border text-left transition-colors flex items-center justify-between font-medium ${
                  selected
                    ? "bg-[#f0f6ff] border-[#0969da] text-[#0969da] font-semibold"
                    : "bg-white border-[#d0d7de] hover:bg-[#f6f8fa] text-[#1f2328]"
                }`}
              >
                <span className="truncate">{tech.name}</span>
                {selected && <span className="text-xs text-[#0969da] font-bold">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Add Custom Badge */}
      <div className="pt-2 border-t border-[#d0d7de] space-y-2">
        <span className="block font-semibold text-[#1f2328]">Add Custom Technology Badge</span>
        <div className="flex gap-2">
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Tech Name"
            className="w-1/3 px-2 py-1 border border-[#d0d7de] rounded text-xs"
          />
          <input
            type="text"
            value={customBadgeUrl}
            onChange={(e) => setCustomBadgeUrl(e.target.value)}
            placeholder="Badge Image URL"
            className="flex-1 px-2 py-1 border border-[#d0d7de] rounded text-xs"
          />
          <button
            type="button"
            onClick={addCustomSkill}
            className="px-3 py-1 bg-[#0969da] text-white rounded text-xs font-semibold shrink-0"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
