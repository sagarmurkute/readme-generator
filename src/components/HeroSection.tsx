"use client";

import React from "react";

export function HeroSection() {
  return (
    <section className="w-full text-center pt-8 pb-4 px-4 font-sans max-w-3xl mx-auto space-y-3">
      <div className="inline-block px-3 py-1 bg-[#EFEEE9] border border-[#D9D7D2] text-[#171717] rounded-full text-xs font-mono font-medium">
        Digital Document Editor for GitHub
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#171717]">
        Create your GitHub README
      </h1>
      <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-xl mx-auto leading-relaxed">
        Build a beautiful, production-ready GitHub Profile README in a modern digital notebook workspace.
      </p>
    </section>
  );
}
