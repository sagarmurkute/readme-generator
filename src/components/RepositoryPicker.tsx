"use client";

import React from "react";
import { GitHubRepo } from "@/types/github";

interface RepositoryPickerProps {
  repos: GitHubRepo[];
  selectedRepoIds: number[];
  onToggleRepo: (repoId: number) => void;
}

export function RepositoryPicker({
  repos,
  selectedRepoIds,
  onToggleRepo,
}: RepositoryPickerProps) {
  if (!repos || repos.length === 0) {
    return (
      <p className="text-xs text-[#656d76] italic">
        No public repositories available to select.
      </p>
    );
  }

  return (
    <div className="space-y-1.5 text-xs">
      <div className="flex items-center justify-between text-[#656d76]">
        <span>Select Repositories</span>
        <span className="font-mono text-[11px]">{selectedRepoIds.length} selected</span>
      </div>

      <div className="max-h-56 overflow-y-auto space-y-1 p-1 border border-[#d0d7de] rounded bg-[#f6f8fa]">
        {repos.map((repo) => {
          const isSelected = selectedRepoIds.includes(repo.id);

          return (
            <label
              key={repo.id}
              className={`flex items-start gap-2 p-1.5 rounded border cursor-pointer ${
                isSelected
                  ? "bg-white border-[#0969da] text-[#1f2328] font-medium"
                  : "bg-white border-[#d0d7de] text-[#656d76] hover:border-[#656d76]"
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggleRepo(repo.id)}
                className="h-3.5 w-3.5 accent-[#0969da] rounded mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono font-semibold truncate text-[#1f2328]">
                    {repo.name}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#656d76]">
                    {repo.language && <span>{repo.language}</span>}
                    <span>⭐ {repo.stargazers_count}</span>
                  </div>
                </div>
                {repo.description && (
                  <p className="text-[11px] text-[#656d76] truncate">
                    {repo.description}
                  </p>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
