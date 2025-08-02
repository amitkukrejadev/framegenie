/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "img.clerk.com"], // ✅ Add img.clerk.com
  },
};

export default nextConfig;
