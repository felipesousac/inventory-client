import { createContext, useEffect, useState } from "react";
import { IContext, IAuthProvider, IUser } from "./types";
import {
  LoginRequest,
  getUsernameSessionStorage,
  setUsernameSessionStorage,
} from "./util";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    const user = getUsernameSessionStorage();

    if (user) {
      setUser(user);
    }
  }, []);

  async function authenticate(username: string, userPass: string) {
    try {
      const response = await LoginRequest(username, userPass);

      const payload = {
        token: response.token,
        username,
      };

      if (payload.token) {
        setUser(payload);
        setUsernameSessionStorage(payload);
        window.location.href = "/home";
      }
    } catch (error) {
      console.log("Cheguei no erro agora");
    }
  }

  function logout() {
    sessionStorage.removeItem("u");
    window.location.href = "/";
  }

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
