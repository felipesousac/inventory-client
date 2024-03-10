import http from "@/http";
import { TokenStore } from "@/utils/TokenStore";
import React, { createContext, useContext } from "react";

interface LoginProps {
  username: string;
  userPass: string;
}

export type ProfileProps = {
  username: string;
  token: string;
};

type AuthContextProps = {
  userIsLogged: boolean;
  login: ({ username, userPass }: LoginProps) => void;
  logout: () => void;
  profile: string;
};

const UserSessionContext = createContext<AuthContextProps>({
  userIsLogged: false,
  login: ({}: LoginProps) => null,
  logout: () => null,
  profile: "",
});

export function useUserSessionContext() {
  return useContext(UserSessionContext);
}

export function UserSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  async function login({ username, userPass }: LoginProps) {
    await http
      .post("/auth", {
        username,
        userPass,
      })
      .then((response) => {
        TokenStore.setToken(response.data.token);
        window.location.href = "/home";
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const userIsLogged = TokenStore.getToken != null;

  function logout() {
    TokenStore.logout();
    window.location.href = "/login";
  }

  //Como retornar dados do perfil?
  const profile = "admin";

  const value = {
    login,
    userIsLogged,
    profile,
    logout,
  };

  return (
    <UserSessionContext.Provider value={value}>
      {children}
    </UserSessionContext.Provider>
  );
}
