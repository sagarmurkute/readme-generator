"use client";

import React from "react";
import { ReadmeBuilderConfig } from "@/types/config";
import { GitHubRepo, GitHubUserProfile, RepoAnalysisResult } from "@/types/github";
import { CustomizeWorkspace } from "./builder/CustomizeWorkspace";

interface CustomizeStepProps {
  config: ReadmeBuilderConfig;
  setConfig: React.Dispatch<React.SetStateAction<ReadmeBuilderConfig>>;
  repos: GitHubRepo[];
  markdown: string;
  profile: GitHubUserProfile | null;
  analysis: RepoAnalysisResult | null;
  onReset: () => void;
  onProceedToEditor: () => void;
}

export function CustomizeStep({
  config,
  setConfig,
  repos,
  markdown,
  profile,
  analysis,
  onReset,
  onProceedToEditor,
}: CustomizeStepProps) {
  return (
    <CustomizeWorkspace
      config={config}
      setConfig={setConfig}
      repos={repos}
      markdown={markdown}
      profile={profile}
      analysis={analysis}
      onReset={onReset}
      onProceedToEditor={onProceedToEditor}
    />
  );
}
