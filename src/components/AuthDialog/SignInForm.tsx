"use client";

import React, { useState } from "react";
import { handleError } from "@replyke/react-js";
import validator from "validator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "../ui/separator";
import GitHubAuthButton from "./GitHubAuthButton";
import GoogleAuthButton from "./GoogleAuthButton";
import useAuth from "../../hooks/useAuth";

export default function SignInForm({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const { signInWithEmailAndPassword } = useAuth();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isSubmitting) return;
    try {
      if (!validator.isEmail(credentials.email)) {
        throw new Error("email|Please enter a valid email");
      }

      if (credentials.password.length < 6) {
        throw new Error("password|Please enter a valid password");
      }

      setIsSubmitting(true);

      await signInWithEmailAndPassword!({
        email: credentials.email,
        password: credentials.password,
      });
      setOpen(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        let errorMessage = err.message;
        let errorKey = "form";

        if (
          err.message.includes("email|") ||
          err.message.includes("password|") ||
          err.message.includes("repeatPassword|")
        ) {
          const parts: string[] = err.message.split("|");
          errorKey = parts[0];
          errorMessage = parts[1];
        }

        setErrors((errs) => ({ ...errs, [errorKey]: errorMessage }));
      }
      handleError(err, "Failed to sign in: ");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email-login">Email</Label>
        <Input
          id="email-login"
          type="email"
          onChange={(event) =>
            setCredentials((cs) => ({
              ...cs,
              email: event.target.value.trim(),
            }))
          }
          placeholder="name@replyke.com"
          required
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password-login">Password</Label>
          <a
            href="/forgot-password"
            className="text-xs text-muted-foreground hover:text-primary"
          >
            Forgot password?
          </a>
        </div>
        <Input
          id="password-login"
          type="password"
          onChange={(event) =>
            setCredentials((cs) => ({
              ...cs,
              password: event.target.value.trim(),
            }))
          }
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
      {errors.form && (
        <p className="text-xs text-red-600 mt-2">{errors.form}</p>
      )}

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <GitHubAuthButton />
        <GoogleAuthButton />
      </div>
    </form>
  );
}
