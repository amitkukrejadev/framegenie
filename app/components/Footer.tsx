"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-6 py-8 bg-base-300 dark:bg-dark-bg-primary text-base-content dark:text-gray-400 text-center transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-3">
        {/* Link Navigation */}
        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/video-upload" className="hover:underline">
            Video-Upload
          </Link>
          <Link href="/social-share" className="hover:underline">
            Social Share
          </Link>
          <Link href="/profile" className="hover:underline">
            Profile
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/help" className="hover:underline">
            Help
          </Link>
        </div>

        {/* Footer Text */}
        <p className="text-xs opacity-70">
          © {new Date().getFullYear()} FrameGenie. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
