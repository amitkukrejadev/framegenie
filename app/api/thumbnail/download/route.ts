import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileUrl = searchParams.get("url");

  if (!fileUrl) {
    return new Response("Missing thumbnail URL", { status: 400 });
  }

  try {
    const res = await fetch(fileUrl);
    if (!res.ok) {
      return new Response("Failed to fetch thumbnail", { status: res.status });
    }
    const buffer = await res.arrayBuffer();

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": "attachment; filename=thumbnail.jpg",
      },
    });
  } catch (err) {
    console.error("Download API error:", err);
    return new Response("Failed to download thumbnail", { status: 500 });
  }
}
