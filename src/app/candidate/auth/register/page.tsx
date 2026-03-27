import Button from "@/components/Button";
import Link from "next/link";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col gap-4 items-center">
      <h1 className="font-bold text-2xl">Register</h1>
      <form className="p-8 border border-white/30 rounded-2xl flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Enter your email here</label>
          <input
            className="border border-white/30 p-2 px-4 rounded-lg focus:border-white/60! focus:outline-none transition-colors"
            name="email"
            id="email"
            type="email"
            autoComplete="email@gmail.com"
            placeholder="email@gmail.com"
            required
          />
          <p className="text-red-400">display potential error here</p>
        </div>
        <Button type="submit" className="w-full mt-4">
          Submit
        </Button>
        <Button type="reset" className="w-full" variant="outline">
          Reset
        </Button>

        <hr className="w-full my-4 text-white/30" />

        <p className="text-sm">
          Already have an account?{" "}
          <Link
            href="/candidate/auth/login"
            className="!text-blue-400 underline"
          >
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
