"use client";
import React, { useEffect, useState } from "react";

interface CurrentTimeBarProps {
  week?: boolean;
}

export const CurrentTimeBar: React.FC<CurrentTimeBarProps> = ({
  week = false,
}) => {
  const [now, setNow] = useState(new Date());

  // Update every minute
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate top offset as percentage of the day
  const minutes = now.getHours() * 60 + now.getMinutes();
  const top = (minutes / (24 * 60)) * 100;

  return (
    <div
      className="absolute left-0 right-0 z-20 pointer-events-none"
      style={{
        top: `${top}%`,
      }}
    >
      <div className={`flex items-center`}>
        <div className="w-2 h-2 rounded-full bg-red-500 shadow mr-1" />
        <div
          className={`h-0.5 bg-red-500`}
          style={{
            width: week ? "100%" : "calc(100% - 10px)",
          }}
        />
      </div>
    </div>
  );
};
