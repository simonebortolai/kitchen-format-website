/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/kitchen-format-website',
  assetPrefix: '/kitchen-format-website',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
