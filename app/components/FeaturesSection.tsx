"use client";

import React from "react";
import { Video, ImageIcon, Share2 } from "lucide-react";

const features = [
  {
    icon: <Video className="h-6 w-6 text-blue-500 dark:text-blue-400" />,
    title: "AI Video Frame Generation",
    description:
      "Generate high-quality frames from your videos in seconds using our AI engine.",
  },
  {
    icon: <ImageIcon className="h-6 w-6 text-green-500 dark:text-green-400" />,
    title: "Background Removal",
    description: "Easily remove video or image backgrounds with precision.",
  },
  {
    icon: <Share2 className="h-6 w-6 text-pink-500 dark:text-pink-400" />,
    title: "Social Sharing Tools",
    description:
      "Create custom thumbnails and frame visuals for social platforms.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full text-base-content dark:text-text-primary transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold">Features</h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 px-2 sm:px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-5 rounded-xl shadow-md bg-base-200 dark:bg-dark-card-primary text-left transition-all duration-300 space-y-3"
            >
              <div>{feature.icon}</div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
