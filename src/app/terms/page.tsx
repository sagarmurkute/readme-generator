"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1f2328] font-sans">
      <Navbar />

      <main className="flex-1 max-w-[900px] w-full mx-auto px-4 sm:px-6 py-8 space-y-4 text-xs text-[#1f2328] leading-relaxed">
        <h1 className="text-2xl font-bold tracking-tight text-[#1f2328]">Terms of Service</h1>
        <p className="text-[#656d76]">Last updated: August 13, 2026</p>

        <div className="space-y-3 pt-2">
          <h2 className="text-sm font-bold text-[#1f2328]">1. Acceptance of Terms</h2>
          <p className="text-[#656d76]">
            By using GitHub README Generator, you agree to use the service in compliance with GitHub&apos;s Terms of Service and API Guidelines.
          </p>

          <h2 className="text-sm font-bold text-[#1f2328]">2. Use of Generated Content</h2>
          <p className="text-[#656d76]">
            All generated Markdown content belongs to you. You are free to use, modify, and distribute the generated README.md files for personal or commercial projects.
          </p>

          <h2 className="text-sm font-bold text-[#1f2328]">3. Disclaimer</h2>
          <p className="text-[#656d76]">
            The service is provided &quot;as is&quot; without warranties of any kind.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
