import { AuthForm } from "@/modules/authform/AuthForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col gap-4 items-center">
      <h1 className="font-bold text-2xl">Register</h1>
      <AuthForm action={"register"} />
    </div>
  );
};

export default RegisterPage;
