import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("video") as File | Blob | null;
    if (!file) {
      return NextResponse.json(
        { error: "No video file received" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload video with extended timeout
    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "video",
            folder: "video-thumbnails",
            timeout: 120000, // ⏱️ Increased timeout to 2 minutes
          },
          (err, result) => {
            if (err || !result) {
              return reject(err);
            }
            resolve(result);
          }
        );
        uploadStream.end(buffer);
      }
    );

    // Generate a thumbnail URL
    const thumbnailUrl = cloudinary.url(uploadResult.public_id, {
      resource_type: "video",
      format: "jpg",
      start_offset: "1",
      width: 800,
      crop: "scale",
    });

    return NextResponse.json({ thumbnailUrl });
  } catch (error) {
    console.error("Thumbnail API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
