import { Component, LucideHome, LucidePlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-pallete-green shadow-xl">
      <div className="mx-auto max-w-6xl text-pallete-light p-4 flex items-center justify-between">
        <div className="text-xl flex gap-2 items-center">
          <Component /> <span>Inventory</span>
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={() => navigate("/")}
            className="hover:bg-pallete-dark rounded-full p-2 transition-colors"
          >
            <LucideHome />
          </button>
          <button className="hover:bg-pallete-dark rounded-full p-2 transition-colors">
            <LucidePlusCircle />
          </button>
        </div>
      </div>
    </div>
  );
}
