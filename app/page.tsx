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
      <section className="w-full px-4 py-10 flex justify-center bg-base-100 dark:bg-dark-bg-primary">
        <div className="max-w-3xl text-center space-y-6 bg-base-200 dark:bg-dark-card-primary p-6 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300">
          <Image
            className="mx-auto"
            src="/logo.svg"
            alt="FrameGenie Logo"
            width={180}
            height={40}
            priority
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-base-content dark:text-white">
            Welcome to FrameGenie 🎬✨
          </h1>
          <p className="text-base-content dark:text-gray-300 text-md sm:text-lg opacity-80">
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
              className="inline-flex items-center justify-center rounded-full h-11 px-6 text-sm font-medium border border-base-content text-base-content hover:bg-base-300 dark:border-gray-500 dark:text-gray-100"
            >
              Social Share Images
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="w-full px-4 py-10 bg-base-100 dark:bg-dark-bg-primary">
        <FeaturesSection />
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="w-full px-4 py-10 bg-base-200 dark:bg-dark-bg-secondary">
        <HowItWorksSection />
      </section>

      {/* FOOTER */}
      <footer className="w-full px-4 py-8 bg-base-100 dark:bg-dark-bg-primary">
        <Footer />
      </footer>
    </DashboardLayout>
  );
}
