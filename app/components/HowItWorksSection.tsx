"use client";

import React from "react";
import { PlayCircle, UploadCloud, Wand2 } from "lucide-react";

const steps = [
  {
    icon: (
      <UploadCloud className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
    ),
    title: "Upload Video",
    description: "Drag and drop or choose your video file to get started.",
  },
  {
    icon: <Wand2 className="h-6 w-6 text-purple-500 dark:text-purple-400" />,
    title: "AI Processing",
    description:
      "Our AI processes your video to extract and enhance key frames.",
  },
  {
    icon: <PlayCircle className="h-6 w-6 text-red-500 dark:text-red-400" />,
    title: "Preview & Share",
    description: "Download the output or share it directly on social media.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="px-6 py-16 bg-base-200 dark:bg-dark-bg-secondary text-base-content dark:text-text-primary transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center space-y-10">
        <h2 className="text-3xl font-bold">How It Works</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-base-100 dark:bg-dark-card-primary shadow-md text-left"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm opacity-80">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
