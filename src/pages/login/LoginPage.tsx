import { useAuth } from "@/contexts/authProvider/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFields = z.object({
  username: z.string().min(1),
  userPass: z.string().min(1),
});

type LoginFieldsSchema = z.infer<typeof loginFields>;

export function LoginPage() {
  const { authenticate } = useAuth();

  const { register, handleSubmit, formState } = useForm<LoginFieldsSchema>({
    resolver: zodResolver(loginFields),
  });

  async function tryLogin({ username, userPass }: LoginFieldsSchema) {
    await authenticate(username, userPass);
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 max-w-md">
      <form
        onSubmit={handleSubmit(tryLogin)}
        className="w-full rounded-md border border-[#436850]/60 flex flex-col items-center justify-center gap-4 py-4"
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
