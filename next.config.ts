const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001", // Specify the port where your images are hosted
        pathname: "/api/**",
      },
    ],
  },
};

export default nextConfig;