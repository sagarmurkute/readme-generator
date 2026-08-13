"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { ReadmeBuilderConfig } from "@/types/config";
import { GitHubRepo, GitHubUserProfile, RepoAnalysisResult } from "@/types/github";

interface LivePreviewColumnProps {
  config: ReadmeBuilderConfig;
  repos: GitHubRepo[];
  markdown: string;
  profile: GitHubUserProfile | null;
  analysis: RepoAnalysisResult | null;
}

export function LivePreviewColumn({
  markdown,
}: LivePreviewColumnProps) {
  const [previewTab, setPreviewTab] = useState<"rendered" | "code">("rendered");
  const [viewportMode, setViewportMode] = useState<"desktop" | "mobile">("desktop");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy error:", err);
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([markdown], {
        type: "text/markdown;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "README.md");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  return (
    <div className="border border-[#d0d7de] rounded-xl bg-white overflow-hidden shadow-2xs font-sans h-full flex flex-col">
      {/* Top Action Header */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#f6f8fa] border-b border-[#d0d7de] shrink-0">
        {/* Rendered vs Markdown Tabs */}
        <div className="inline-flex rounded-lg p-0.5 border border-[#d0d7de] bg-white text-xs font-medium">
          <button
            type="button"
            onClick={() => setPreviewTab("rendered")}
            className={`px-3 py-1 rounded-md transition-colors ${
              previewTab === "rendered"
                ? "bg-white text-[#1f2328] font-semibold shadow-2xs border border-[#d0d7de]"
                : "text-[#656d76] hover:text-[#1f2328]"
            }`}
          >
            Preview
          </button>
          <button
            type="button"
            onClick={() => setPreviewTab("code")}
            className={`px-3 py-1 rounded-md transition-colors ${
              previewTab === "code"
                ? "bg-white text-[#1f2328] font-semibold shadow-2xs border border-[#d0d7de]"
                : "text-[#656d76] hover:text-[#1f2328]"
            }`}
          >
            Markdown
          </button>
        </div>

        {/* Action Buttons: Copy, Download & Viewport Icons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1 bg-white border border-[#d0d7de] hover:bg-[#f6f8fa] text-[#1f2328] text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5"
          >
            <span>📋</span>
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="px-3 py-1 bg-[#0969da] hover:bg-[#0858b9] text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <span>📥</span>
            <span>Download</span>
          </button>

          {/* Desktop vs Mobile Toggle */}
          <div className="hidden sm:inline-flex rounded-md p-0.5 border border-[#d0d7de] bg-white text-xs text-[#656d76] ml-1">
            <button
              type="button"
              onClick={() => setViewportMode("desktop")}
              className={`p-1 rounded ${
                viewportMode === "desktop" ? "bg-[#f6f8fa] text-[#0969da] font-bold" : "hover:text-[#1f2328]"
              }`}
              title="Desktop view"
            >
              💻
            </button>
            <button
              type="button"
              onClick={() => setViewportMode("mobile")}
              className={`p-1 rounded ${
                viewportMode === "mobile" ? "bg-[#f6f8fa] text-[#0969da] font-bold" : "hover:text-[#1f2328]"
              }`}
              title="Mobile view"
            >
              📱
            </button>
          </div>
        </div>
      </div>

      {/* Single Source of Truth README Output Container */}
      <div
        className={`p-6 min-h-[650px] max-h-[82vh] h-full overflow-y-auto bg-white transition-all ${
          viewportMode === "mobile" ? "max-w-md mx-auto border-x border-[#d0d7de]" : "w-full"
        }`}
      >
        {previewTab === "rendered" ? (
          <div className="markdown-body space-y-4 text-[#1f2328] font-sans leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        ) : (
          <textarea
            value={markdown}
            readOnly
            className="w-full h-full min-h-[500px] p-3 font-mono text-xs text-[#1f2328] bg-white focus:outline-none resize-none leading-relaxed border-none"
            spellCheck={false}
          />
        )}
      </div>
    </div>
  );
}
