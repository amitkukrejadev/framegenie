// app/contact/page.tsx

"use client";

import React, { useState } from "react";
import DashboardLayout from "@/app/components/DashboardLayout";
import Footer from "@/app/components/Footer";

export default function ContactPage() {
  const [status, setStatus] = useState("");

  return (
    <DashboardLayout>
      <section className="min-h-[80vh] flex items-center justify-center bg-gray-900 border-0 rounded-2xl">
        <form
          action="https://formspree.io/f/mldlpvbn"
          method="POST"
          className="w-full max-w-md bg-gray-900 rounded-2xl shadow-lg p-8 space-y-6"
          onSubmit={() => setStatus("Thank you for contacting us!")}
        >
          <h2 className="text-2xl font-bold text-white text-center mb-4">
            Contact Us
          </h2>
          <div>
            <label className="block text-gray-200 mb-1" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
              type="text"
              id="name"
              name="name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-200 mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
              type="email"
              id="email"
              name="email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-200 mb-1" htmlFor="reason">
              Reason
            </label>
            <select
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
              id="reason"
              name="reason"
              required
            >
              <option value="">Select a reason</option>
              <option value="feature">Feature Request</option>
              <option value="issue">Report an Issue</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-200 mb-1" htmlFor="message">
              Message
            </label>
            <textarea
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
              id="message"
              name="message"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded bg-amber-600 hover:bg-amber-700 text-white font-semibold transition"
          >
            Send Message
          </button>
          {status && (
            <p className="text-green-400 text-center mt-2">{status}</p>
          )}
        </form>
      </section>
      <footer className="w-full px-4 py-8 bg-[oklch(0.4_0.013807_253.101)]">
        <Footer />
      </footer>
    </DashboardLayout>
  );
}
