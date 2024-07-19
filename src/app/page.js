"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import ErrorBadge from "@/components/ErrorBadge";

export default function Home() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleScrape = async (e) => {
    e.preventDefault();

    if (!url) {
      setError("Please enter a URL");
      return;
    }

    setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto my-16 flex max-w-xl flex-col items-center gap-4">
      <div className="mx-auto my-16 flex max-w-xl flex-col items-center gap-4">
        <Badge title="Proudly Open Source ⚡️" />

        <h1 className="text-center font-cal font_cal text-5xl leading-tight bg-gradient-to-tl from-0% from-[hsl(var(--muted))] to-30% to-[hsl(var(--foreground))] bg-clip-text text-transparent">
          MetaScraper.
        </h1>
        <h2 className="mx-auto max-w-md text-center text-lg text-muted-foreground md:max-w-xl md:text-xl">
          Easily extract and retrieve metadata from any website, including the
          title, OG image, and description.
        </h2>
      </div>
      <form
        className="flex w-full max-w-sm items-center space-x-2"
        onSubmit={handleScrape}
      >
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
        >
          Scrape
        </button>
      </form>

      {loading && <Spinner />}

      {error && <ErrorBadge error={`Error: ${error}`} />}

      {data && (
        <div className="mx-auto my-16 flex max-w-xl flex-col items-center gap-4">
          <Card data={data} />
        </div>
      )}
    </main>
  );
}
