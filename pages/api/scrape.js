"use server";

import axios from "axios";
import cheerio from "cheerio";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    // Fetch the HTML content of the URL
    const { data } = await axios.get(url);

    // Load the HTML content into cheerio
    const $ = cheerio.load(data);

    // Extract the title
    const title = $("head title").text();

    // Extract the meta description
    const description =
      $('meta[name="description"]').attr("content") ||
      $('meta[name="Description"]').attr("content");

    // Extract the og:image
    const ogImage = $('meta[property="og:image"]').attr("content");

    console.log({ title, description, ogImage, url });

    // Respond with the extracted information
    res.status(200).json({ title, description, ogImage, url });
  } catch (error) {
    res.status(500).json({ error: "Failed to scrape the URL" });
  }
}
