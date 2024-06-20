import { SpinLoader } from "@/components/SpinLoader";
import { useAuth } from "@/contexts/authProvider/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFields = z.object({
  username: z.string().min(1, { message: "Required" }),
  userPass: z.string().min(1, { message: "Required" }),
});

type LoginFieldsSchema = z.infer<typeof loginFields>;

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [credentialsExMessage, setCredentialsExMessage] = useState("");

  const { authenticate } = useAuth();

  const { register, handleSubmit, formState } = useForm<LoginFieldsSchema>({
    resolver: zodResolver(loginFields),
  });

  async function tryLogin({ username, userPass }: LoginFieldsSchema) {
    try {
      setIsLogin(true);
      await authenticate(username, userPass);
    } catch (error: any) {
      setIsLogin(false);
      checkExStatus(error);
    }
  }

  function checkExStatus(error: any) {
    if (error.response.data.status == 401) {
      setIsInvalid(true);
      setCredentialsExMessage(error.response.data.title);
    }
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 max-w-md">
      <form
        onSubmit={handleSubmit(tryLogin)}
        className="w-full rounded-md border border-[#436850]/60 "
      >
        <fieldset
          disabled={isLogin}
          className="group flex flex-col items-center justify-center gap-4 py-4"
        >
          <div className="text-lg font-medium">Login</div>
          <div className="flex flex-col gap-2 w-2/3">
            <label htmlFor="username">Username</label>
            <input
              {...register("username")}
              type="text"
              id="username"
              placeholder="Username"
              className="px-1"
            />
            {formState.errors?.username?.message && (
              <p className="text-sm text-red-500">
                * {formState.errors.username.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-2/3">
            <label htmlFor="userPass">Password</label>
            <input
              {...register("userPass")}
              type="password"
              id="userPass"
              placeholder="Password"
              className="px-1"
            />
            {formState.errors?.userPass?.message && (
              <p className="text-sm text-red-500">
                * {formState.errors.userPass.message}
              </p>
            )}
          </div>
          {isInvalid && (
            <div className="flex flex-col gap-2 w-2/3 text-red-500 text-sm">
              {`* ${credentialsExMessage}`}
            </div>
          )}

          <button
            type="submit"
            className="group-disabled:pointer-events-none bg-[#436850] text-white px-3 py-1 rounded-md w-2/3 items-center justify-center flex"
          >
            <div className="absolute">
              <SpinLoader className="h-4 w-4 group-enabled:opacity-0 border-t-[#FBFADA] border-l-[#FBFADA] border-b-[#FBFADA]" />
            </div>
            <div className="gap-2 group-disabled:opacity-0">Login</div>
          </button>
        </fieldset>
      </form>
    </div>
  );
}
