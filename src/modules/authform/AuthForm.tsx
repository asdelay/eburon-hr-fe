"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { login, register } from "./api";
import { toast } from "sonner";

interface AuthFormProps {
  action: "register" | "login";
}

const formSchema = z.object({
  email: z.email(),
});

export const AuthForm: React.FC<AuthFormProps> = ({ action }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsWaiting(true);
    setIsSent(true);

    setTimeout(() => {
      setIsWaiting(false);
    }, 3000);

    try {
      setIsLoading(true);
      if (action === "login") {
        await login(data.email);
      } else {
        await register(data.email);
      }
    } catch (error) {
      toast.error(error + "");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="p-8 border border-white/30 rounded-2xl flex flex-col gap-2"
    >
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-email">With Email</FieldLabel>
              <Input
                {...field}
                id="form-email"
                aria-invalid={fieldState.invalid}
                placeholder="email@test.com"
                autoComplete="on"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit" disabled={isLoading || isWaiting} className="mt-4">
        {isLoading ? "Loading..." : isWaiting ? "Wait..." : "Submit"}
      </Button>
      {isSent && action === "login" ? (
        <p className="text-sm text-white/30">
          If an account with this email exists,
          <br />a confirmation link has been sent.
        </p>
      ) : ''}
      <Button
        variant="outline"
        type="reset"
        onClick={() => {
          form.reset();
          setIsLoading(false);
        }}
      >
        Reset
      </Button>

      {/* <div className="flex items-center text-white/30 my-4 gap-2">
        <hr className="w-full" />
        <p>or</p>
        <hr className="w-full text-white/30" />
      </div> */}

      {/* <Link
        href="/candidate/auth/register"
        className="!text-blue-400 underline"
      >
        With Google (to be implemented)
      </Link> */}

      <hr className="w-full my-4 text-white/30" />

      <p className="text-sm">
        {action === "login"
          ? "Dont have an account yet? "
          : "Already have an account? "}
        <Link
          href={`/candidate/auth/${action === "login" ? "register" : "login"}`}
          className="!text-blue-400 underline"
        >
          {action === "login" ? "Register" : "Login"}
        </Link>
      </p>
    </form>
  );
};
