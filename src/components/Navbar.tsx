import { useAuth } from "@/contexts/authProvider/useAuth";
import { LucideComponent, LucideHome, LucideLogOut } from "lucide-react";
import { Link } from "react-router-dom";

export function Navbar() {
  const { username, logout } = useAuth();

  return (
    <div className="w-full bg-[#436850] shadow-xl">
      <div className="mx-auto max-w-6xl text-[#FBFADA] p-4 flex items-center justify-between">
        <div className="text-xl flex gap-2 items-center p-2">
          <LucideComponent /> <span>Inventory</span>
        </div>
        <div className="flex items-center gap-5">
          {username && (
            <>
              <Link
                to="/home"
                className="hover:bg-[#12372A] rounded-full p-2 transition-colors"
              >
                <LucideHome />
              </Link>
              <button
                onClick={logout}
                className="hover:bg-[#12372A] rounded-full p-2 transition-colors"
              >
                <LucideLogOut />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
