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
    <header className="w-full border-b border-[#D9D7D2] bg-[#F6F5F1] sticky top-0 z-50 font-sans">
      <div className="mx-auto flex h-14 max-w-[1700px] items-center justify-between px-4 sm:px-6">
        {/* Brand Logo & Editorial Title */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-sm text-[#171717] tracking-tight">
            <span className="w-6 h-6 rounded bg-[#171717] text-white flex items-center justify-center text-xs font-mono font-bold">
              R
            </span>
            <span className="font-semibold text-sm">README Generator</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-4 transition-colors ${
                    isActive
                      ? "text-[#171717] font-bold border-b-2 border-[#171717]"
                      : "text-[#6B6B6B] hover:text-[#171717]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions: GitHub & Support */}
        <div className="hidden md:flex items-center gap-4 text-xs">
          <a
            href={CREATOR_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-[#171717] hover:opacity-80 transition-opacity"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
            </svg>
            <span>GitHub</span>
          </a>

          <a
            href={CREATOR_CONFIG.buyMeACoffee}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-[#171717] hover:bg-black text-white text-xs font-medium rounded transition-colors flex items-center gap-1.5"
          >
            <span>☕ Support</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-1.5 border border-[#D9D7D2] rounded text-[#171717] text-xs font-semibold"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#D9D7D2] bg-[#F6F5F1] p-4 space-y-3 text-xs font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-[#171717] hover:font-bold"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-[#D9D7D2] flex items-center justify-between">
            <a
              href={CREATOR_CONFIG.github}
              target="_blank"
              rel="noreferrer"
              className="text-[#171717] font-semibold"
            >
              GitHub
            </a>
            <a
              href={CREATOR_CONFIG.buyMeACoffee}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 bg-[#171717] text-white rounded text-xs font-medium"
            >
              ☕ Support
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
