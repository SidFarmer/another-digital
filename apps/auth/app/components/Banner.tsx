"use client";

import clsx from "clsx";
import { forwardRef } from "react";

type BannerProps = {
  tone: "success" | "error" | "info";
  children: React.ReactNode;
  className?: string;
};

export const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
  { tone, children, className },
  ref
) {
  return (
    <div
      ref={ref}
      role={tone === "error" ? "alert" : "status"}
      aria-live={tone === "error" ? "assertive" : "polite"}
      tabIndex={-1}
      className={clsx("banner", `banner-${tone}`, className)}
    >
      {children}
    </div>
  );
});
