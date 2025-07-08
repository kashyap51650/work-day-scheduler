import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import React from "react";

export const ErrorAlert: React.FC<{ error: string }> = ({ error }) => {
  return (
    <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-800 rounded-lg px-3 py-2 text-sm font-medium animate-fade-in">
      <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
      <span>{error}</span>
    </div>
  );
};
