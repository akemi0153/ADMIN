/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable React strict mode
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'baler.gov.ph',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '3.bp.blogspot.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent.fmnl4-4.fna.fbcdn.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.vantagehunt.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent.fmnl4-4.fna.fbcdn.net',
        pathname: '/v/t39.30808-6/243391183_171928031755907_1560982128893168285_n.jpg',
      },
      {
        protocol: 'https',
        hostname: 'scontent.fmnl8-1.fna.fbcdn.net',
        pathname: '/v/t39.30808-6/442399244_1172828360627362_4090602450489048201_n.jpg',
      },
      {
        protocol: 'https',
        hostname: 'th.bing.com',
        pathname: '/th/id/OIP.ZEhH5_7fNjVXBuqwmZfD9QHaHZ',
      },
    ],
  },
};

module.exports = nextConfig;