"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser, useClerk, UserButton } from "@clerk/nextjs";
import { FiLogOut } from "react-icons/fi";
import './globals.css'; // ✅ This connects Tailwind

export default function HomePage() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  return (
    <div className="min-h-screen flex flex-col font-sans text-sm text-gray-100 bg-[#1e1e2f]">
      {/* Topbar */}
      <header className="w-full flex justify-between items-center px-6 py-4 bg-[#13131f] shadow-md">
        <h1 className="text-2xl font-bold tracking-wide">🎥 FrameGenie</h1>
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <>
              {/* Clerk Profile Icon & Name */}
              <div className="flex items-center gap-2 text-gray-300">
                <UserButton afterSignOutUrl="/" />
                <span>{user?.firstName || "User"}</span>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 text-red-500 hover:text-red-700 border border-red-500 hover:border-red-700 px-4 py-2 rounded-lg"
              >
                <FiLogOut />
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <Link href="/sign-in">
                <button className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-700 text-white">
                  Login
                </button>
              </Link>
              <Link href="/sign-up">
                <button className="text-sm font-medium px-4 py-2 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-700 hover:text-white">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-[#13131f] p-4">
          <nav className="space-y-4 mt-6">
            <Link href="/">
              <button className="w-full text-left px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                Home Page
              </button>
            </Link>
            <Link href="/social-share">
              <button className="w-full text-left px-4 py-2 rounded-lg bg-transparent hover:bg-gray-700">
                Social Share
              </button>
            </Link>
            <Link href="/video-upload">
              <button className="w-full text-left px-4 py-2 rounded-lg bg-transparent hover:bg-gray-700">
                Video Upload
              </button>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-10">
          <div className="w-full max-w-3xl text-center space-y-8 bg-[#25253a] p-8 rounded-2xl shadow-2xl">
            <Image
              className="mx-auto"
              src="/logo.svg"
              alt="FrameGenie Logo"
              width={200}
              height={40}
              priority
            />
            <h1 className="text-4xl font-bold text-white">
              Welcome to FrameGenie 🎬✨
            </h1>
            <p className="text-gray-400 text-lg">
              Seamlessly upload, manage, and generate stunning video frames
              using AI. Turn your imagination into shareable magic in just a few
              clicks.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/video-upload"
                className="inline-flex items-center justify-center rounded-full h-11 px-6 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
              >
                Start Generating Frames
              </Link>
              <Link
                href="/social-share"
                className="inline-flex items-center justify-center rounded-full h-11 px-6 text-sm font-medium border border-gray-500 hover:bg-gray-700 hover:text-white"
              >
                Social Share Images
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
