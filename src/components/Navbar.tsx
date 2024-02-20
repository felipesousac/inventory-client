import { PlusCircle, Home, Component } from "lucide-react";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div className="w-full bg-[#436850] shadow-xl">
      <div className="mx-auto max-w-6xl text-[#FBFADA] p-4 flex items-center justify-between">
        <div className="text-xl flex gap-2 items-center">
          <Component /> <span>Inventory</span>
        </div>
        <div className="flex items-center gap-5">
          <Link
            to="/"
            className="hover:bg-[#12372A] rounded-full p-2 transition-colors"
          >
            <Home />
          </Link>
          <button className="hover:bg-[#12372A] rounded-full p-2 transition-colors">
            <PlusCircle />
          </button>
        </div>
      </div>
    </div>
  );
}
