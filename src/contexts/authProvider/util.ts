import http from "@/http";
import { IUser } from "./types";

export async function LoginRequest(username: string, userPass: string) {
  try {
    const request = await http.post("/auth", { username, userPass });
    return request.data;
  } catch (error) {
    throw error;
  }
}

export function setUsernameSessionStorage(username: IUser | null) {
  sessionStorage.setItem("u", JSON.stringify(username));
}

export function getUsernameSessionStorage() {
  const json = sessionStorage.getItem("u");

  if (!json) {
    return null;
  }

  const username = JSON.parse(json);

  return username ?? null;
}

export function getTokenData() {
  const json = sessionStorage.getItem("u");

  if (!json) {
    return null;
  }

  const token = JSON.parse(json);

  return token.token ?? null;
}
