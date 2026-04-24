import { AuthForm } from "@/modules/authform/AuthForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col gap-4 items-center">
      <h1 className="font-bold text-2xl">Log In</h1>
      <AuthForm action={"login"} />
    </div>
  );
};

export default LoginPage;
