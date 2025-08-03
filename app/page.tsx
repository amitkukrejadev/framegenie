"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import FeaturesSection from "@/app/components/FeaturesSection";
import HowItWorksSection from "@/app/components/HowItWorksSection";
import Footer from "@/app/components/Footer";
import DashboardLayout from "@/app/components/DashboardLayout";

export default function HomePage() {
  return (
    <DashboardLayout>
      {/* HERO SECTION */}
      <section className="w-full px-2 py-10 flex justify-center bg-dark-mid-tone">
        <div className="max-w-3xl text-center space-y-4 bg-dark-card-primary p-6 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300">
          <Image
            className="mx-auto"
            src="/android-chrome-512x512.png"
            alt="FrameGenie Logo"
            width={160}
            height={40}
            priority
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-text-primary">
            Welcome to FrameGenie 🎬✨
          </h1>
          <p className="text-base-content text-md sm:text-lg opacity-80 text-text-secondary">
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
              className="inline-flex items-center justify-center rounded-full h-11 px-6 text-sm font-medium border border-text-secondary text-text-secondary hover:bg-dark-bg-secondary"
            >
              Social Share Images
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="w-full px-4 py-10 bg-dark-mid-tone">
        <FeaturesSection />
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="w-full px-4 py-2 bg-dark-mid-tone">
        <HowItWorksSection />
      </section>

      {/* FOOTER */}
      <footer className="w-full px-4 py-8 bg-dark-mid-tone">
        <Footer />
      </footer>
    </DashboardLayout>
  );
}
