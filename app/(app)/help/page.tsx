// app/(app)/help/page.tsx
"use client";

import React from "react";
import DashboardLayout from "@/app/components/DashboardLayout";

const faqs = [
  {
    question: "What is FrameGenie?",
    answer:
      "FrameGenie is an AI-powered tool to extract video frames, share them, and remove backgrounds easily.",
  },
  {
    question: "How do I upload a video?",
    answer:
      "Click on 'Video Upload' in the navbar and follow the upload instructions.",
  },
  {
    question: "Is it free to use?",
    answer: "Yes, FrameGenie offers free usage with optional premium features.",
  },
];

export default function HelpPage() {
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8 text-base-content dark:text-gray-300">
        <h1 className="text-3xl font-bold text-center">
          Frequently Asked Questions
        </h1>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-base-200 dark:bg-dark-card-primary p-4 rounded-xl shadow"
            >
              <h2 className="text-lg font-semibold">{faq.question}</h2>
              <p className="text-sm opacity-80 mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
