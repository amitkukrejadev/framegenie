"use client";

import { SignIn } from "@clerk/nextjs";
import DashboardLayout from "@/app/components/DashboardLayout";

export default function Page() {
  return (
    <DashboardLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-6">
          <SignIn />
        </div>
      </div>
    </DashboardLayout>
  );
}
