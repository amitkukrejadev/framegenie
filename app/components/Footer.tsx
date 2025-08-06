import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-6 py-8 bg-gray-800 text-gray-100 text-center transition-colors duration-300 border-0 rounded-2xl">
      <div className="max-w-4xl mx-auto space-y-3">
        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
          <Link href="/profile" className="hover:underline">
            Profile
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact Us
          </Link>
          <Link href="/help" className="hover:underline">
            Help
          </Link>
        </div>
        <p className="text-xs opacity-70">
          © {new Date().getFullYear()} FrameGenie. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
