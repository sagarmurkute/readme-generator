"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CREATOR_CONFIG } from "@/lib/config/creator";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Builder" },
    { href: "/templates", label: "Templates" },
    { href: "/docs", label: "Docs" },
    { href: "/showcase", label: "Showcase" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="w-full border-b border-[#d0d7de] bg-white sticky top-0 z-50 font-sans">
      <div className="mx-auto flex h-12 max-w-[1700px] items-center justify-between px-3 sm:px-5">
        {/* Brand Logo & Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-1.5 font-bold text-sm text-[#1f2328]">
            <svg className="h-4 w-4 fill-current text-[#1f2328]" viewBox="0 0 16 16">
              <path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.244a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.244a2.25 2.25 0 0 0-1.758.843l-.244.305a.75.75 0 0 1-1.172 0l-.244-.305A2.25 2.25 0 0 0 5.003 13H.75a.75.75 0 0 1-.75-.75Zm1.5.75v9h3.503a3.75 3.75 0 0 1 2.997 1.492A3.75 3.75 0 0 1 11.006 11.5h3.494v-9h-3.494a2.25 2.25 0 0 0-2.256 2.25v6.5a.75.75 0 0 1-1.5 0v-6.5A2.25 2.25 0 0 0 4.997 2.5Z" />
            </svg>
            <span className="tracking-tight">README Generator</span>
          </Link>

          <nav className="hidden md:flex items-center gap-4 text-xs font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-3.5 transition-colors ${
                    isActive
                      ? "text-[#0969da] font-semibold border-b-2 border-[#0969da]"
                      : "text-[#656d76] hover:text-[#1f2328]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions: GitHub & Support */}
        <div className="hidden md:flex items-center gap-3 text-xs">
          <a
            href={CREATOR_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-[#1f2328] hover:text-[#0969da] transition-colors"
          >
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 16 16">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
            </svg>
            <span>GitHub</span>
          </a>

          <a
            href={CREATOR_CONFIG.buyMeACoffee}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 bg-[#FFDD00] hover:bg-[#e6c700] text-black font-semibold rounded-md transition-colors flex items-center gap-1 shadow-2xs"
          >
            <span>☕ Support</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-1.5 border border-[#d0d7de] rounded text-[#1f2328] text-xs font-semibold"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#d0d7de] bg-white p-3 space-y-2 text-xs font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-[#1f2328] hover:text-[#0969da]"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-[#d0d7de] flex items-center justify-between">
            <a
              href={CREATOR_CONFIG.github}
              target="_blank"
              rel="noreferrer"
              className="text-[#1f2328] font-semibold"
            >
              GitHub
            </a>
            <a
              href={CREATOR_CONFIG.buyMeACoffee}
              target="_blank"
              rel="noreferrer"
              className="px-2 py-0.5 bg-[#FFDD00] text-black rounded font-semibold"
            >
              ☕ Support
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
