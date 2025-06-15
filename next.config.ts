const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async rewrites() {
    return [
      {
        source: "/ru/slots",
        destination: "/ru/slots",
      },
      {
        source: "/ru/bonuses",
        destination: "/ru/bonuses",
      },
      {
        source: "/ru/mirror",
        destination: "/ru/mirror",
      },
      {
        source: "/ru/download",
        destination: "/ru/download",
      },
      {
        source: "/ru/payment",
        destination: "/ru/payment",
      },
      // Аналогично для английской версии
      {
        source: "/en/slots",
        destination: "/en/slots",
      },
      {
        source: "/en/bonuses",
        destination: "/en/bonuses",
      },
      {
        source: "/en/mirror",
        destination: "/en/mirror",
      },
      {
        source: "/en/download",
        destination: "/en/download",
      },
      {
        source: "/en/payment",
        destination: "/en/payment",
      },
    ];
  },
};

export default nextConfig;
