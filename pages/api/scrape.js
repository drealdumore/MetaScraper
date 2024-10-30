import axios from "axios";
import cheerio from "cheerio";

const cache = new Map();

export default async function handler(req, res) {
  const { url } = req.query;

  try {
    new URL(url);
  } catch (e) {
    return res.status(400).json({
      error:
        "Oops! That doesn't look like a valid URL. Please check and try again.",
    });
  }

  if (!url.startsWith("https://") && !url.startsWith("http://")) {
    return res.status(400).json({
      error: "Please make sure your URL starts with 'https://' or 'http://'.",
    });
  }

  if (cache.has(url)) {
    return res.status(200).json(cache.get(url));
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

    const hasDefaultValues = Object.values(metadata).some(
      (value) => value.includes("not found") || value.includes("available")
    );

    const responseData = {
      metadata,
      hasInsufficientMetadata: hasDefaultValues,
    };

    cache.set(url, responseData);

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching URL:", error.message);

    if (axios.isAxiosError(error)) {
      return res.status(500).json({
        error: "Network error while fetching the URL. Please try again later.",
      });
    } else if (error.response && error.response.status) {
      return res.status(error.response.status).json({
        error: `Received a ${error.response.status} response from the server.`,
      });
    } else {
      return res
        .status(500)
        .json({ error: "An unexpected error occurred. Please try again." });
    }
  }
}
