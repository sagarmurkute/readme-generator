"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CREATOR_CONFIG } from "@/lib/config/creator";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1f2328] font-sans">
      <Navbar />

      <main className="flex-1 max-w-[1000px] w-full mx-auto px-4 sm:px-6 py-8 space-y-8 text-xs text-[#1f2328] leading-relaxed">
        {/* Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h1 className="text-2xl font-bold tracking-tight text-[#1f2328]">
            About GitHub README Generator
          </h1>
          <p className="text-xs text-[#656d76]">
            A developer tool built to help software engineers create beautiful, production-grade GitHub profile READMEs in minutes.
          </p>
        </div>

        {/* Product Purpose */}
        <div className="border border-[#d0d7de] rounded-xl bg-white p-6 space-y-4 shadow-2xs">
          <h2 className="text-sm font-bold text-[#1f2328] border-b border-[#d0d7de] pb-2">
            Why This Project Exists
          </h2>
          <p className="text-[#656d76]">
            Your GitHub Profile README is often the first impression recruiters, collaborators, and open-source communities see. However, manually assembling shields badges, stats endpoints, capsule banners, and clean markdown tables can take hours of trial and error.
          </p>
          <p className="text-[#656d76]">
            <strong>GitHub README Generator</strong> solves this by querying GitHub REST API metrics automatically, providing 80+ technology badges, and offering a pixel-perfect live preview with single-source-of-truth markdown generation.
          </p>
        </div>

        {/* Creator Section */}
        <div className="border border-[#d0d7de] rounded-xl bg-[#f6f8fa] p-6 space-y-3 shadow-2xs">
          <h2 className="text-sm font-bold text-[#1f2328]">Built by {CREATOR_CONFIG.name}</h2>
          <p className="text-[#656d76]">
            Designed and built for developers who appreciate clean tools, fast performance, and minimalist UI.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={CREATOR_CONFIG.github}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-[#1f2328] text-white rounded-md font-semibold hover:bg-black transition-colors"
            >
              GitHub (@sagarmurkute)
            </a>
            <a
              href={CREATOR_CONFIG.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-[#0077B5] text-white rounded-md font-semibold hover:bg-[#006097] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={CREATOR_CONFIG.buyMeACoffee}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-[#FFDD00] text-black rounded-md font-semibold hover:bg-[#e6c700] transition-colors"
            >
              ☕ Buy Me a Coffee
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            href="/"
            className="px-5 py-2 bg-[#0969da] text-white font-semibold text-xs rounded-md shadow-2xs hover:bg-[#0858b9] transition-colors inline-block"
          >
            Build Your README Now →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
