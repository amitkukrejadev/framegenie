"use client";

import { SignIn } from "@clerk/nextjs";
import DashboardLayout from "@/app/components/DashboardLayout";
import Footer from "@/app/components/Footer";


export default function Page() {
  return (
    <DashboardLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-6">
          <SignIn />
        </div>
      </div>
      <footer className="w-full px-4 py-8 bg-[oklch(0.4_0.013807_253.101)]">
        <Footer />
      </footer>
    </DashboardLayout>
  );
}
