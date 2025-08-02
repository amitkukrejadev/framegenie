"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useClerk, useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation"; // Added useRouter
import { FiLogOut, FiMenu } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { Sun, Moon, User2 } from "lucide-react";
import Image from "next/image"; // Import Image component

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const pathname = usePathname();
  const router = useRouter(); // Added for redirect
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState("dark"); // Default to dark

  useEffect(() => {
    if (isLoaded) {
      document.documentElement.setAttribute("data-theme", theme);
      void document.documentElement.offsetHeight; // Trigger reflow
    }
  }, [theme, isLoaded]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    console.log("Switching to theme:", next);
  };

  const menuLinks = [
    { href: "/", label: "Home Page" },
    { href: "/social-share", label: "Social Share" },
    { href: "/video-upload", label: "Video Upload" },
    { href: "/background-removal", label: "Background Removal" },
    { href: "/video-thumbnail", label: "Video Thumbnail" },
  ];

  const renderUserInfo = () => {
    if (!isLoaded) return <div>Loading...</div>; // Show loading state
    if (!isSignedIn || !user) {
      return (
        <Link
          href="/sign-in"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600"
        >
          <MdOutlineEmail className="text-lg" /> Not signed in
        </Link>
      );
    }
    return (
      <div className="flex items-center gap-2 text-sm relative cursor-pointer">
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 hover:opacity-80"
        >
          <Image
            src={user.imageUrl || ""}
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-gray-800 font-medium">
            {user.firstName} {user.lastName || ""}
          </span>
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-md z-50">
            <Link
              href="/profile"
              onClick={() => setDropdownOpen(false)}
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
            >
              <User2 size={14} className="inline-block mr-2" /> Profile
            </Link>
            <button
              onClick={async () => {
                await signOut({ redirectUrl: "/sign-in" }); // Added redirect
                setDropdownOpen(false);
                router.push("/sign-in"); // Fallback redirect
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
            >
              <FiLogOut className="inline-block mr-2" /> Sign Out
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen font-sans transition-colors duration-300">
      <header className="flex items-center justify-between px-6 py-4 bg-gray-100 shadow-md transition-colors duration-300">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold tracking-wide">🎥 FrameGenie</h1>
          <nav className="hidden md:flex gap-3">
            {menuLinks.map(({ href, label }) => (
              <Link key={href} href={href}>
                <button
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
                    pathname === href
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {label}
                </button>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4 relative">
          <button
            onClick={toggleTheme}
            className="bg-gray-200 px-3 py-1 text-xs rounded-full hover:scale-105 transition-transform"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            className="md:hidden text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FiMenu />
          </button>
          {renderUserInfo()}
        </div>
      </header>
      {menuOpen && (
        <nav className="md:hidden flex flex-col gap-2 px-6 py-4 bg-gray-100">
          {menuLinks.map(({ href, label }) => (
            <Link key={href} href={href}>
              <button
                onClick={() => setMenuOpen(false)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  pathname === href
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {label}
              </button>
            </Link>
          ))}
        </nav>
      )}
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}
