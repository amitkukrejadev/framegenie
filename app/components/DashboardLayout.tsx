"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useClerk, useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { User2 } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const menuLinks = [
    { href: "/", label: "Home Page" },
    { href: "/social-share", label: "Social Share" },
    { href: "/video-upload", label: "Video Upload" },
    { href: "/background-removal", label: "Background Removal" },
    { href: "/video-thumbnail", label: "Video Thumbnail" },
  ];

  const renderUserInfo = () => {
    if (!isLoaded) return <div className="text-gray-300">Loading...</div>;
    if (!isSignedIn || !user) {
      return (
        <Link
          href="/sign-in"
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
        >
          <MdOutlineEmail className="text-lg" /> Not signed in
        </Link>
      );
    }
    return (
      <div className="flex items-center gap-2 text-sm relative cursor-pointer">
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 hover:opacity-80 md:cursor-pointer"
        >
          <Image
            src={user.imageUrl || ""}
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-white font-medium hidden md:inline">
            {user.firstName} {user.lastName || ""}
          </span>
        </div>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute right-0 top-16 mt-2 w-32 bg-gray-800 border border-gray-700 rounded-lg shadow-md z-50 min-h-[80px] md:block hidden"
          >
            <Link
              href="/profile"
              onClick={() => setDropdownOpen(false)}
              className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
            >
              <User2 size={14} className="inline-block mr-2" /> Profile
            </Link>
            <button
              onClick={async () => {
                await signOut({ redirectUrl: "/sign-in" });
                setDropdownOpen(false);
                router.push("/sign-in");
              }}
              className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700"
            >
              <FiLogOut className="inline-block mr-2" /> Sign Out
            </button>
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen font-sans text-gray-300 bg-[oklch(0.4_0.013807_253.101)]">
      <header className="flex items-center justify-between px-6 py-4 bg-gray-700 bg-opacity-80 shadow-md">
        <div className="flex items-center gap-4">
          <Image
            src="/favicon.png"
            alt="FrameGenie Logo"
            width={80}
            height={80}
            className="object-contain"
          />
          <h2 className="text-xl font-semibold text-white cursor-pointer hover:opacity-80">
            FRAMEGENIE
          </h2>
          <nav className="hidden md:flex gap-3">
            {menuLinks.map(({ href, label }) => (
              <motion.div
                key={href}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <Link href={href}>
                  <button
                    className={`px-4 py-2 text-sm font-semibold rounded-lg ${
                      pathname === href ||
                      (href !== "/" && pathname.startsWith(href))
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    {label}
                  </button>
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-xl text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FiMenu />
          </button>
          {renderUserInfo()}
        </div>
      </header>
      {menuOpen && (
        <motion.nav
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden flex flex-col gap-2 px-6 py-4 bg-gray-700"
        >
          <div className="border-b border-gray-600 pb-2 mb-4"></div>
          {menuLinks.map(({ href, label }) => (
            <Link key={href} href={href}>
              <button
                onClick={() => setMenuOpen(false)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-semibold ${
                  pathname === href ||
                  (href !== "/" && pathname.startsWith(href))
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-600"
                }`}
              >
                {label}
              </button>
            </Link>
          ))}
          {isSignedIn && user && (
            <>
              <div className="border-t border-gray-600 pt-2 mt-4">
                <h2 className="text-sm font-medium text-white mb-2">Account</h2>
              </div>
              <Link href="/profile">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-left px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:bg-gray-600"
                >
                  <User2 size={14} className="inline-block mr-2" /> Profile
                </button>
              </Link>
              <button
                onClick={async () => {
                  await signOut({ redirectUrl: "/sign-in" });
                  setMenuOpen(false);
                  router.push("/sign-in");
                }}
                className="w-full text-left px-4 py-2 rounded-lg text-sm font-semibold text-red-400 hover:bg-gray-600"
              >
                <FiLogOut className="inline-block mr-2" /> Sign Out
              </button>
            </>
          )}
        </motion.nav>
      )}
      <main className="flex-1 w-full bg-[oklch(0.4_0.013807_253.101)] text-gray-300 p-6">
        {children}
      </main>
    </div>
  );
}
