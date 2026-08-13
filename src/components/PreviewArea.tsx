"use client";

import React, { useState } from "react";
import { GitHubUserProfile, GitHubRepo, RepoAnalysisResult } from "@/types/github";
import { ReadmeBuilderConfig } from "@/types/config";
import { WorkflowNav, WorkflowStep } from "./WorkflowNav";
import { ProfileStepCard } from "./ProfileStepCard";
import { CustomizeStep } from "./CustomizeStep";
import { ReadmeWorkspace } from "./ReadmeWorkspace";

interface PreviewAreaProps {
  username: string;
  setUsername: (name: string) => void;
  isLoading: boolean;
  loadingStep: string;
  error: string | null;
  profile: GitHubUserProfile | null;
  repos: GitHubRepo[] | null;
  analysis: RepoAnalysisResult | null;
  markdown: string | null;
  config: ReadmeBuilderConfig;
  setConfig: React.Dispatch<React.SetStateAction<ReadmeBuilderConfig>>;
  onFetchGitHub: (e: React.FormEvent) => void;
  onRefetchGitHub: () => void;
  onReset: () => void;
}

export function PreviewArea({
  username,
  setUsername,
  isLoading,
  loadingStep,
  error,
  profile,
  repos,
  analysis,
  markdown,
  config,
  setConfig,
  onFetchGitHub,
  onRefetchGitHub,
  onReset,
}: PreviewAreaProps) {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>(1);

  const canNavigate = Boolean(profile && analysis);

  return (
    <section className="w-full pb-4">
      {/* 3-Stage Progress Navigation Bar */}
      <WorkflowNav
        currentStep={currentStep}
        setStep={setCurrentStep}
        canNavigate={canNavigate}
      />

      <div className="w-full max-w-[1700px] mx-auto px-2 sm:px-4">
        {/* STAGE 1: PROFILE STEP */}
        {currentStep === 1 && (
          <ProfileStepCard
            username={username}
            setUsername={setUsername}
            onFetch={onFetchGitHub}
            isLoading={isLoading}
            loadingStep={loadingStep}
            error={error}
            profile={profile}
            analysis={analysis}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {/* STAGE 2: CUSTOMIZE STEP */}
        {currentStep === 2 && profile && (
          <CustomizeStep
            config={config}
            setConfig={setConfig}
            repos={repos || []}
            markdown={markdown || ""}
            profile={profile}
            analysis={analysis}
            onReset={onReset}
            onProceedToEditor={() => setCurrentStep(3)}
          />
        )}

        {/* STAGE 3: PREVIEW & FULL EDITOR STEP */}
        {currentStep === 3 && profile && (
          <div className="space-y-4">
            <ReadmeWorkspace
              initialMarkdown={markdown || ""}
              onRefetchGitHub={onRefetchGitHub}
              onReset={onReset}
            />
          </div>
        )}
      </div>
    </section>
  );
}
