import React from "react";
import Link from "next/link";

const Badge = ({ title, href, aria }) => {
  return (
    <div className="flex">
      <Link
        href={href}
        target="_blank"
        className="inline-flex"
        aria-label={aria}
      >
        <span className="relative inline-block overflow-hidden rounded-full p-[1px]">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a9a9a9_0%,#0c0c0c_50%,#a9a9a9_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#171717_0%,#737373_50%,#171717_100%)]"></span>
          <div className="inline-flex h-full w-full cursor-pointer font-semibold justify-center rounded-full bg-white px-3 py-1 text-xs leading-5 text-neutral-600 backdrop-blur-xl dark:bg-black dark:text-neutral-200">
            {title}
          </div>
        </span>
      </Link>
    </div>
  );
};

export default Badge;
