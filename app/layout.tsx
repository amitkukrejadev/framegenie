import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FrameGenie",
  description:
    "Edit videos like a pro with FrameGenie – upload, share, and enhance with ease.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "FrameGenie",
    description:
      "Edit videos like a pro with FrameGenie – upload, share, and enhance with ease.",
    images: ["/android-chrome-512x512.png"],
    url: "https://framegenie.vercel.app",
    siteName: "FrameGenie",
  },
  twitter: {
    card: "summary_large_image",
    title: "FrameGenie",
    description:
      "Edit videos like a pro with FrameGenie – upload, share, and enhance with ease.",
    images: ["/android-chrome-512x512.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="icon"
            href="/favicon-16x16.png"
            sizes="16x16"
            type="image/png"
          />
          <link
            rel="icon"
            href="/favicon-32x32.png"
            sizes="32x32"
            type="image/png"
          />
          <link
            rel="icon"
            href="/android-chrome-192x192.png"
            sizes="192x192"
            type="image/png"
          />
          <link
            rel="icon"
            href="/android-chrome-512x512.png"
            sizes="512x512"
            type="image/png"
          />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </head>
        <body
          className={`${poppins.variable} antialiased bg-[oklch(0.4_0.013807_253.101)] text-white`}
        >
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
