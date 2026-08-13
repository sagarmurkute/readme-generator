"use client";

import React from "react";

export type WorkflowStep = 1 | 2 | 3;

interface WorkflowNavProps {
  currentStep: WorkflowStep;
  setStep: (step: WorkflowStep) => void;
  canNavigate: boolean;
}

export function WorkflowNav({
  currentStep,
  setStep,
  canNavigate,
}: WorkflowNavProps) {
  const steps: { id: WorkflowStep; title: string; subtitle: string }[] = [
    { id: 1, title: "Profile", subtitle: "Fetch your GitHub profile" },
    { id: 2, title: "Customize", subtitle: "Configure your README" },
    { id: 3, title: "Preview", subtitle: "Preview and download" },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-1 mb-1 font-sans">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-3 left-12 right-12 h-0.5 bg-[#d0d7de] -z-0" />

        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id || (step.id === 1 && canNavigate);
          const isDisabled = !canNavigate && step.id > 1;

          return (
            <button
              key={step.id}
              onClick={() => {
                if (!isDisabled) setStep(step.id);
              }}
              disabled={isDisabled}
              className={`flex items-center gap-1.5 bg-white px-2.5 z-10 ${
                isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              }`}
            >
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold transition-colors ${
                  isCompleted
                    ? "bg-[#0969da] text-white"
                    : isActive
                    ? "border-2 border-[#0969da] text-[#0969da] bg-white font-bold"
                    : "border-2 border-[#d0d7de] text-[#656d76] bg-white"
                }`}
              >
                {isCompleted ? "✓" : step.id}
              </div>

              <span
                className={`text-xs font-medium ${
                  isActive || isCompleted ? "text-[#0969da] font-bold" : "text-[#656d76]"
                }`}
              >
                {step.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
