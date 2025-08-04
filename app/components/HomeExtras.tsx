"use client";

import React from "react";
import { CheckCircle2, Brain, Share2 } from "lucide-react";

export default function HomeExtras() {
  return (
    <section className="px-6 py-8 bg-[oklch(0.4_0.013807_253.101)] text-white transition-colors duration-300">
      {/* Why FrameGenie Section */}
      <div className="max-w-6xl mx-auto text-center space-y-6 mb-12">
        <h2 className="text-3xl font-bold">Why FrameGenie?</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-gray-800 shadow-md text-left">
            <div className="mb-4">
              <CheckCircle2 className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
            <p className="text-sm opacity-80">
              Upload and edit videos with a simple interface in just a few
              clicks.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-800 shadow-md text-left">
            <div className="mb-4">
              <Brain className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
            <p className="text-sm opacity-80">
              Advanced AI enhances your frames for stunning results
              automatically.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-800 shadow-md text-left">
            <div className="mb-4">
              <Share2 className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Share Anywhere</h3>
            <p className="text-sm opacity-80">
              Export and share your creations on any platform with ease.
            </p>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="max-w-6xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-1 gap-4">
          <div className="p-6 rounded-2xl bg-gray-800 shadow-md text-left">
            <h3 className="text-lg font-semibold mb-2">
              How does the AI work?
            </h3>
            <p className="text-sm opacity-80">
              Our AI analyzes your video and enhances key frames using advanced
              algorithms.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-800 shadow-md text-left">
            <h3 className="text-lg font-semibold mb-2">Is it free to use?</h3>
            <p className="text-sm opacity-80">
              Basic features are free, with premium options available for more
              power.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-800 shadow-md text-left">
            <h3 className="text-lg font-semibold mb-2">
              Can I share my videos?
            </h3>
            <p className="text-sm opacity-80">
              Yes, download your frames and share them on any social platform!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
