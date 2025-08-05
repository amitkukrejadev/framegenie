"use client";

import { SignUp } from "@clerk/nextjs";
import DashboardLayout from "@/app/components/DashboardLayout";

export default function Page() {
  return (
    <DashboardLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-700">
        <div className="w-full max-w-md p-6">
          <SignUp />
        </div>
      </div>
    </DashboardLayout>
  );
}
