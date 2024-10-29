// THIS IS THE OLD SCRAPE JS THAT SCRAPES EVEN THO THE METADATA ISN'T AVAILABLE
// SOME RESPONSE:::
// {
//     "title": "TikTok - Make Your Day",
//     "description": "No description available",
//     "keywords": "No keywords available",
//     "author": "No author available",
//     "robots": "No robots directives available",
//     "ogImage": "No image available",
//     "ogType": "No Open Graph type available",
//     "ogUrl": "https://www.tiktok.com/en/",
//     "ogLocale": "No locale available",
//     "canonical": "https://www.tiktok.com/en/",
//     "socialLinks": "No social media links available"
//   }
// NOT GOOD.

"use server";

import axios from "axios";
import cheerio from "cheerio";

export default async function handler(req, res) {
  let { url } = req.query;

  try {
    new URL(url);
  } catch (e) {
    return res
      .status(400)
      .json({ error: "Invalid URL. Please provide a valid URL." });
  }

  if (!url.startsWith("https://") && !url.startsWith("http://")) {
    return res
      .status(400)
      .json({ error: "URL must include 'https://' or 'http://'." });
  }

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const title =
      $("head title").text() || $('meta[property="og:title"]').attr("content");
    const description =
      $('meta[name="description"]').attr("content") ||
      $('meta[property="og:description"]').attr("content");
    const keywords = $('meta[name="keywords"]').attr("content");
    const author = $('meta[name="author"]').attr("content");

    const robots =
      $('meta[name="robots"]').attr("content") ||
      "No robots directives available";

    const ogImage = $('meta[property="og:image"]').attr("content");
    const ogTitle = $('meta[property="og:title"]').attr("content");
    const ogDescription = $('meta[property="og:description"]').attr("content");
    const twitterImage = $('meta[name="twitter:image"]').attr("content");
    const twitterTitle = $('meta[name="twitter:title"]').attr("content");
    const twitterDescription = $('meta[name="twitter:description"]').attr(
      "content"
    );

    const canonical = $('link[rel="canonical"]').attr("href");

    const ogType = $('meta[property="og:type"]').attr("content");
    const ogUrl = $('meta[property="og:url"]').attr("content");
    const ogLocale = $('meta[property="og:locale"]').attr("content");

    const socialLinks = [];
    $("a[href]").each((_, element) => {
      const link = $(element).attr("href");
      if (link.includes("twitter.com"))
        socialLinks.push({ platform: "Twitter", url: link });
      if (link.includes("facebook.com"))
        socialLinks.push({ platform: "Facebook", url: link });
      if (link.includes("linkedin.com"))
        socialLinks.push({ platform: "LinkedIn", url: link });
      if (link.includes("instagram.com"))
        socialLinks.push({ platform: "Instagram", url: link });
    });

    const metadata = {
      title: title || ogTitle || twitterTitle || "No title available",
      description:
        description ||
        ogDescription ||
        twitterDescription ||
        "No description available",
      keywords: keywords || "No keywords available",
      author: author || "No author available",
      robots: robots || "No robots directives available",
      ogImage: ogImage || twitterImage || "No image available",
      ogType: ogType || "No Open Graph type available",
      ogUrl: ogUrl || url,
      ogLocale: ogLocale || "No locale available",
      canonical: canonical || url,
      socialLinks:
        socialLinks.length > 0
          ? socialLinks
          : "No social media links available",
    };

    res.status(200).json(metadata);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Failed to scrape the URL. Please ensure the site is reachable and the URL is correct.",
    });
  }
}
