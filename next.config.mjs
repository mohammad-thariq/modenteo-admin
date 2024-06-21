const withTM = require('next-transpile-modules')(['react-s3']); // Add this line

/** @type {import('next').NextConfig} */
const nextConfig = withTM({ // Wrap your existing config with withTM
  reactStrictMode: true,
  images: {
    domains: ["modenteo-file.s3.eu-north-1.amazonaws.com"],
  },
});

export default nextConfig;
