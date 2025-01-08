/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  webpack: (config) => {
    config.resolve.fallback = { ssr: false };

    return config;
  },
  images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'wphtml.com',
          port: '',
          pathname: '/html/**',
        },
        {
          protocol: 'https',
          hostname: 'img-lcwaikiki.mncdn.com',
          port: '',
          pathname: '/mnresize/**',
        },
        {
          protocol: 'https',
          hostname: 'lcw.akinoncdn.com',
          port: '',
          pathname: '/products/**',
        },
        {
          protocol: 'https',
          hostname: 'tree-stores.com',
          port: '',
          pathname: '/wp-content/**',
        },
      ],
  },
};

export default nextConfig;
