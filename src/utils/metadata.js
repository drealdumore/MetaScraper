export const sharedMetadata = {
  title: "MetaScraper - Website Metadata Extractor",
  description:
    "Easily extract and retrieve metadata from any website, including the title, OG image, and description.",
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://meta-scrapper.vercel.app",
  ogImage: {
    width: 1200,
    height: 630,
    type: "image/png",
  },
  image: "./og.png",
};
