"use client";

import React, { useState, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import DashboardLayout from "@/app/components/DashboardLayout";
import { z } from "zod";

// Define API response schema with Zod
const VideoUploadResponseSchema = z.object({
  id: z.string(),
  publicId: z.string(),
  compressedSize: z.string(),
});

const ALLOWED_FORMATS = ["video/mp4", "video/quicktime"];
const MAX_FILE_SIZE = 70 * 1024 * 1024; // 70MB

const VideoUploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoInfo, setVideoInfo] = useState<null | {
    id: string;
    publicId: string;
    compressedSize: string;
  }>(null);
  const [error, setError] = useState<string>("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!file) {
        setError("Please select a file");
        toast.error("Please select a file");
        return;
      }

      if (!ALLOWED_FORMATS.includes(file.type)) {
        setError("Invalid format (use .mp4 or .mov)");
        toast.error("Invalid format (use .mp4 or .mov)");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError("File exceeds 70MB limit");
        toast.error("File exceeds 70MB limit");
        return;
      }

      setIsUploading(true);
      setUploadProgress(0);
      setError("");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("originalSize", file.size.toString());

      try {
        const response = await axios.post("/api/video-upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (e) => {
            if (e.total) {
              const percent = Math.round((e.loaded * 100) / e.total);
              setUploadProgress(percent);
            }
          },
        });

        if (response.status === 200) {
          const parsed = VideoUploadResponseSchema.parse(response.data);
          setVideoInfo(parsed);
          setFile(null);
          setTitle("");
          setDescription("");
          toast.success("Upload successful");
        }
      } catch (err) {
        console.error("Upload failed:", err);
        setError("Upload failed. Try again later.");
        toast.error("Upload failed. Try again later.");
      } finally {
        setIsUploading(false);
      }
    },
    [file, title, description]
  );

  const handleClear = useCallback(() => {
    setFile(null);
    setTitle("");
    setDescription("");
    setVideoInfo(null);
    setUploadProgress(0);
    setError("");
    const fileInput = document.getElementById("videoFile") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  }, []);

  const handleDownload = useCallback(async () => {
    if (!videoInfo?.publicId) return;

    try {
      const url = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${videoInfo.publicId}.mp4`;
      const res = await fetch(url);
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "compressed_video.mp4";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Video downloaded!");
    } catch {
      setError("Failed to download video");
      toast.error("Failed to download video");
    }
  }, [videoInfo]);

  return (
    <DashboardLayout>
      <motion.div
        className="max-w-2xl mx-auto px-6 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-base-200 dark:bg-dark-card-primary p-8 rounded-2xl shadow-2xl space-y-8">
          <h1 className="text-3xl font-bold text-center text-base-content dark:text-white">
            Upload Video
          </h1>

          {!videoInfo ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full px-4 py-2 border rounded-xl bg-gray-100 dark:bg-[#2a2a2a] border-gray-600 focus:ring focus:ring-blue-400"
                required
                aria-label="Video title"
              />
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full px-4 py-2 border rounded-xl bg-gray-100 dark:bg-[#2a2a2a] border-gray-600 resize-none focus:ring focus:ring-blue-400"
                required
                aria-label="Video description"
              />
              <div>
                <label htmlFor="videoFile" className="sr-only">
                  Upload Video
                </label>
                <input
                  type="file"
                  id="videoFile"
                  accept="video/mp4,video/quicktime"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm file:text-white file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:bg-blue-500 file:hover:bg-blue-700 dark:file:bg-blue-500 dark:file:hover:bg-blue-600 bg-gray-300 text-black rounded-lg border border-gray-600 cursor-pointer focus:outline-none"
                  aria-describedby="video-error"
                />
              </div>

              {file && (
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm opacity-60 text-center">
                    <strong>{file.name}</strong> -{" "}
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  <video
                    src={URL.createObjectURL(file)}
                    controls
                    controlsList="nodownload noplaybackrate nofullscreen"
                    disablePictureInPicture
                    className="rounded-xl border w-full"
                  />
                </motion.div>
              )}

              {error && (
                <div role="alert" className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              {isUploading && (
                <div>
                  <p className="text-sm text-center">{uploadProgress}%</p>
                  <div className="w-full bg-gray-300 rounded-full h-2 dark:bg-gray-600">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={!file || isUploading}
                  className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 
                    ${
                      isUploading
                        ? "bg-blue-500/60 cursor-wait text-white animate-pulse"
                        : "bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    } 
                    disabled:opacity-50 disabled:cursor-not-allowed`}
                  aria-busy={isUploading}
                  aria-label="Upload video"
                >
                  {isUploading ? "Uploading..." : "Upload Video"}
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 bg-gray-500 hover:bg-gray-600 text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                  aria-label="Clear form"
                >
                  Clear
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              className="space-y-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-semibold">Upload Complete!</h2>
              <video
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${videoInfo.publicId}.mp4`}
                controls
                controlsList="nodownload noplaybackrate nofullscreen"
                disablePictureInPicture
                className="w-full rounded-xl border"
              />
              <p className="text-sm opacity-70">
                Compressed Size:{" "}
                {(parseInt(videoInfo.compressedSize) / (1024 * 1024)).toFixed(
                  2
                )}{" "}
                MB
              </p>
              <button
                onClick={handleDownload}
                className="w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 bg-green-500 hover:bg-green-600 text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                aria-label="Download video"
              >
                Download Video
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default VideoUploadPage;
