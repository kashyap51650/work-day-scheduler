"use client";

import { useEffect } from "react";
import {
  ExclamationTriangleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-white px-4 py-20">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center border border-red-100">
        <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-red-700 mb-2">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          Sorry, an unexpected error occurred. Please try again or contact
          support if the problem persists.
        </p>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition cursor-pointer"
        >
          <ArrowPathIcon className="w-5 h-5" />
          Try Again
        </button>
        <div className="mt-6 text-xs text-gray-400 select-all">
          {error?.message}
        </div>
      </div>
    </div>
  );
}
