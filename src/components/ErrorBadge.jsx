import React from "react";

const ErrorBadge = ({ error }) => {
  return (
    <>
      <p
        className="text-[#f93a37] mx-auto max-w-md bg-red-500/10 border border-[#f93a3726] rounded-sm px-2 py-[2px] text-sm cursor-pointer flex shrink-0 w-auto text-center"
        aria-label={`Error: ${error}`}
      >
        {error}
      </p>
    </>
  );
};

export default ErrorBadge;
