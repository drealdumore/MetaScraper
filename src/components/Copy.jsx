"use client";

import { useState } from "react";

const CopyButton = ({ source }) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = async () => {
    if (!source) {
      console.error("No text to copy");
      return;
    }

    try {
      const textToCopy = JSON.stringify(source, null, 2);
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleHover = () => {
    setTimeout(() => setIsHovered(false), 1500);
  };

  return (
    <div className="relative">
      {(copied || isHovered) && (
        <div
          style={{ position: "absolute", top: "-29px", right: "-23px" }}
          className="tooltip"
        >
          {copied ? "Copied!" : "Copy data"}
        </div>
      )}

      <button
        className="copy-button"
        onClick={handleCopy}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleHover}
        aria-label={copied ? "Copied" : "Copy source"}
        disabled={copied}
      >
        <div className="transition-all scale-100 cursor-pointer opacity-100 h-[12px]">
          {copied ? <Success /> : <Copy />}
        </div>
      </button>
    </div>
  );
};

export default CopyButton;

const Copy = () => {
  return (
    <svg
      className="fill-current"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
    >
      <path d="M3 2.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5ZM10 1H3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm3 5.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5v-1H5v1a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1v1.5Z" />
    </svg>
  );
};

const Success = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
    >
      <path
        fill="#10B981"
        d="M14.548 3.488a.75.75 0 0 1-.036 1.06l-8.572 8a.75.75 0 0 1-1.023 0l-3.429-3.2a.75.75 0 0 1 1.024-1.096l2.917 2.722 8.06-7.522a.75.75 0 0 1 1.06.036Z"
      ></path>
    </svg>
  );
};
