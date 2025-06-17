"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { useUser, useClerk } from "@clerk/nextjs";

function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useClerk();
  const MAX_FILE_SIZE = 70 * 1024 * 1024;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("File size is too large");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("originalSize", file.size.toString());

    try {
      const response = await axios.post("/api/video-upload", formData);
      if (response.status === 200) {
        setIsUploading(false);
        router.push(`/video/${response.data.id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setTitle("");
    setDescription("");
    (document.getElementById("videoFile") as HTMLInputElement).value = "";
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-100 bg-[#1e1e2f]">
      {/* Topbar */}
      <header className="w-full flex justify-between items-center px-6 py-4 bg-[#13131f] shadow-md">
        <h1 className="text-2xl font-bold tracking-wide">🎥 FrameGenie</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <MdOutlineEmail className="text-lg" />
            {user?.primaryEmailAddress?.emailAddress || "Not signed in"}
          </div>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 text-red-500 hover:text-red-700 border border-red-500 hover:border-red-700 px-4 py-2 rounded-lg"
          >
            <FiLogOut />
            Sign Out
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-[#13131f] p-4">
          <nav className="space-y-4 mt-6">
            <button
              onClick={() => router.push("/")}
              className="w-full text-left px-4 py-2 rounded-lg bg-transparent hover:bg-gray-700 transition"
            >
              Home Page
            </button>
            <button
              onClick={() => router.push("/social-share")}
              className="w-full text-left px-4 py-2 rounded-lg bg-transparent hover:bg-gray-700 transition"
            >
              Social Share
            </button>
            <button
              onClick={() => router.push("/video-upload")}
              className="w-full text-left px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
            >
              Video Upload
            </button>
          </nav>
        </aside>

        {/* Upload Section */}
        <main className="flex-1 flex justify-center items-center px-6 py-10">
          <div className="w-full max-w-2xl bg-[#25253a] p-8 rounded-2xl shadow-2xl space-y-6">
            <h2 className="text-3xl font-bold text-center mt-4">
              Upload Video
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-600 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  required
                ></textarea>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Video File
                </label>
                <input
                  id="videoFile"
                  type="file"
                  accept="video/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm border border-gray-600 bg-[#1a1a2e] rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 py-2 px-3"
                  required
                />
              </div>

              {file && (
                <p className="text-xs text-gray-400">
                  Selected: <span className="font-medium">{file.name}</span> (
                  {(file.size / (1024 * 1024)).toFixed(2)} MB)
                </p>
              )}

              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl"
                >
                  Clear
                </button>

                <button
                  type="submit"
                  disabled={isUploading}
                  aria-busy={isUploading}
                  className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl disabled:opacity-50"
                >
                  {isUploading ? "Uploading..." : "Upload Video"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default VideoUpload;
