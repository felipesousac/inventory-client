import { PlusCircle, Home } from "lucide-react";

export function Navbar() {
  return (
    <div className="w-full bg-[#436850] shadow-xl">
      <div className="mx-auto max-w-6xl text-[#FBFADA] p-4 flex items-center justify-between">
        <div className="text-xl">Inventory</div>
        <div className="flex items-center gap-5">
          <button className="hover:bg-[#12372A] rounded-full p-2 transition-colors">
            <Home />
          </button>
          <button className="hover:bg-[#12372A] rounded-full p-2 transition-colors">
            <PlusCircle />
          </button>
        </div>
      </div>
    </div>
  );
}
