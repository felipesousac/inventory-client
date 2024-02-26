import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export type DivProps = ComponentProps<"div">;

export function SpinLoader({ className }: DivProps) {
  return (
    <div
      className={twMerge(
        "animate-spin rounded-full w-8 h-8 border-2 border-t-[#12372A] border-l-[#12372A] border-b-[#12372A] border-r-transparent",
        className
      )}
    />
  );
}
