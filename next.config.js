/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    loader: "custom",
    loaderFile: "./src/utils/customImageLoader.js",
  },
};

module.exports = nextConfig;
