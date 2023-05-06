require("dotenv").config();
const randomBytes = require("crypto").randomBytes(32).toString("hex");
const isDevEnv = process.env.NODE_ENV !== "production";

const repoName = "speed-bingo-template"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: isDevEnv ? "" : `/${repoName}`,
  output: "export",
  distDir: "out",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_PASSWORD: randomBytes,
    NEXT_PUBLIC_REPONAME: isDevEnv ? "" : repoName
  },
};

module.exports = nextConfig;
