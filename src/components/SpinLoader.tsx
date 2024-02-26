import { HTMLAttributes } from "react";

export function SpinLoader({ className }: HTMLAttributes<string>) {
  return (
    <div className="w-full flex justify-center items-center">
      <div
        className={`animate-spin rounded-full w-8 h-8 border-2 border-t-[#12372A] border-l-[#12372A] border-b-[#12372A] border-r-transparent  ${className}`}
      />
    </div>
  );
}
