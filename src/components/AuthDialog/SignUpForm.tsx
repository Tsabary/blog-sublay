"use client";

import React, { useState } from "react";
import validator from "validator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import GitHubButton from "./GitHubButton";
import GoogleButton from "./GoogleButton";
import useAuth from "../../hooks/useAuth";

export default function SignupForm({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const { signUpWithEmailAndPassword } = useAuth();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  async function handleSubmit() {
    if (isSubmitting) return;
    try {
      if (!validator.isEmail(credentials.email)) {
        throw new Error("email|Invalid email");
      }

      if (credentials.password.length < 8) {
        throw new Error("password|Password is too short");
      }

      setIsSubmitting(true);

      await signUpWithEmailAndPassword!(
        credentials.email,
        credentials.password
      );
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

      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name-signup">Full Name</Label>
        <Input id="name-signup" type="text" placeholder="John Doe" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email-signup">Email</Label>
        <Input
          id="email-signup"
          type="email"
          placeholder="name@replyke.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-signup">Password</Label>
        <Input id="password-signup" type="password" required />
      </div>
      <Button type="submit" className="w-full">
        Create Account
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
        <GitHubButton />
        <GoogleButton />
      </div>
    </form>
  );
}
