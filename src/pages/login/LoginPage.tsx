import { useUserSessionContext } from "@/contexts/UserSession";
import { FormEvent } from "react";

export function LoginPage() {
  const username = "felipe";
  const userPass = "123456";

  const { login, profile } = useUserSessionContext();

  console.log(profile);

  async function tryLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login({ username, userPass });
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 max-w-md">
      <form
        onSubmit={tryLogin}
        className="w-full rounded-md border border-[#436850]/60 flex flex-col items-center justify-center gap-4 py-4"
      >
        <div className="text-lg font-medium">Login</div>
        <div className="flex flex-col gap-2 w-2/3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            defaultValue="felipe"
          />
        </div>
        <div className="flex flex-col gap-2 w-2/3">
          <label htmlFor="userPass">Password</label>
          <input
            type="password"
            name="userPass"
            id="userPass"
            placeholder="Password"
            defaultValue="123456"
          />
        </div>
        <button
          type="submit"
          className="bg-[#436850] text-white px-3 py-1 rounded-md block w-2/3"
        >
          Login
        </button>
      </form>
    </div>
  );
}
