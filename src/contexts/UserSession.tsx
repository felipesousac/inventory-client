import http from "@/http";
import { TokenStore } from "@/utils/TokenStore";
import React, { ComponentProps, createContext, useContext } from "react";
import { useNavigate } from "react-router";

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
  login: ({ username, userPass }: LoginProps) => null,
  logout: () => null,
  profile: "UserTeste",
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
        //const navigate = useNavigate();

        TokenStore.setToken(response.data.token);
        window.location.href = "/";
        //navigate("/home");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const userIsLogged = TokenStore.getToken != null;

  const value = {
    login,
    userIsLogged,
  };

  return (
    <UserSessionContext.Provider value={value}>
      {children}
    </UserSessionContext.Provider>
  );
}
