"use client";

import React from "react";
import { GitHubUserProfile, RepoAnalysisResult } from "@/types/github";

interface ProfileStepCardProps {
  username: string;
  setUsername: (name: string) => void;
  onFetch: (e: React.FormEvent) => void;
  isLoading: boolean;
  loadingStep: string;
  error: string | null;
  profile: GitHubUserProfile | null;
  analysis: RepoAnalysisResult | null;
  onNext: () => void;
}

export function ProfileStepCard({
  username,
  setUsername,
  onFetch,
  isLoading,
  loadingStep,
  error,
  profile,
  analysis,
  onNext,
}: ProfileStepCardProps) {
  return (
    <div className="w-full max-w-lg mx-auto text-left space-y-4 my-4">
      {/* Centered Username Form */}
      <div className="bg-white border border-[#d0d7de] rounded-md p-5 shadow-2xs">
        <h2 className="text-sm font-semibold text-[#1f2328] mb-1">
          Connect GitHub Profile
        </h2>
        <p className="text-xs text-[#656d76] mb-4">
          Enter a GitHub handle to fetch public repositories and pre-populate your profile README.
        </p>

        <form onSubmit={onFetch} className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-xs font-mono text-[#656d76]">
                github.com/
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                disabled={isLoading}
                className="w-full pl-24 pr-3 py-1.5 bg-white border border-[#d0d7de] rounded-md text-xs font-mono text-[#1f2328] placeholder-[#656d76] focus:outline-none focus:border-[#0969da] disabled:bg-[#f6f8fa]"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-3.5 py-1.5 bg-[#0969da] hover:bg-[#0858b9] text-white font-medium rounded-md text-xs transition-colors flex items-center gap-1.5 whitespace-nowrap disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <div className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Fetching...</span>
                </>
              ) : (
                <span>Fetch Profile</span>
              )}
            </button>
          </div>

          {error && (
            <div className="p-2.5 rounded bg-red-50 border border-red-200 text-red-700 text-xs">
              {error}
            </div>
          )}
        </form>
      </div>

      {/* Loading Progress */}
      {isLoading && (
        <div className="p-4 text-center border border-[#d0d7de] rounded-md bg-[#f6f8fa]">
          <div className="h-5 w-5 rounded-full border-2 border-[#d0d7de] border-t-[#0969da] animate-spin mx-auto mb-2" />
          <p className="text-xs text-[#656d76] font-mono">
            {loadingStep || "Fetching GitHub profile data..."}
          </p>
        </div>
      )}

      {/* Small Profile Preview Card */}
      {!isLoading && profile && analysis && (
        <div className="bg-[#f6f8fa] border border-[#d0d7de] rounded-md p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#656d76]">
            <span className="font-mono text-emerald-700 font-semibold">
              ✓ Profile Fetched
            </span>
            <span className="font-mono">{profile.public_repos} public repos</span>
          </div>

          <div className="flex items-start gap-3 pt-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.avatar_url}
              alt={profile.login}
              className="h-12 w-12 rounded-full border border-[#d0d7de] shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-sm text-[#1f2328] truncate">
                {profile.name || profile.login}
              </h3>
              <p className="text-xs font-mono text-[#0969da]">
                @{profile.login}
              </p>
              {profile.bio && (
                <p className="text-xs text-[#656d76] mt-1 line-clamp-2">
                  {profile.bio}
                </p>
              )}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-[#d0d7de] text-xs font-mono text-[#656d76]">
            <span>⭐ {analysis.totalStars} stars</span>
            <span>🍴 {analysis.totalForks} forks</span>
            <span>👥 {profile.followers} followers</span>
          </div>

          <button
            onClick={onNext}
            className="w-full py-2 bg-[#1f2328] hover:bg-black text-white font-medium rounded-md text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Continue to Customize →</span>
          </button>
        </div>
      )}
    </div>
  );
}
