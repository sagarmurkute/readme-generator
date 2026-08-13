"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface ReadmeWorkspaceProps {
  initialMarkdown: string;
  onRefetchGitHub?: () => void;
  onReset?: () => void;
}

export function ReadmeWorkspace({
  initialMarkdown,
  onReset,
}: ReadmeWorkspaceProps) {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMarkdown(initialMarkdown);
  }, [initialMarkdown]);

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
    <div className="w-full text-left space-y-3 font-sans">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between p-3 bg-[#f6f8fa] border border-[#d0d7de] rounded-xl gap-2 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#0969da] animate-pulse" />
          <span className="text-xs font-mono font-semibold text-[#1f2328]">
            Full Workspace Editor & Live GitHub Preview
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onReset && (
            <button
              onClick={onReset}
              className="px-3 py-1.5 bg-white border border-[#d0d7de] hover:bg-[#f6f8fa] text-[#1f2328] text-xs font-semibold rounded-md transition-colors"
            >
              Reset
            </button>
          )}

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-white border border-[#d0d7de] hover:bg-[#f6f8fa] text-[#1f2328] text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5"
          >
            <span>📋</span>
            <span>{copied ? "✓ Copied!" : "Copy Markdown"}</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-3.5 py-1.5 bg-[#0969da] hover:bg-[#0858b9] text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <span>📥</span>
            <span>Download README.md</span>
          </button>
        </div>
      </div>

      {/* Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        {/* LEFT PANEL: Markdown Editor */}
        <div className="border border-[#d0d7de] rounded-xl bg-white overflow-hidden shadow-2xs">
          <div className="flex items-center justify-between px-3 py-2 bg-[#f6f8fa] border-b border-[#d0d7de]">
            <span className="text-xs font-mono font-semibold text-[#1f2328]">
              Raw Markdown Code
            </span>
            <span className="text-[11px] font-mono text-[#656d76]">
              {markdown.length} chars
            </span>
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full min-h-[720px] max-h-[82vh] h-full p-4 font-mono text-xs text-[#1f2328] bg-white focus:outline-none resize-none leading-relaxed"
            spellCheck={false}
          />
        </div>

        {/* RIGHT PANEL: Live GitHub Preview */}
        <div className="border border-[#d0d7de] rounded-xl bg-white overflow-hidden shadow-2xs">
          <div className="flex items-center justify-between px-3 py-2 bg-[#f6f8fa] border-b border-[#d0d7de]">
            <span className="text-xs font-mono font-semibold text-[#1f2328]">
              Rendered Preview (GitHub Parser)
            </span>
            <span className="text-[11px] font-mono text-[#656d76]">
              HTML & Markdown Enabled
            </span>
          </div>

          <div className="p-6 min-h-[720px] max-h-[82vh] h-full overflow-y-auto bg-white font-sans text-sm text-[#1f2328] leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold text-[#1f2328] pb-2 border-b border-[#d0d7de] mt-2 mb-4">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-bold text-[#1f2328] pb-1.5 border-b border-[#d0d7de] mt-6 mb-3">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-semibold text-[#1f2328] mt-4 mb-2">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="my-2.5 text-[#1f2328] leading-relaxed">{children}</p>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0969da] hover:underline font-medium inline-block"
                  >
                    {children}
                  </a>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-3 rounded-lg border border-[#d0d7de]">
                    <table className="w-full border-collapse text-xs text-left">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-[#f6f8fa] text-[#1f2328] font-semibold border-b border-[#d0d7de]">
                    {children}
                  </thead>
                ),
                tbody: ({ children }) => (
                  <tbody className="divide-y divide-[#d0d7de] bg-white">
                    {children}
                  </tbody>
                ),
                th: ({ children }) => (
                  <th className="p-2.5 border-r border-[#d0d7de] last:border-r-0">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="p-2.5 border-r border-[#d0d7de] last:border-r-0 text-[#1f2328]">
                    {children}
                  </td>
                ),
                img: ({ src, alt, width, height, style }) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={src}
                    alt={alt || ""}
                    width={width}
                    height={height}
                    style={style}
                    className="max-w-full inline-block rounded my-1 shadow-2xs"
                  />
                ),
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

