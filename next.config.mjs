/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["modenteo.s3.ap-southeast-2.amazonaws.com", "modenteo-file.s3.eu-north-1.amazonaws.com"],
  },
};

export default nextConfig;
