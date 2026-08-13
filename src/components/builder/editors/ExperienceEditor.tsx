"use client";

import React, { useState } from "react";
import { ReadmeBuilderConfig, ExperienceItem } from "@/types/config";

interface ExperienceEditorProps {
  config: ReadmeBuilderConfig;
  setConfig: React.Dispatch<React.SetStateAction<ReadmeBuilderConfig>>;
}

export function ExperienceEditor({ config, setConfig }: ExperienceEditorProps) {
  const experience = config.experience || { enabled: true, items: [] };

  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [period, setPeriod] = useState("");
  const [description, setDescription] = useState("");

  const addExperience = () => {
    if (!role.trim() || !company.trim()) return;
    const newItem: ExperienceItem = {
      id: Date.now().toString(),
      role: role.trim(),
      company: company.trim(),
      period: period.trim(),
      description: description.trim(),
    };

    setConfig((prev) => ({
      ...prev,
      experience: {
        ...prev.experience,
        enabled: true,
        items: [...(prev.experience?.items || []), newItem],
      },
    }));

    setRole("");
    setCompany("");
    setPeriod("");
    setDescription("");
  };

  const removeExperience = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      experience: {
        ...prev.experience,
        items: (prev.experience?.items || []).filter((item) => item.id !== id),
      },
    }));
  };

  return (
    <div className="space-y-3 text-xs font-sans">
      <div className="flex items-center justify-between border-b border-[#d0d7de] pb-2">
        <h4 className="font-bold text-sm text-[#1f2328]">Work Experience</h4>
        <label className="flex items-center gap-1.5 cursor-pointer text-[#656d76]">
          <input
            type="checkbox"
            checked={experience.enabled}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                experience: {
                  ...(prev.experience || { items: [] }),
                  enabled: e.target.checked,
                },
              }))
            }
            className="h-3.5 w-3.5 accent-[#0969da] rounded"
          />
          <span>Enable Section</span>
        </label>
      </div>

      {/* Add New Experience Item */}
      <div className="p-2.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-lg space-y-2">
        <span className="block font-semibold text-[#1f2328]">Add Position</span>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role (e.g. Senior Frontend Lead)"
            className="px-2.5 py-1 border border-[#d0d7de] rounded bg-white text-xs"
          />
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company (e.g. Acme Corp)"
            className="px-2.5 py-1 border border-[#d0d7de] rounded bg-white text-xs"
          />
        </div>
        <input
          type="text"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          placeholder="Period (e.g. 2022 - Present)"
          className="w-full px-2.5 py-1 border border-[#d0d7de] rounded bg-white text-xs"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Key achievements and technologies used..."
          rows={2}
          className="w-full p-2 border border-[#d0d7de] rounded bg-white text-xs"
        />
        <button
          type="button"
          onClick={addExperience}
          className="w-full py-1.5 bg-[#0969da] text-white rounded font-semibold text-xs"
        >
          Add Experience
        </button>
      </div>

      {/* Existing List */}
      {experience.items && experience.items.length > 0 && (
        <div className="space-y-2">
          <span className="block font-semibold text-[#1f2328]">Added Roles:</span>
          {experience.items.map((item) => (
            <div key={item.id} className="p-2 bg-white border border-[#d0d7de] rounded-lg flex items-start justify-between">
              <div className="space-y-0.5">
                <div className="font-bold text-[#1f2328]">
                  {item.role} @ {item.company}
                </div>
                {item.period && <div className="text-[11px] text-[#656d76]">{item.period}</div>}
                {item.description && <div className="text-xs text-[#1f2328]">{item.description}</div>}
              </div>
              <button
                type="button"
                onClick={() => removeExperience(item.id)}
                className="text-red-600 font-bold px-1.5 py-0.5 text-xs hover:bg-red-50 rounded"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
