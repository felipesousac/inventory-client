import http from "@/http";
import { TokenStore } from "@/utils/TokenStore";
import axios from "axios";
import { ComponentProps, createContext, useContext } from "react";

interface LoginProps {
  username: string;
  userPass: string;
}

const UserSessionContext = createContext({
  userIsLogged: false,
  login: ({ username, userPass }: LoginProps) => null,
  logout: () => null,
  profile: {},
});

export function useUserSessionContext() {
  return useContext(UserSessionContext);
}

export function UserSessionProvider({ children }: ComponentProps<any>) {
  async function login({ username, userPass }: LoginProps) {
    await http
      .post("/auth", {
        username,
        userPass,
      })
      .then((response) => {
        TokenStore.setToken(response.data.token);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const value = {
    login,
  };

  return (
    <UserSessionContext.Provider value={value}>
      {children}
    </UserSessionContext.Provider>
  );
}
