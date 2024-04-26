/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ["gcrzolslgumioymubeax.supabase.co"]
  // }
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "gcrzolslgumioymubeax.supabase.co",
        port: '',
      },
    ],
  },
};

export default nextConfig;
