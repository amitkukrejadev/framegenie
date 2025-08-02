// app/app/video/[id]/page.tsx
import { PrismaClient } from "@prisma/client";
import React from "react";

// Type for the props passed to this page
type PageProps = {
  params: {
    id: string;
  };
};

const prisma = new PrismaClient();

export default async function VideoPage({ params }: PageProps) {
  const video = await prisma.video.findUnique({
    where: { id: params.id },
  });

  if (!video) {
    return (
      <div className="text-center mt-10 text-red-600">Video not found.</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-4">{video.title}</h1>
      <p className="text-gray-600 mb-6">{video.description}</p>

      <video
        src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${video.publicId}.mp4`}
        controls
        className="w-full rounded-xl shadow-lg border border-gray-300"
      />

      <div className="mt-4 text-sm text-gray-500 space-y-1">
        <p>
          Original Size: {(parseFloat(video.originalSize) / (1024 * 1024)).toFixed(2)} MB
        </p>
        <p>
          Compressed Size: {(parseFloat(video.compressedSize) / (1024 * 1024)).toFixed(2)} MB
        </p>
        <p>Duration: {video.duration.toFixed(2)} seconds</p>
      </div>
    </div>
  );
}
