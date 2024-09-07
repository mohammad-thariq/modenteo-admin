/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["modenteo.s3.ap-southeast-2.amazonaws.com/"],
  },
};

export default nextConfig;
