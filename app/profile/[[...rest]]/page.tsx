"use client";

import { UserProfile } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/app/components/DashboardLayout";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <DashboardLayout>
      {loading ? (
        <motion.div
          className="min-h-screen flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </motion.div>
      ) : (
        <motion.div
          className="flex justify-center py-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <UserProfile routing="path" path="/profile" />
        </motion.div>
      )}
    </DashboardLayout>
  );
}
