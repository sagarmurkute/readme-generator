"use client";

import React from "react";
import { ReadmeBuilderConfig } from "@/types/config";

interface AboutEditorProps {
  config: ReadmeBuilderConfig;
  setConfig: React.Dispatch<React.SetStateAction<ReadmeBuilderConfig>>;
}

export function AboutEditor({ config, setConfig }: AboutEditorProps) {
  const { about } = config;

  return (
    <div className="space-y-3 text-xs font-sans">
      <div className="flex items-center justify-between border-b border-[#d0d7de] pb-2">
        <h4 className="font-bold text-sm text-[#1f2328]">About Me Section</h4>
        <label className="flex items-center gap-1.5 cursor-pointer text-[#656d76]">
          <input
            type="checkbox"
            checked={about.enabled}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                about: { ...prev.about, enabled: e.target.checked },
              }))
            }
            className="h-3.5 w-3.5 accent-[#0969da] rounded"
          />
          <span>Enable Section</span>
        </label>
      </div>

      <div>
        <label className="block text-[#656d76] font-semibold mb-1">Main Bio Paragraph</label>
        <textarea
          value={about.content}
          onChange={(e) =>
            setConfig((prev) => ({
              ...prev,
              about: { ...prev.about, content: e.target.value },
            }))
          }
          rows={3}
          className="w-full p-2.5 border border-[#d0d7de] rounded-md text-[#1f2328] text-xs font-sans focus:outline-none focus:border-[#0969da]"
        />
      </div>

      <div className="space-y-2 pt-1 border-t border-[#d0d7de]">
        <span className="block font-semibold text-[#1f2328]">Structured Highlights:</span>

        <div>
          <label className="block text-[11px] text-[#656d76]">🔭 Currently working on</label>
          <input
            type="text"
            value={about.workingOn || ""}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                about: { ...prev.about, workingOn: e.target.value },
              }))
            }
            placeholder="e.g. Next.js SaaS app & open-source libraries"
            className="w-full px-2.5 py-1 border border-[#d0d7de] rounded text-[#1f2328]"
          />
        </div>

        <div>
          <label className="block text-[11px] text-[#656d76]">🌱 Currently learning</label>
          <input
            type="text"
            value={about.learning || ""}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                about: { ...prev.about, learning: e.target.value },
              }))
            }
            placeholder="e.g. Rust, WebAssembly & LLM Fine-Tuning"
            className="w-full px-2.5 py-1 border border-[#d0d7de] rounded text-[#1f2328]"
          />
        </div>

        <div>
          <label className="block text-[11px] text-[#656d76]">👯 Looking to collaborate on</label>
          <input
            type="text"
            value={about.collaborateOn || ""}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                about: { ...prev.about, collaborateOn: e.target.value },
              }))
            }
            placeholder="e.g. Developer tools & open source React apps"
            className="w-full px-2.5 py-1 border border-[#d0d7de] rounded text-[#1f2328]"
          />
        </div>

        <div>
          <label className="block text-[11px] text-[#656d76]">💬 Ask me about</label>
          <input
            type="text"
            value={about.askMeAbout || ""}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                about: { ...prev.about, askMeAbout: e.target.value },
              }))
            }
            placeholder="e.g. React, Next.js, Node.js, System Architecture"
            className="w-full px-2.5 py-1 border border-[#d0d7de] rounded text-[#1f2328]"
          />
        </div>

        <div>
          <label className="block text-[11px] text-[#656d76]">⚡ Fun fact</label>
          <input
            type="text"
            value={about.funFact || ""}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                about: { ...prev.about, funFact: e.target.value },
              }))
            }
            placeholder="e.g. I build mechanical keyboards in my spare time!"
            className="w-full px-2.5 py-1 border border-[#d0d7de] rounded text-[#1f2328]"
          />
        </div>

        <div>
          <label className="block text-[11px] text-[#656d76]">📫 How to reach me</label>
          <input
            type="text"
            value={about.reachMe || ""}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                about: { ...prev.about, reachMe: e.target.value },
              }))
            }
            placeholder="e.g. Email me at sagar@example.com"
            className="w-full px-2.5 py-1 border border-[#d0d7de] rounded text-[#1f2328]"
          />
        </div>
      </div>
    </div>
  );
}
