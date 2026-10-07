/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'cdn.grofers.com',
      'media-assets.swiggy.com',
      'b.zmtcdn.com',
      'd2407na1z3wf0m.cloudfront.net',
      'assetscdn1.paytm.com',
      'cdn.zeptonow.com',
      'firebasestorage.googleapis.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
