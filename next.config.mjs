/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  images: { remotePatterns: [{ protocol: "https", hostname: "avatars.githubusercontent.com" }] }
};
export default nextConfig;
