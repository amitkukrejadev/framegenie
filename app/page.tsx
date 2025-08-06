"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import HomeSections from "@/app/components/HomeSections";
import HomeExtras from "@/app/components/HomeExtras"; // New import
import Footer from "@/app/components/Footer";
import DashboardLayout from "@/app/components/DashboardLayout";

export default function HomePage() {
  return (
    <DashboardLayout>
      {/* HERO SECTION */}
      <section className="w-full px-2 py-10 flex justify-center bg-[oklch(0.4_0.013807_253.101)]">
        <div className="max-w-3xl text-center space-y-4 bg-gray-800 p-6 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300">
          <Image
            className="mx-auto"
            src="/android-chrome-512x512.png"
            alt="FrameGenie Logo"
            width={160}
            height={40}
            priority
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-white">
            Welcome to FrameGenie 🎬✨
          </h1>
          <p className="text-md sm:text-lg opacity-80 text-gray-300">
            Seamlessly upload, manage, and generate stunning video frames using
            AI. Turn your imagination into shareable magic in just a few clicks.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/video-upload"
              className="inline-flex items-center justify-center rounded-full h-11 px-6 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
            >
              Start Generating Frames
            </Link>
            <Link
              href="/social-share"
              className="inline-flex items-center justify-center rounded-full h-11 px-6 text-sm font-medium border border-gray-300 text-gray-300 hover:bg-gray-700"
            >
              Social Share Images
            </Link>
          </div>
        </div>
      </section>

      {/* HOME SECTIONS */}
      <section className="w-full px-4 py-2 bg-[oklch(0.4_0.013807_253.101)]">
        <HomeSections />
      </section>

      {/* HOME EXTRAS */}
      <section className="w-full px-4 py-2 bg-[oklch(0.4_0.013807_253.101)]">
        <HomeExtras />
      </section>

      <footer className="w-full px-4 py-8 bg-[oklch(0.4_0.013807_253.101)]">
        <Footer />
      </footer>
    </DashboardLayout>
  );
}
