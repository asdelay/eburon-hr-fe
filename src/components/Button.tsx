import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "outline";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  ...props
}) => {
  return (
    <button
      className={`p-2 px-4 rounded-2xl border duration-150 cursor-pointer ${
        variant === "default"
          ? "bg-white/80 text-black hover:bg-white/90"
          : "bg-transparent text-white border-white/50 hover:border-white/80 hover:bg-white/10"
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
