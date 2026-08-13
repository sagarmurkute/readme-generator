"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("getting-started");

  const docSections = [
    { id: "getting-started", label: "Getting Started" },
    { id: "github-data", label: "How GitHub Data Works" },
    { id: "building", label: "Building Your README" },
    { id: "sections", label: "Sections" },
    { id: "tech-stack", label: "Technology Stack" },
    { id: "analytics", label: "GitHub Analytics" },
    { id: "templates", label: "Templates" },
    { id: "markdown", label: "Markdown Output" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1f2328] font-sans">
      <Navbar />

      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Documentation Sidebar */}
          <aside className="md:col-span-3 border border-[#d0d7de] rounded-xl bg-[#f6f8fa] p-3 space-y-1 text-xs font-medium">
            <div className="font-bold text-[#1f2328] px-2 py-1 uppercase tracking-wider text-[10px]">
              Documentation
            </div>
            {docSections.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveSection(sec.id)}
                className={`w-full text-left px-3 py-1.5 rounded-md transition-colors ${
                  activeSection === sec.id
                    ? "bg-[#0969da] text-white font-semibold"
                    : "text-[#656d76] hover:bg-zinc-200 hover:text-[#1f2328]"
                }`}
              >
                {sec.label}
              </button>
            ))}
          </aside>

          {/* Documentation Content */}
          <article className="md:col-span-9 border border-[#d0d7de] rounded-xl bg-white p-6 space-y-6 text-xs text-[#1f2328] leading-relaxed">
            {activeSection === "getting-started" && (
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#1f2328]">🚀 Getting Started</h2>
                <p>
                  Welcome to <strong>GitHub README Generator</strong>! This tool allows software developers to create a production-grade GitHub Profile README in minutes.
                </p>
                <ol className="list-decimal pl-5 space-y-1 text-[#656d76]">
                  <li>Enter your GitHub username to automatically import public metrics & featured projects.</li>
                  <li>Customize sections, tech stack badges, and layout order.</li>
                  <li>Copy the generated Markdown or download <code className="bg-[#f6f8fa] px-1.5 py-0.5 rounded">README.md</code> directly.</li>
                  <li>Paste the file into a repository named after your GitHub username (e.g. <code className="bg-[#f6f8fa] px-1.5 py-0.5 rounded">username/username</code>).</li>
                </ol>
              </div>
            )}

            {activeSection === "github-data" && (
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#1f2328]">📊 How GitHub Data Works</h2>
                <p>
                  We query the public GitHub REST API (<code className="bg-[#f6f8fa] px-1.5 py-0.5 rounded">api.github.com/users/&lt;username&gt;</code>) to pre-populate your profile details, follower counts, star totals, and top repository statistics.
                </p>
                <p className="text-[#656d76]">
                  No passwords, access tokens, or private scopes are requested or stored.
                </p>
              </div>
            )}

            {activeSection === "building" && (
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#1f2328]">🛠️ Building Your README</h2>
                <p>
                  The Builder workspace provides a 3-column desktop layout with section selection, configuration controls, and a live GitHub markdown preview.
                </p>
                <p className="text-[#656d76]">
                  Your changes are automatically saved to your browser&apos;s local storage during your session.
                </p>
              </div>
            )}

            {activeSection === "sections" && (
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#1f2328]">📌 Available Sections</h2>
                <ul className="list-disc pl-5 space-y-1 text-[#656d76]">
                  <li><strong>Header & Banner</strong>: Custom greeting, status badge, capsule banners & avatar shapes.</li>
                  <li><strong>About Me</strong>: Structured bio bullet points (Working on, Learning, Collaborate, Contact).</li>
                  <li><strong>Tech Stack</strong>: Categorized badge library covering 80+ technologies.</li>
                  <li><strong>Social Links</strong>: GitHub, LinkedIn, Twitter/X, Instagram, YouTube, Discord, Email & Custom links.</li>
                  <li><strong>GitHub Analytics</strong>: Stats cards, top languages, streak stats, trophies & activity snake.</li>
                  <li><strong>Featured Projects</strong>: Top repository cards or markdown tables.</li>
                  <li><strong>Work Experience</strong>: Employment timeline.</li>
                  <li><strong>Sponsors & Support</strong>: Buy Me A Coffee, Ko-Fi, Patreon & GitHub Sponsors badges.</li>
                  <li><strong>Fun & Extras</strong>: Tech jokes & WakaTime statistics.</li>
                </ul>
              </div>
            )}

            {activeSection === "tech-stack" && (
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#1f2328]">🛠️ Technology Stack Library</h2>
                <p>
                  Choose from 80+ technology badges across Languages, Frontend, Backend, Mobile, Databases, Cloud, DevOps, AI/ML, Testing, Tools, and Design.
                </p>
                <p className="text-[#656d76]">
                  Badge styles include: <strong>For The Badge</strong>, <strong>Flat Square</strong>, <strong>Flat</strong>, and <strong>Plastic</strong>.
                </p>
              </div>
            )}

            {activeSection === "analytics" && (
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#1f2328]">📈 GitHub Analytics Widgets</h2>
                <p>
                  Integrate high-uptime analytics cards like GitHub Stats, Top Languages, Streak Stats (powered by demolab), and Profile Trophies.
                </p>
              </div>
            )}

            {activeSection === "templates" && (
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#1f2328]">⚡ Starter Templates</h2>
                <p>
                  Explore 8 real starter layout templates in the <a href="/templates" className="text-[#0969da] font-semibold underline">Template Gallery</a>.
                </p>
              </div>
            )}

            {activeSection === "markdown" && (
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#1f2328]">📝 Markdown Output</h2>
                <p>
                  All generated Markdown is validated, normalized, and formatted for 100% compatibility with GitHub&apos;s markdown sanitizer.
                </p>
              </div>
            )}

            {activeSection === "faq" && (
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#1f2328]">❓ Frequently Asked Questions</h2>
                <div className="space-y-2">
                  <div>
                    <strong className="block text-[#1f2328]">Where do I put the README.md file?</strong>
                    <p className="text-[#656d76]">Create a public GitHub repository with the exact same name as your GitHub username (e.g., <code className="bg-[#f6f8fa] px-1 py-0.5 rounded">username/username</code>) and commit <code className="bg-[#f6f8fa] px-1 py-0.5 rounded">README.md</code> to the root directory.</p>
                  </div>
                  <div>
                    <strong className="block text-[#1f2328]">Is this tool free?</strong>
                    <p className="text-[#656d76]">Yes! 100% free and open-source.</p>
                  </div>
                </div>
              </div>
            )}
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
