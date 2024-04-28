/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/:path*"
      },
    ];
  },

  // How to redirect. Useful for goole oauth2.
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: 'https://stackoverflow.com/posts/66662033',
  //       permanent: false,
  //       basePath: false
  //     },
  //   ]
  // },
};

export default nextConfig;
