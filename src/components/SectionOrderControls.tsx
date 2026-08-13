"use client";

import React from "react";
import { SectionId } from "@/types/config";

interface SectionOrderControlsProps {
  sectionOrder: SectionId[];
  setSectionOrder: (newOrder: SectionId[]) => void;
}

const SECTION_LABELS: Record<SectionId, string> = {
  header: "Header & Avatar",
  about: "About Me",
  socials: "Social Links",
  skills: "Tech Stack & Skills",
  stats: "GitHub Stats Cards",
  topLangs: "Top Languages",
  streak: "Streak Stats",
  profileViews: "Profile Views Counter",
  contributionGraph: "GitHub Activity Graph",
  projects: "Featured Repositories",
  experience: "Work Experience",
  sponsors: "Sponsor & Support",
  extras: "Fun & Extras",
  activity: "Activity",
  custom: "Custom Section",
};


export function SectionOrderControls({
  sectionOrder,
  setSectionOrder,
}: SectionOrderControlsProps) {
  const moveUp = (index: number) => {
    if (index <= 0) return;
    const updated = [...sectionOrder];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setSectionOrder(updated);
  };

  const moveDown = (index: number) => {
    if (index >= sectionOrder.length - 1) return;
    const updated = [...sectionOrder];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setSectionOrder(updated);
  };

  return (
    <div className="border border-[#d0d7de] rounded-md bg-[#f6f8fa] p-3 space-y-2 text-xs">
      <div className="font-semibold text-[#1f2328] pb-1 border-b border-[#d0d7de]">
        Section Order
      </div>

      <div className="space-y-1">
        {sectionOrder.map((sectionId, idx) => {
          const label = SECTION_LABELS[sectionId] || sectionId;

          return (
            <div
              key={sectionId}
              className="flex items-center justify-between p-1.5 rounded bg-white border border-[#d0d7de] text-xs"
            >
              <span className="text-[#1f2328]">
                <span className="font-mono text-[#656d76] mr-1.5">#{idx + 1}</span>
                {label}
              </span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveUp(idx)}
                  disabled={idx === 0}
                  className="px-1.5 py-0.5 bg-white border border-[#d0d7de] rounded text-[10px] font-mono text-[#1f2328] hover:bg-[#f6f8fa] disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(idx)}
                  disabled={idx === sectionOrder.length - 1}
                  className="px-1.5 py-0.5 bg-white border border-[#d0d7de] rounded text-[10px] font-mono text-[#1f2328] hover:bg-[#f6f8fa] disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ▼
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
