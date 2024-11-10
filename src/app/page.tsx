import { LoginForm } from "@/components/login-form";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col gap-10 justify-center items-center">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome <span className="text-purple-700">!Admin</span>
        </h1>
      </div>
      <LoginForm />
    </div>
  );
}
