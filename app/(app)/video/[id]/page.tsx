import { PrismaClient } from "@prisma/client";
import React from "react";
import Footer from "@/app/components/Footer";
import DashboardLayout from "@/app/components/DashboardLayout";

const prisma = new PrismaClient();

type Params = {
  id: string;
};

export default async function Page({ params }: { params: Promise<Params> }) {
  const resolvedParams = await params; // Resolve the Promise to get { id: string }
  const video = await prisma.video.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!video) {
    return (
      <DashboardLayout>
        <div className="text-center mt-10 text-red-600">Video not found.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto mt-10 p-6">
        <h1 className="text-3xl font-bold mb-4">{video.title}</h1>
        <p className="text-gray-600 mb-6">{video.description}</p>
        <video
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${video.publicId}.mp4`}
          controls
          className="w-full rounded-xl shadow-lg border border-gray-300"
        />
        <div className="mt-4 text-sm text-gray-400">
          <p>
            Original Size:{" "}
            {(parseFloat(video.originalSize) / (1024 * 1024)).toFixed(2)} MB
          </p>
          <p>
            Compressed Size:{" "}
            {(parseFloat(video.compressedSize) / (1024 * 1024)).toFixed(2)} MB
          </p>
          <p>Duration: {video.duration.toFixed(2)} seconds</p>
        </div>
      </div>
      <footer className="w-full px-4 py-8 bg-[oklch(0.4_0.013807_253.101)]">
        <Footer />
      </footer>
    </DashboardLayout>
  );
}
