import axios from "axios";
import cheerio from "cheerio";

// Simple in-memory cache
const cache = new Map();

export default async function handler(req, res) {
  const { url } = req.query;

  // URL Validation
  try {
    new URL(url);
  } catch (e) {
    return res.status(400).json({
      error:
        "Oops! That doesn't look like a valid URL. Please check and try again.",
    });
  }

  // Check if URL starts with http or https
  if (!url.startsWith("https://") && !url.startsWith("http://")) {
    return res.status(400).json({
      error: "Please make sure your URL starts with 'https://' or 'http://'.",
    });
  }

  // Check cache
  if (cache.has(url)) {
    return res.status(200).json(cache.get(url));
  }

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Extract metadata
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

    // Prepare metadata object
    const metadata = {
      title: title || ogTitle || twitterTitle || "Title not found",
      description:
        description ||
        ogDescription ||
        twitterDescription ||
        "Description not found",
      keywords: keywords || "No keywords available",
      author: author || "Author not specified",
      robots: robots || "No robots directives available",
      ogImage: ogImage || twitterImage || "No image available",
      ogType: ogType || "Open Graph type not found",
      ogUrl: ogUrl || url,
      ogLocale: ogLocale || "Locale not specified",
      canonical: canonical || url,
      socialLinks:
        socialLinks.length > 0 ? socialLinks : "No social media links found",
    };

    // Check for default values in metadata
    const hasDefaultValues = Object.values(metadata).some(
      (value) => value.includes("not found") || value.includes("available")
    );

    if (hasDefaultValues) {
      return res
        .status(400)
        .json({ error: "The URL you provided doesn't have enough metadata." });
    }

    // Cache the result
    cache.set(url, metadata);

    // Return the metadata if all checks pass
    res.status(200).json(metadata);
  } catch (error) {
    console.error("Error fetching URL:", error.message);

    console.error(error);
    res.status(500).json({
      error:
        "Oops! We couldn't fetch the data from that URL. Please ensure the site is accessible and the URL is correct.",
    });
  }
}
