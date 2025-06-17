"use client";
import React, { useState, useEffect, useRef } from "react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Image from "next/image";

const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
};

type SocialFormat = keyof typeof socialFormats;

function SocialShare() {
  const pathname = usePathname();
  const { user } = useUser();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>(
    "Instagram Square (1:1)"
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (uploadedImage) {
      setIsTransforming(true);
      const timeout = setTimeout(() => setIsTransforming(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [selectedFormat, uploadedImage]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formatData = new FormData();
    formatData.append("file", file);
    try {
      const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formatData,
      });
      if (!response.ok) throw new Error("Failed to upload image");
      const data = await response.json();
      setUploadedImage(data.publicID);
    } catch (error) {
      console.log(error);
      alert("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    if (!imageRef.current) return;

    fetch(imageRef.current.src)
      .then((response) => response.blob())
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
      });
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-100 bg-[#1e1e2f]">
      <header className="w-full flex justify-between items-center px-8 py-5 bg-[#13131f] shadow-md">
        <h1 className="text-2xl font-bold tracking-wide">🎥 FrameGenie</h1>
        <div className="flex items-center space-x-3">
          {user && (
            <span className="text-sm font-medium">{user.firstName}</span>
          )}
          <UserButton
            afterSignOutUrl="/"
            appearance={{ elements: { avatarBox: "w-10 h-10" } }}
          />
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 bg-[#13131f] px-5 py-6 hidden sm:block">
          <nav className="space-y-3">
            {[
              { href: "/", label: "Home Page" },
              { href: "/social-share", label: "Social Share" },
              { href: "/video-upload", label: "Video Upload" },
            ].map(({ href, label }) => (
              <Link key={href} href={href}>
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${
                    pathname === href ? "bg-blue-600" : "hover:bg-gray-700"
                  }`}
                >
                  {label}
                </button>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 flex justify-center items-start px-6 py-10">
          <div className="w-full max-w-2xl bg-[#25253a] p-8 rounded-2xl shadow-2xl space-y-6">
            <h1 className="text-3xl font-bold text-center mb-4">
              Social Media Image Creator
            </h1>

            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Choose an image file
                </label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="block w-full text-sm border border-gray-600 bg-[#1a1a2e] rounded-xl py-2 px-3"
                />
              </div>

              {isUploading && (
                <progress className="progress progress-primary w-full"></progress>
              )}

              {uploadedImage && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Select Social Media Format
                    </label>
                    <select
                      className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-600 rounded-xl"
                      value={selectedFormat}
                      onChange={(e) =>
                        setSelectedFormat(e.target.value as SocialFormat)
                      }
                    >
                      {Object.keys(socialFormats).map((format) => (
                        <option key={format} value={format}>
                          {format}
                        </option>
                      ))}
                    </select>
                  </div>

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
                        alt="transformed image"
                        crop="fill"
                        aspectRatio={socialFormats[selectedFormat].aspectRatio}
                        gravity="auto"
                        className="rounded-lg"
                      />
                      <Image
                        ref={imageRef as React.RefObject<HTMLImageElement>}
                        src={`https://res.cloudinary.com/framegenie/image/upload/c_fill,w_${socialFormats[selectedFormat].width},h_${socialFormats[selectedFormat].height},g_auto/${uploadedImage}.png`}
                        alt="hidden-download"
                        width={socialFormats[selectedFormat].width}
                        height={socialFormats[selectedFormat].height}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={handleDownload}
                      className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                    >
                      Download Image
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SocialShare;
