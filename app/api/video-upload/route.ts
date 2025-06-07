import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  public_id: string;
  bytes: number;
  duration?: number;
  [key: string]: any; // Allow additional properties
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ||
      !process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        { error: "Cloudinary configuration is missing" },
        { status: 500 }
      );
    }
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const originalFileSize = formData.get("originalFileSize") as string | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "video",
            folder: "video-upload",
            transformation: [{ fetch_format: "mp4" }, { quality: "auto" }],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUploadResult);
          }
        );
        uploadStream.end(buffer);
      }
    );
      const videoData = await prisma.video.create({
          data: {
              title,
              description,
              publicID: result.public_id,
              originalFileSize: originalFileSize,
              compressedSize: String(result.bytes),
              duration: result.duration || 0,
          }
      })
      return NextResponse.json({
        publicID: result.public_id,
      }, {
            status: 200,
            headers: {
                "Content-Type": "application/json",
        );
  } catch (error) {
    console.log("Upload image error:", error);
    return NextResponse.json({ error: "Upload image failed" }, { status: 500 });
  }
}
