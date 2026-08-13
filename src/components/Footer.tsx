"use client";

import React from "react";
import Link from "next/link";
import { CREATOR_CONFIG } from "@/lib/config/creator";

export function Footer() {
  return (
    <footer className="w-full border-t border-[#D9D7D2] bg-[#F6F5F1] py-8 text-xs font-sans text-[#6B6B6B]">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 text-left">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-2">
          <div className="font-bold text-sm text-[#171717] flex items-center gap-1.5">
            <span>README Generator</span>
          </div>
          <p className="text-xs text-[#6B6B6B] max-w-sm leading-relaxed">
            Build a GitHub profile README you&apos;ll actually want to show. Designed as a modern digital document editor.
          </p>
          <div className="pt-1">
            <a
              href={CREATOR_CONFIG.buyMeACoffee}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1 bg-[#171717] text-white font-medium text-xs rounded hover:bg-black transition-colors"
            >
              <span>☕ Support this project</span>
            </a>
          </div>
        </div>

        {/* Product Column */}
        <div className="space-y-1.5">
          <h4 className="font-bold text-[#171717] text-xs uppercase tracking-wider">Product</h4>
          <ul className="space-y-1 text-xs">
            <li><Link href="/" className="hover:text-[#171717] transition-colors">Builder</Link></li>
            <li><Link href="/templates" className="hover:text-[#171717] transition-colors">Templates</Link></li>
            <li><Link href="/docs" className="hover:text-[#171717] transition-colors">Docs</Link></li>
            <li><Link href="/showcase" className="hover:text-[#171717] transition-colors">Showcase</Link></li>
          </ul>
        </div>

        {/* Resources Column */}
        <div className="space-y-1.5">
          <h4 className="font-bold text-[#171717] text-xs uppercase tracking-wider">Resources</h4>
          <ul className="space-y-1 text-xs">
            <li><a href={CREATOR_CONFIG.github} target="_blank" rel="noreferrer" className="hover:text-[#171717] transition-colors">GitHub Repository</a></li>
            <li><Link href="/about" className="hover:text-[#171717] transition-colors">About</Link></li>
            <li><Link href="/privacy" className="hover:text-[#171717] transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-[#171717] transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Creator Column */}
        <div className="space-y-1.5">
          <h4 className="font-bold text-[#171717] text-xs uppercase tracking-wider">Creator</h4>
          <ul className="space-y-1 text-xs">
            <li><a href={CREATOR_CONFIG.github} target="_blank" rel="noreferrer" className="hover:text-[#171717] transition-colors">GitHub (@sagarmurkute)</a></li>
            <li><a href={CREATOR_CONFIG.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#171717] transition-colors">LinkedIn</a></li>
            <li><a href={CREATOR_CONFIG.portfolio} target="_blank" rel="noreferrer" className="hover:text-[#171717] transition-colors">Portfolio</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 pt-6 mt-6 border-t border-[#D9D7D2] flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px]">
        <span>© {new Date().getFullYear()} {CREATOR_CONFIG.name}. Built for developers.</span>
        <span className="text-[#6B6B6B]">Minimal Digital Notebook Editor</span>
      </div>
    </footer>
  );
}
