import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
        <h2 className="text-2xl font-font_cal font-semibold mb-4">
          Couldn't find your page
        </h2>
        <p className="mb-6 text-zinc-500 text-center">
          We searched everywhere but couldn't find the page you were looking
          for.
          <br />
          <br />
          If you encountered this page by a bug, please report it to me, the
          creator of it, on X:{" "}
          <Link
            target="_blank"
            className="text-black font-font_cal font-medium underline underline-offset-2 hover:no-underline"
            href="https://x.com/drealdumore"
          >
            @drealdumore
          </Link>
        </p>
        <Link
          className="h-10 truncate px-4 gap-2 md:w-auto w-full font-medium flex items-center justify-center bg-black text-white shadow-md shadow-black/5 transition-colors hover:bg-zinc-800 rounded-lg"
          href="/"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
