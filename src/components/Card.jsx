import React from "react";
import Image from "next/image";
import Link from "next/link";
import { customImageLoader } from "@/utils/customImageLoader";

const Card = ({ data }) => {
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
    <Link
      className="thumbnail-shadow max-w-xl flex aspect-auto min-w-0 cursor-pointer flex-col gap-4 overflow-hidden rounded-xl bg-white p-4 transition-colors duration-300 hover:bg-gray-100"
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
          <LinkSvg />
          {formatUrl(data.url)}
        </span>
        <span className="line-clamp-6 text-sm">{data.description}</span>
      </div>
    </Link>
  );
};

export default Card;

function LinkSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-link2 "
    >
      <path d="M9 17H7A5 5 0 0 1 7 7h2"></path>
      <path d="M15 7h2a5 5 0 1 1 0 10h-2"></path>
      <line x1="8" x2="16" y1="12" y2="12"></line>
    </svg>
  );
}
