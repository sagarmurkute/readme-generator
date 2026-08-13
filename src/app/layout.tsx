import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitHub README Generator",
  description: "Create a professional GitHub Profile README from your GitHub profile.",
  openGraph: {
    title: "GitHub README Generator",
    description: "Create a professional GitHub Profile README from your GitHub profile.",
    type: "website",
    siteName: "GitHub README Generator",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-[#1f2328] selection:bg-[#0969da]/20 selection:text-[#1f2328]">
        {children}
      </body>
    </html>
  );
}
