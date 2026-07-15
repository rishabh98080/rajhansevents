/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uvoapeploerjdonrrbtp.supabase.co",
      },
    ],
  },
};
export default nextConfig;
