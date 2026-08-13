"use client";

import React, { useState } from "react";
import { RepoAnalysisResult, GitHubUserProfile } from "@/types/github";

interface AnalysisOverviewProps {
  analysis: RepoAnalysisResult;
  profile: GitHubUserProfile;
}

export function AnalysisOverview({
  analysis,
  profile,
}: AnalysisOverviewProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full bg-zinc-50 border border-zinc-200 rounded-lg overflow-hidden transition-all mb-4 text-left">
      {/* Header Bar / Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-zinc-100 hover:bg-zinc-100/80 transition-colors font-heading text-xs font-semibold text-zinc-800"
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#ff6b00]" />
          <span>Repository Analysis Metrics ({analysis.totalAnalyzed} repos analyzed)</span>
        </div>
        <span className="text-zinc-500 font-mono text-xs">
          {isOpen ? "Hide metrics ▲" : "Show metrics ▼"}
        </span>
      </button>

      {/* Collapsible Content Body */}
      {isOpen && (
        <div className="p-4 sm:p-6 space-y-4">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-3 rounded border border-zinc-200">
              <span className="block text-xl font-bold font-heading text-zinc-900">
                {analysis.totalStars}
              </span>
              <span className="text-xs text-zinc-500 font-medium">
                ⭐ Total Stars
              </span>
            </div>

            <div className="bg-white p-3 rounded border border-zinc-200">
              <span className="block text-xl font-bold font-heading text-zinc-900">
                {analysis.totalForks}
              </span>
              <span className="text-xs text-zinc-500 font-medium">
                🍴 Total Forks
              </span>
            </div>

            <div className="bg-white p-3 rounded border border-zinc-200">
              <span className="block text-xl font-bold font-heading text-zinc-900">
                {analysis.topLanguages.length}
              </span>
              <span className="text-xs text-zinc-500 font-medium">
                💻 Languages Detected
              </span>
            </div>

            <div className="bg-white p-3 rounded border border-zinc-200">
              <span className="block text-xl font-bold font-heading text-zinc-900">
                {analysis.accountAgeYears} {analysis.accountAgeYears === 1 ? "yr" : "yrs"}
              </span>
              <span className="text-xs text-zinc-500 font-medium">
                📅 Account Age
              </span>
            </div>
          </div>

          {/* Top Languages breakdown */}
          {analysis.topLanguages.length > 0 && (
            <div className="pt-2">
              <h4 className="text-xs font-mono font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                Top Languages Share
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.topLanguages.slice(0, 6).map((stat) => (
                  <span
                    key={stat.language}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-zinc-200 text-xs text-zinc-800"
                  >
                    <span className="font-medium">{stat.language}</span>
                    <span className="text-zinc-400 font-mono text-[11px]">
                      {stat.percentage}%
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Oldest & Newest Repos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            {analysis.oldestRepo && (
              <div className="bg-white p-2.5 rounded border border-zinc-200">
                <span className="text-zinc-400 font-mono block">Oldest Repository</span>
                <a
                  href={analysis.oldestRepo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-zinc-900 hover:text-[#ff6b00] underline"
                >
                  {analysis.oldestRepo.name}
                </a>
              </div>
            )}

            {analysis.newestRepo && (
              <div className="bg-white p-2.5 rounded border border-zinc-200">
                <span className="text-zinc-400 font-mono block">Newest Repository</span>
                <a
                  href={analysis.newestRepo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-zinc-900 hover:text-[#ff6b00] underline"
                >
                  {analysis.newestRepo.name}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
