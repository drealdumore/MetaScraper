"use client";

import { useState } from "react";
import ConfirmationModal from "@/components/Modal";
import Spinner from "@/components/Spinner";
import Badge from "@/components/Badge";
import ErrorBadge from "@/components/ErrorBadge";
import Card from "@/components/Card";

export default function Home() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingData, setPendingData] = useState(null);

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
      const response = await fetch(
        `/api/scrape?url=${encodeURIComponent(url)}`
      );
      const result = await response.json();

      if (response.ok) {
        if (result.hasInsufficientMetadata) {
          setPendingData(result.metadata);
          setIsModalOpen(true);
        } else {
          setData(result.metadata);
        }
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    setData(pendingData);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="mx-auto flex max-w-xl flex-col items-center gap-4">
      <div className="mx-auto my-16 flex max-w-xl flex-col items-center gap-4">
        <Badge
          title="Proudly Open Source ⚡️"
          href="https://github.com/Drealdumore/MetaScraper"
          aria="Visit the GitHub repository for MetaScraper"
        />

        <h1 className="text-center font-cal font_cal text-5xl leading-tight bg-gradient-to-tl from-0% from-[hsl(var(--muted))] to-30% to-[hsl(var(--foreground))] bg-clip-text text-transparent">
          MetaScraper.
        </h1>
        <h2 className="mx-auto max-w-md font-sans text-center text-lg text-muted-foreground md:max-w-xl md:text-xl">
          Easily extract and retrieve metadata from any website, including the
          title, OG image, and description.
        </h2>
      </div>

      <form
        className="flex w-full max-w-sm items-center space-x-2 px-2"
        onSubmit={handleScrape}
        aria-label="Metadata scraper form"
      >
        <input
          type="text"
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL"
          aria-label="Website URL input"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />

        <button
          disabled={!url}
          className="rounded-md bg-neutral-950 disabled:bg-neutral-950/75 px-5 py-2 text-white"
          type="submit"
          aria-label="Submit URL to scrape"
        >
          Scrape
        </button>
      </form>

      {loading && <Spinner />}
      {error && <ErrorBadge error={error} />}
      {data && <Card data={data} />}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </main>
  );
}
