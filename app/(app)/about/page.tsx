"use client";

import React from "react";
import DashboardLayout from "@/app/components/DashboardLayout";
import Footer from "@/app/components/Footer";

export default function AboutPage() {
  return (
    <DashboardLayout>
      <section className="w-full px-4 py-10 bg-base-100 dark:bg-dark-bg-primary text-base-content dark:text-text-primary">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <h1 className="text-3xl font-bold">About FrameGenie</h1>
          <p className="text-lg opacity-80">
            FrameGenie is built with love by creators for creators. Our mission
            is to simplify the process of turning your videos into impactful
            visual content using the power of AI.
          </p>
          <p className="text-sm opacity-70">
            We’re constantly evolving and appreciate feedback. Thank you for
            being a part of our journey.
          </p>
        </div>
      </section>
      <footer className="w-full px-4 py-8 bg-[oklch(0.4_0.013807_253.101)]">
        <Footer />
      </footer>
    </DashboardLayout>
  );
}
