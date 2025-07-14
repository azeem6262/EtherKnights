/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'api.dicebear.com',
      'gateway.pinata.cloud',
      'ipfs.io',
      'cloudflare-ipfs.com'
    ],
  },
};

export default nextConfig;