"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      modalRef.current?.focus();
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        tabIndex={-1}
        ref={modalRef}
      >
        <div className="rounded-lg border shadow-sm w-full max-w-xs sm:max-w-sm md:max-w-md bg-white">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex items-center justify-between">
              <h3
                className="tracking-tight text-xl font-bold flex items-center gap-2"
                id="modal-title"
              >
                <WarningIcon />
                Insufficient Metadata
              </h3>
              <button
                className="h-8 w-8 inline-flex items-center bg-input/65 justify-center rounded-md text-neutral-700 hover:text-neutral-950 hover:bg-input focus:outline-none"
                onClick={onClose}
                aria-label="Close modal"
                aria-describedby="close-modal-description"
              >
                <CancelIcon />
              </button>
            </div>
          </div>
          <div className="p-6 pt-0">
            <p id="modal-description" className="text-muted-foreground">
              The URL you provided does not contain enough metadata. Do you
              still want to view the results?
            </p>
          </div>
          <div className="flex justify-end space-x-2 p-6">
            <Button
              label="Cancel"
              onClick={onClose}
              className="bg-red-400 hover:bg-red-500"
            />
            <Button
              label="Yes, show me"
              onClick={onConfirm}
              className="bg-neutral-800 hover:bg-neutral-950"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const Button = ({ label, onClick, className }) => (
  <button
    className={`px-4 py-2 rounded-md text-white transition-all text-sm duration-100 ${className}`}
    onClick={onClick}
    aria-label={label}
  >
    {label}
  </button>
);

const WarningIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6 text-yellow-400"
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

const CancelIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export default ConfirmationModal;
