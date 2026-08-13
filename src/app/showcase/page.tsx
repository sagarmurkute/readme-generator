"use client";

import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ShowcasePage() {
  const showcaseItems = [
    {
      title: "Full-Stack Engineer Showcase",
      template: "Full Stack Developer",
      author: "@sagarmurkute",
      description: "Complete showcase featuring animated capsule header banner, bio bullet points, grouped tech stack, stats cards, and project cards.",
      markdown: `<div align="center">\n\n![Header Banner](https://capsule-render.vercel.app/api?type=waving&color=auto&height=180&section=header&text=Sagar%20Murkute&fontSize=40&animation=fadeIn)\n\n# Hi there, I'm Sagar Murkute 👋\n\n![Status](https://img.shields.io/badge/Status-%F0%9F%9F%A2%20Open%20for%20work-0969da?style=flat-square)\n\n</div>\n\n## 👨‍💻 About Me\n\nFull stack developer building modern web applications and developer tooling.\n\n- 🔭 Currently working on: Scalable Web Tools\n- 🌱 Currently learning: Next.js 16 & Microservices\n\n## 🛠️ Tech Stack\n\n### Languages\n<div align="left">\n[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://javascript.info)\n</div>\n\n### Frontend\n<div align="left">\n[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev) [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)\n</div>\n`,
    },
    {
      title: "Minimalist Developer Showcase",
      template: "Minimalist Clean",
      author: "@alexvance",
      description: "Clean typography focusing strictly on bio, core technology badges, and clean markdown project table.",
      markdown: `# Hello, I'm Alex Vance 👋\n\nSoftware Engineer focused on software design, code elegance, and high-performance systems.\n\n## 🛠️ Tech Stack\n\n<div align="left">\n[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org) [![Go](https://img.shields.io/badge/Go-00ADD8?style=flat-square&logo=go&logoColor=white)](https://go.dev) [![Rust](https://img.shields.io/badge/Rust-000000?style=flat-square&logo=rust&logoColor=white)](https://rust-lang.org)\n</div>\n\n## ⭐ Featured Projects\n\n| Project | Description | Language | Stars |\n| :--- | :--- | :--- | :---: |\n| [**FastDB**](https://github.com) | High-speed key value store in Rust | \`Rust\` | ⭐ 124 |\n`,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1f2328] font-sans">
      <Navbar />

      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-[#1f2328]">
            README Showcase
          </h1>
          <p className="text-xs text-[#656d76]">
            Curated profile README layouts built with GitHub README Generator.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {showcaseItems.map((item, idx) => (
            <div
              key={idx}
              className="border border-[#d0d7de] rounded-xl bg-white overflow-hidden shadow-2xs flex flex-col justify-between"
            >
              <div className="p-4 bg-[#f6f8fa] border-b border-[#d0d7de] flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#1f2328]">{item.title}</h3>
                  <span className="text-xs text-[#656d76]">by {item.author}</span>
                </div>
                <span className="text-[10px] font-semibold text-[#0969da] bg-white border border-[#d0d7de] px-2 py-0.5 rounded">
                  {item.template}
                </span>
              </div>

              <div className="p-4 max-h-72 overflow-y-auto bg-white border-b border-[#d0d7de] text-xs leading-relaxed font-sans">
                <div className="markdown-body">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {item.markdown}
                  </ReactMarkdown>
                </div>
              </div>

              <div className="p-3 bg-white flex items-center justify-between">
                <p className="text-xs text-[#656d76] truncate max-w-xs">{item.description}</p>
                <Link
                  href="/"
                  className="px-3.5 py-1.5 bg-[#0969da] hover:bg-[#0858b9] text-white text-xs font-semibold rounded-md shadow-2xs transition-colors shrink-0"
                >
                  Create yours →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
