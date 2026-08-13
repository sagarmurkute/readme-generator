"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface MarkdownViewerProps {
  markdown: string;
}

export function MarkdownViewer({ markdown }: MarkdownViewerProps) {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"code" | "preview">("code");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy markdown:", err);
    }
  };

  return (
    <div className="w-full text-left">
      {/* Header bar with controls */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-zinc-200 mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("code")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium font-mono transition-colors ${
              viewMode === "code"
                ? "bg-zinc-900 text-white"
                : "bg-zinc-100 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200"
            }`}
          >
            Raw Markdown
          </button>
          <button
            onClick={() => setViewMode("preview")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium font-mono transition-colors ${
              viewMode === "preview"
                ? "bg-zinc-900 text-white"
                : "bg-zinc-100 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200"
            }`}
          >
            Rendered Preview
          </button>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0969da] hover:bg-[#0858b9] text-white font-medium rounded-md text-xs transition-colors shadow-2xs"
        >
          {copied ? (
            <>
              <svg
                className="h-3.5 w-3.5 fill-current text-white"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg
                className="h-3.5 w-3.5 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                />
              </svg>
              <span>Copy Markdown</span>
            </>
          )}
        </button>
      </div>

      {/* Content Container */}
      {viewMode === "code" ? (
        <div className="relative rounded-md bg-zinc-900 p-4 font-mono text-xs text-zinc-100 overflow-x-auto border border-zinc-800 leading-relaxed max-h-[500px]">
          <pre className="whitespace-pre-wrap break-words">{markdown}</pre>
        </div>
      ) : (
        <div className="rounded-md bg-white p-6 font-sans text-sm text-zinc-800 border border-zinc-200 overflow-x-auto max-h-[500px] leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
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
      )}
    </div>
  );
}

