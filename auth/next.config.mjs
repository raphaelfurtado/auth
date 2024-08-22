/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: "/",
          destination: "/settings",
          permanent: true,
        },
      ];
    },
  };

export default nextConfig;
