"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import DashboardLayout from "@/app/components/DashboardLayout";
import { z } from "zod";

// Define API response schema with Zod
const BackgroundRemovalResponseSchema = z.object({
  url: z.string().url(),
});

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const BackgroundRemovalPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [resultUrl, setResultUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleUpload = useCallback(async () => {
    if (!file) {
      setError("Please select a file to upload");
      toast.error("No file selected");
      return;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("Invalid image format. Please use JPEG, PNG, or WebP.");
      toast.error("Invalid image format.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Image must be less than 10MB");
      toast.error("File too large (max 10MB)");
      return;
    }

    setLoading(true);
    setError("");
    setResultUrl("");
    toast.loading("Uploading and removing background...");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/background-removal", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data?.url) {
        const parsed = BackgroundRemovalResponseSchema.parse(data);
        setResultUrl(parsed.url);
        toast.success("Background removed successfully");
      } else {
        setError(data.error || "Failed to remove background");
        toast.error(data.error || "Failed to remove background");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Something went wrong");
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  }, [file]);

  const handleClear = useCallback(() => {
    setFile(null);
    setPreviewUrl("");
    setResultUrl("");
    setError("");
    const input = document.getElementById("imageFile") as HTMLInputElement;
    if (input) input.value = "";
  }, []);

  const handleDownload = useCallback(async () => {
    if (!resultUrl) return;

    try {
      const res = await fetch(resultUrl);
      const blob = await res.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "background_removed.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
      toast.success("Image downloaded!");
    } catch {
      setError("Failed to download image");
      toast.error("Failed to download image");
    }
  }, [resultUrl]);

  return (
    <DashboardLayout>
      <motion.div
        className="max-w-2xl mx-auto px-6 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-dark-card-primary p-8 rounded-2xl shadow-2xl space-y-8">
          <h1 className="text-3xl font-bold text-center text-text-primary">
            Background Removal
          </h1>

          <div>
            <label htmlFor="imageFile" className="sr-only">
              Upload Image
            </label>
            <input
              type="file"
              id="imageFile"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                const selected = e.target.files?.[0] || null;
                setFile(selected);
                setResultUrl("");
                setPreviewUrl(selected ? URL.createObjectURL(selected) : "");
              }}
              className="block w-full text-sm file:text-white file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:bg-blue-500 file:hover:bg-blue-700 dark:file:bg-blue-500 dark:file:hover:bg-blue-600 bg-gray-200 text-black rounded-lg border border-gray-600 cursor-pointer focus:outline-none"
              aria-describedby="image-error"
            />
          </div>

          {file && (
            <p className="text-sm opacity-60 text-center text-text-secondary">
              <strong>{file.name}</strong> -{" "}
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          )}

          <div className="space-y-4">
            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 
                ${
                  loading
                    ? "bg-blue-500/60 cursor-wait text-white animate-pulse"
                    : "bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                } 
                disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-busy={loading}
              aria-label="Remove background"
            >
              {loading ? "Removing Background..." : "Remove Background"}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 bg-gray-500 hover:bg-gray-600 text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              aria-label="Clear selected image"
            >
              Clear
            </button>
          </div>

          {error && (
            <div role="alert" className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          {previewUrl && (
            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-semibold text-text-primary">
                Selected Image:
              </h2>
              <Image
                src={previewUrl}
                alt="Preview"
                width={400}
                height={300}
                className="mx-auto rounded-xl object-contain shadow-lg"
              />
            </motion.div>
          )}

          {resultUrl && (
            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-semibold text-text-primary">
                Result:
              </h2>
              <Image
                src={resultUrl}
                alt="Background Removed"
                width={400}
                height={300}
                className="mx-auto rounded-xl object-contain shadow-lg"
              />
              <button
                onClick={handleDownload}
                className="w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 bg-green-500 hover:bg-green-600 text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                aria-label="Download image"
              >
                Download Image
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default BackgroundRemovalPage;
