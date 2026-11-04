import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old static-site addresses keep working after the switch.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/projects.html", destination: "/projects", permanent: true },
    ];
  },
};

export default nextConfig;
