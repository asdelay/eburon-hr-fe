import Link from "next/link";
import React from "react";

interface LinkButtonProps {
  children: React.ReactNode;
  variant?: "outline" | "default";
  href: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  href,
  variant = "default",
}) => {
  return (
    <Link
      href={href}
      className={`p-2 px-4 rounded-4xl border cursor-pointer duration-150 hover:scale-102 ${variant === "default" ? "bg-white/90 text-black" : ""}`}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
