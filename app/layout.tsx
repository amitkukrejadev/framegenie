import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

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
  icons: { icon: "/favicon.png" },
  manifest: "/site.webmanifest",
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
          <link rel="icon" href="/favicon.png" sizes="32x32" type="image/png" />
          <link rel="manifest" href="/site.webmanifest" />
        </head>
        <body
          className={`${poppins.variable} antialiased bg-[oklch(0.4_0.013807_253.101)] text-white`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
