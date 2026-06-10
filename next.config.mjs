/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // 👈 আনস্প্ল্যাশ ইমেজ এলাউ করা হলো
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // গুগল লগইন প্রোফাইল ছবির জন্য সেফ জোন
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com', // 👈 ImgBB ইমেজ হোস্টনেম (নতুন যুক্ত করা হলো)
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
