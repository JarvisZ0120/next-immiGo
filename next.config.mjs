/** @type {import('next').NextConfig} */
const nextConfig = {
  // 允许外部访问
  experimental: {
    serverComponentsExternalPackages: []
  }
};

export default nextConfig;
