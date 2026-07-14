/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export', // Mengaktifkan export statis ke folder /out
  images: {
    unoptimized: true, // GitHub Pages tidak mendukung optimasi gambar default Next.js
  },
};

export default nextConfig;
