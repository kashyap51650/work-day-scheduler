import React from "react";

interface TaskActionButtonProps {
  onClick: (e: React.MouseEvent) => void;
  icon: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

export const TaskActionButton = ({
  onClick,
  icon,
  className = "",
  "aria-label": ariaLabel,
}: TaskActionButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`bg-white rounded p-1 shadow cursor-pointer transition hover:bg-indigo-100 focus:outline-none ${className}`}
    tabIndex={-1}
    aria-label={ariaLabel}
  >
    {icon}
  </button>
);
