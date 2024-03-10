import { useUserSessionContext } from "@/contexts/UserSession";
import { TokenStore } from "@/utils/TokenStore";
import {
  LucideComponent,
  LucideHome,
  LucideSettings,
  LucideLogIn,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  const { userIsLogged } = useUserSessionContext();
  console.log(`userIsLogged: ${userIsLogged}`);

  return (
    <div className="w-full bg-[#436850] shadow-xl">
      <div className="mx-auto max-w-6xl text-[#FBFADA] p-4 flex items-center justify-between">
        <div className="text-xl flex gap-2 items-center">
          <LucideComponent /> <span>Inventory</span>
        </div>
        <div className="flex items-center gap-5">
          {userIsLogged && (
            <>
              <Link
                to="/"
                className="hover:bg-[#12372A] rounded-full p-2 transition-colors"
              >
                <LucideHome />
              </Link>
              <button className="hover:bg-[#12372A] rounded-full p-2 transition-colors">
                <LucideSettings />
              </button>
            </>
          )}
          {!userIsLogged && (
            <button className="hover:bg-[#12372A] rounded-full p-2 transition-colors">
              <LucideLogIn />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
