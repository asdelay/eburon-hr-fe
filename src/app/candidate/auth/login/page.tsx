import Button from "@/components/Button";
import Link from "next/link";
import React from "react";
import { login } from "../actions";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col gap-4 items-center">
      <h1 className="font-bold text-2xl">Log In</h1>
      <form
        action={login}
        className="p-8 border border-white/30 rounded-2xl flex flex-col gap-2"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Enter your email here</label>
          <input
            name="email"
            id="email"
            type="email"
            autoComplete="email@gmail.com"
            placeholder="email@gmail.com"
            required
            className="border border-white/30 p-2 px-4 rounded-lg focus:border-white/60! focus:outline-none transition-colors"
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
          Dont have an account yet?{" "}
          <Link
            href="/candidate/auth/register"
            className="!text-blue-400 underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
