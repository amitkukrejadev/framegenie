"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { z } from "zod";
import DashboardLayout from "@/app/components/DashboardLayout";

// Define API response schema with Zod
const ImageUploadResponseSchema = z.object({
  publicID: z.string(),
});

const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
};

type SocialFormat = keyof typeof socialFormats;

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const SocialShare: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>(
    "Instagram Square (1:1)"
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [error, setError] = useState<string>("");
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (uploadedImage) {
      setIsTransforming(true);
      const timeout = setTimeout(() => setIsTransforming(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [selectedFormat, uploadedImage]);

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];
      if (!selectedFile) {
        setError("Please select a file");
        toast.error("No file selected");
        return;
      }

      if (!ALLOWED_IMAGE_TYPES.includes(selectedFile.type)) {
        setError("Invalid image format. Please use JPEG, PNG, or WebP.");
        toast.error("Invalid image format.");
        return;
      }

      if (selectedFile.size > MAX_FILE_SIZE) {
        setError("Image must be less than 10MB");
        toast.error("File too large (max 10MB)");
        return;
      }

      setIsUploading(true);
      setError("");
      setUploadedImage(null);

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch("/api/image-upload", {
          method: "POST",
          body: formData,
          headers: {
            "X-Resource-Type": "image",
          },
        });

        const errorHeader = response.headers.get("x-cld-error");
        if (!response.ok) {
          const errorText = errorHeader || "Failed to upload image";
          throw new Error(errorText);
        }

        const data = await response.json();
        const parsed = ImageUploadResponseSchema.parse(data);
        console.log("Uploaded publicID:", parsed.publicID);
        setUploadedImage(parsed.publicID);
        toast.success("Image uploaded successfully");
      } catch (err: unknown) {
        let errorMessage = "Image upload failed. Please try again.";
        if (err instanceof Error && err.message) {
          errorMessage = err.message;
        }
        setError(errorMessage);
        toast.error(errorMessage);
        console.error("Upload error:", err);
      } finally {
        setIsUploading(false);
      }
    },
    []
  );

  const handleClear = useCallback(() => {
    setUploadedImage(null);
    setSelectedFormat("Instagram Square (1:1)");
    setError("");
    const input = document.getElementById("imageFile") as HTMLInputElement;
    if (input) input.value = "";
  }, []);

  const handleDownload = useCallback(async () => {
    if (!uploadedImage) {
      setError("No image available to download");
      toast.error("No image available to download");
      return;
    }

    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
      setError("Cloudinary configuration missing");
      toast.error("Cloudinary configuration missing");
      console.error("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set");
      return;
    }

    const downloadUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_${socialFormats[selectedFormat].width},h_${socialFormats[selectedFormat].height},g_auto/${uploadedImage}`;
    console.log("Attempting to download:", {
      publicID: uploadedImage,
      downloadUrl,
      format: selectedFormat,
    });

    // Retry mechanism for Cloudinary transformation delay
    const maxRetries = 3;
    let attempt = 0;

    const attemptDownload = async () => {
      try {
        const response = await fetch(downloadUrl);
        if (!response.ok) {
          const errorHeader =
            response.headers.get("x-cld-error") || "Failed to fetch image";
          throw new Error(errorHeader);
        }
        return response.blob();
      } catch (err) {
        if (attempt < maxRetries - 1) {
          attempt++;
          console.log(
            `Retrying download (attempt ${attempt + 1}/${maxRetries})...`
          );
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1s before retry
          return attemptDownload();
        }
        throw err;
      }
    };

    attemptDownload()
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${selectedFormat
          .replace(/\s+/g, "_")
          .toLowerCase()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success("Image downloaded!");
      })
      .catch((err) => {
        setError(
          "Failed to download image: " + (err.message || "Unknown error")
        );
        toast.error("Failed to download image");
        console.error("Download error:", err);
      });
  }, [selectedFormat, uploadedImage]);

  const handleImageError = useCallback(() => {
    setError("Failed to load image preview");
    toast.error("Failed to load image preview");
  }, []);

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
            Social Media Image Creator
          </h1>

          <div className="space-y-5">
            <div>
              <label htmlFor="imageFile" className="sr-only">
                Upload Image
              </label>
              <input
                type="file"
                id="imageFile"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileUpload}
                className="block w-full text-sm file:text-white file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:bg-blue-500 file:hover:bg-blue-700 dark:file:bg-blue-500 dark:file:hover:bg-blue-600 bg-gray-300 text-black rounded-lg border border-gray-600 cursor-pointer focus:outline-none"
                aria-describedby="image-error"
              />
            </div>

            {isUploading && (
              <div className="text-center">
                <span className="loading loading-spinner loading-md"></span>
              </div>
            )}

            {error && (
              <div role="alert" className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            {uploadedImage && (
              <>
                <select
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-[#2a2a2a] border border-gray-600 rounded-xl focus:ring focus:ring-blue-400"
                  value={selectedFormat}
                  onChange={(e) =>
                    setSelectedFormat(e.target.value as SocialFormat)
                  }
                  aria-label="Select social media format"
                >
                  {Object.keys(socialFormats).map((format) => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}
                </select>

                <div className="mt-6 relative">
                  <h3 className="text-lg font-semibold mb-2">Preview:</h3>
                  <div
                    className="flex justify-center items-center relative"
                    style={{
                      width: `${socialFormats[selectedFormat].width / 4}px`,
                      height: `${socialFormats[selectedFormat].height / 4}px`,
                    }}
                  >
                    {isTransforming && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                        <span className="loading loading-spinner loading-lg text-white"></span>
                      </div>
                    )}
                    <CldImage
                      key={`${uploadedImage}-${selectedFormat}`}
                      width={socialFormats[selectedFormat].width}
                      height={socialFormats[selectedFormat].height}
                      src={uploadedImage}
                      sizes="100vw"
                      alt="Transformed image"
                      crop="fill"
                      aspectRatio={socialFormats[selectedFormat].aspectRatio}
                      gravity="auto"
                      className="rounded-lg"
                      onError={handleImageError}
                    />
                    <Image
                      key={`${uploadedImage}-${selectedFormat}-download`}
                      ref={imageRef as React.RefObject<HTMLImageElement>}
                      src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_${socialFormats[selectedFormat].width},h_${socialFormats[selectedFormat].height},g_auto/${uploadedImage}`}
                      alt="Hidden download image"
                      width={socialFormats[selectedFormat].width}
                      height={socialFormats[selectedFormat].height}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleDownload}
                    disabled={!uploadedImage || isTransforming}
                    className="w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 bg-green-500 hover:bg-green-600 text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Download image"
                  >
                    Download Image
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
              </>
            )}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default SocialShare;
