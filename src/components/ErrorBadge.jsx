import React from "react";

const ErrorBadge = ({ error }) => {
  return (
    <>
      <p className="text-red-500 mx-auto max-w-md bg-red-500/10 border border-red-500 rounded-sm px-2 py-[2px] text-sm cursor-pointer flex shrink-0 w-auto text-center">
        {error}
      </p>
    </>
  );
};

export default ErrorBadge;
