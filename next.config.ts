/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  
  basePath: process.env.NODE_ENV === "production" ? "/Kumiverse-web" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/Kumiverse-web/" : "",
};

export default nextConfig;
