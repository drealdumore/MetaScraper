"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { customImageLoader } from "@/utils/customImageLoader";
import Spinner from "@/components/Spinner"; // Import the Spinner component

export default function Home() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleScrape = async () => {
    setLoading(true); // Set loading to true when the request starts
    setError("");
    setData(null);
    try {
      const response = await fetch(`/api/scrape?url=${url}`);
      const result = await response.json();
      if (response.ok) {
        setData(result);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An error occurred while fetching data");
    } finally {
      setLoading(false); // Set loading to false when the request ends
    }
  };

  const formatUrl = (url) => {
    try {
      const { hostname } = new URL(url);
      return hostname.replace(/^www\./, "");
    } catch (error) {
      console.error("Invalid URL", error);
      return url;
    }
  };

  return (
    <main className="mx-auto my-16 flex max-w-xl flex-col items-center gap-4">
      <div className="mx-auto my-16 flex max-w-xl flex-col items-center gap-4">
        <div className="flex">
          <Link
            href="https://github.com/Drealdumore/MetaScraper"
            target="_blank"
            className="inline-flex"
          >
            <span className="relative inline-block overflow-hidden rounded-full p-[1px]">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a9a9a9_0%,#0c0c0c_50%,#a9a9a9_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#171717_0%,#737373_50%,#171717_100%)]"></span>
              <div className="inline-flex h-full w-full cursor-pointer font-semibold justify-center rounded-full bg-white px-3 py-1 text-xs leading-5 text-neutral-600 backdrop-blur-xl dark:bg-black dark:text-neutral-200">
                Proudly Open Source ⚡️
              </div>
            </span>
          </Link>
        </div>

        <h1 className="text-center font-cal font_cal text-5xl leading-tight bg-gradient-to-tl from-0% from-[hsl(var(--muted))] to-30% to-[hsl(var(--foreground))] bg-clip-text text-transparent">
          MetaScraper.
        </h1>
        <h2 className="mx-auto max-w-md text-center text-lg text-muted-foreground md:max-w-xl md:text-xl">
          Easily extract and retrieve metadata from any website, including the
          title, OG image, and description.
        </h2>
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL"
          className="duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)]"
        />

        <button
          className="relative rounded-md bg-neutral-950 px-5 py-2 text-white duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:tranneutral-y-1 active:scale-x-110 active:scale-y-90"
          type="submit"
          onClick={handleScrape}
        >
          Scrape
        </button>
      </div>
      {loading && <Spinner />} {/* Show the Spinner while loading */}
      {error && <div>Error: {error}</div>}
      {data && (
        <Link
          className="thumbnail-shadow flex aspect-auto min-w-0 cursor-pointer flex-col gap-4 overflow-hidden rounded-xl bg-white p-4 transition-colors duration-300 hover:bg-gray-100"
          href={data.url}
          target="_blank"
        >
          <span className="aspect-[1200/630] overflow-hidden rounded-lg">
            <Image
              loader={customImageLoader}
              src={data.ogImage}
              alt={data.title}
              width="1200"
              height="630"
              loading="eager"
              className="aspect-[1200/630] animate-reveal rounded-lg border bg-cover bg-center bg-no-repeat object-cover"
            />
          </span>
          <div className="flex flex-col gap-1">
            <h2 className="line-clamp-4 text-lg leading-snug">{data.title}</h2>
            <span className="line-clamp-4 inline-flex items-center gap-1 text-sm text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-link2 "
              >
                <path d="M9 17H7A5 5 0 0 1 7 7h2"></path>
                <path d="M15 7h2a5 5 0 1 1 0 10h-2"></path>
                <line x1="8" x2="16" y1="12" y2="12"></line>
              </svg>
              {formatUrl(data.url)}
            </span>
            <span className="line-clamp-6 text-sm">{data.description}</span>
          </div>
        </Link>
      )}
    </main>
  );
}
