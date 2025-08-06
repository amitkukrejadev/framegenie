"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import DashboardLayout from "@/app/components/DashboardLayout";
import { z } from "zod";
import Footer from "@/app/components/Footer";

// Define API response schema with Zod
const ThumbnailResponseSchema = z.object({
  thumbnailUrl: z.string().url(),
});

// Define allowed video types
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const VideoThumbnailPage: React.FC = () => {
  const [video, setVideo] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (!video) {
      setError("Please select a video file.");
      toast.error("No video selected.");
      return;
    }

    if (!ALLOWED_VIDEO_TYPES.includes(video.type)) {
      setError("Invalid video format. Please use MP4, WebM, or OGG.");
      toast.error("Invalid video format.");
      return;
    }

    if (video.size > MAX_FILE_SIZE) {
      setError("Video must be under 50MB.");
      toast.error("Video size exceeds 50MB.");
      return;
    }

    setLoading(true);
    setError(null);
    setThumbnailUrl(null);

    try {
      const formData = new FormData();
      formData.append("video", video);

      const res = await fetch("/api/video-thumbnail", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        const parsed = ThumbnailResponseSchema.parse(data);
        setThumbnailUrl(parsed.thumbnailUrl);
        toast.success("Thumbnail generated successfully!");
      } else {
        setError(data.error || "Failed to generate thumbnail");
        toast.error(data.error || "Failed to generate thumbnail");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [video]);

  const handleClear = useCallback(() => {
    setVideo(null);
    setThumbnailUrl(null);
    setError(null);
    const input = document.getElementById("videoFile") as HTMLInputElement;
    if (input) input.value = "";
  }, []);

  const handleDownload = useCallback(async () => {
    if (!thumbnailUrl) return;

    try {
      const response = await fetch(
        `/api/thumbnail/download?url=${encodeURIComponent(thumbnailUrl)}`
      );
      if (!response.ok) {
        throw new Error("Failed to download thumbnail");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "thumbnail.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Thumbnail downloaded!");
    } catch {
      setError("Failed to download thumbnail");
    }
  }, [thumbnailUrl]);

  return (
    <DashboardLayout>
      <motion.div
        className="max-w-2xl mx-auto px-6 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl space-y-8">
          <h1 className="text-3xl font-bold text-center text-white">
            Video Thumbnail Generator
          </h1>

          <div>
            <label htmlFor="videoFile" className="sr-only">
              Upload Video
            </label>
            <input
              type="file"
              id="videoFile"
              accept="video/mp4,video/webm,video/ogg"
              onChange={(e) => setVideo(e.target.files?.[0] || null)}
              className="block w-full text-sm file:text-white file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:bg-blue-500 file:hover:bg-blue-700 dark:file:bg-blue-500 dark:file:hover:bg-blue-600 bg-gray-200 text-black rounded-lg border border-gray-600 cursor-pointer focus:outline-none"
              aria-describedby="video-error"
            />
          </div>

          {video && (
            <p className="text-sm opacity-60 text-center text-gray-300">
              <strong>{video.name}</strong> -{" "}
              {(video.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          )}

          <div className="space-y-4">
            <button
              onClick={handleGenerate}
              className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 
                ${
                  !video || loading
                    ? "bg-blue-500/60 cursor-not-allowed text-white"
                    : loading
                    ? "bg-blue-500/60 cursor-not-allowed text-white animate-pulse"
                    : "bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                } 
                disabled:opacity-50`}
              disabled={!video || loading}
              aria-busy={loading}
              aria-label="Generate thumbnail"
            >
              {loading ? "Generating..." : "Generate Thumbnail"}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 bg-gray-500 hover:bg-gray-600 text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              aria-label="Clear selected video"
            >
              Clear
            </button>
          </div>

          {error && (
            <div role="alert" className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          {thumbnailUrl && (
            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-semibold text-white">
                Generated Thumbnail:
              </h2>
              <Image
                src={thumbnailUrl}
                alt="Generated video thumbnail"
                width={400}
                height={300}
                className="mx-auto rounded-xl object-contain shadow-lg"
              />
              <button
                onClick={handleDownload}
                className="w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 bg-green-500 hover:bg-green-600 text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                aria-label="Download thumbnail"
              >
                Download Thumbnail
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
      <footer className="w-full px-4 py-8 bg-[oklch(0.4_0.013807_253.101)]">
        <Footer />
      </footer>
    </DashboardLayout>
  );
};

export default VideoThumbnailPage;
