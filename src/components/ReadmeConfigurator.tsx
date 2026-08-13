"use client";

import React from "react";
import { ReadmeBuilderConfig } from "@/types/config";
import { GitHubRepo } from "@/types/github";
import { CustomizeStep } from "./CustomizeStep";

interface ReadmeConfiguratorProps {
  config: ReadmeBuilderConfig;
  setConfig: React.Dispatch<React.SetStateAction<ReadmeBuilderConfig>>;
  repos?: GitHubRepo[];
  markdown?: string;
  onGenerate?: () => void;
  onReset?: () => void;
}

export function ReadmeConfigurator({
  config,
  setConfig,
  repos = [],
  markdown = "",
  onGenerate = () => {},
  onReset = () => {},
}: ReadmeConfiguratorProps) {
  return (
    <CustomizeStep
      config={config}
      setConfig={setConfig}
      repos={repos}
      markdown={markdown}
      profile={null}
      analysis={null}
      onReset={onReset}
      onProceedToEditor={onGenerate}
    />
  );
}
