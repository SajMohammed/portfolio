"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TextColorProps {
  firstLine?: string;
  className?: string;
}

export function TextColor({
  firstLine = "Hello",
  className = ""
}: TextColorProps) {
  return (
    <div className={cn("w-full", className)}>
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-left">
        <span className="gradient-text">
          {firstLine}
        </span>
      </h1>
    </div>
  );
}
