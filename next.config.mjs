/** @type {import('next').NextConfig} */
const nextConfig = {
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
