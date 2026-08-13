"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1f2328] font-sans">
      <Navbar />

      <main className="flex-1 max-w-[900px] w-full mx-auto px-4 sm:px-6 py-8 space-y-4 text-xs text-[#1f2328] leading-relaxed">
        <h1 className="text-2xl font-bold tracking-tight text-[#1f2328]">Privacy Policy</h1>
        <p className="text-[#656d76]">Last updated: August 13, 2026</p>

        <div className="space-y-3 pt-2">
          <h2 className="text-sm font-bold text-[#1f2328]">1. Data Collection</h2>
          <p className="text-[#656d76]">
            GitHub README Generator processes publicly accessible data fetched via the official GitHub REST API (<code className="bg-[#f6f8fa] px-1 py-0.5 rounded">api.github.com</code>). We do not collect private data, access tokens, or personal identifiers.
          </p>

          <h2 className="text-sm font-bold text-[#1f2328]">2. Local Storage</h2>
          <p className="text-[#656d76]">
            Your current builder configuration is stored locally in your browser&apos;s <code className="bg-[#f6f8fa] px-1 py-0.5 rounded">localStorage</code> to enable session recovery. You can reset or clear your browser storage at any time.
          </p>

          <h2 className="text-sm font-bold text-[#1f2328]">3. Third-Party Services</h2>
          <p className="text-[#656d76]">
            Generated README badges and statistics utilize public open-source endpoints (e.g. Shields.io, GitHub Readme Stats, Demolab Streak Stats, Capsule Render).
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
