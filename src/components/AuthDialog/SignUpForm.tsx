"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useCheckUsernameAvailability } from "@replyke/react-js";
import validator from "validator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, X, Loader2 } from "lucide-react";
import { Separator } from "../ui/separator";
import GitHubAuthButton from "./GitHubAuthButton";
import GoogleAuthButton from "./GoogleAuthButton";
import useAuth from "../../hooks/useAuth";

export default function SignupForm({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const { signUpWithEmailAndPassword } = useAuth();
  const checkUsernameAvailability = useCheckUsernameAvailability();

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [usernameStatus, setUsernameStatus] = useState<
    "idle" | "checking" | "available" | "unavailable"
  >("idle");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const invalidDetails =
    !credentials.username ||
    credentials.username.length < 3 ||
    !credentials.email ||
    !credentials.password ||
    usernameStatus === "checking" ||
    usernameStatus === "unavailable";

  // Validate and sanitize username input
  const validateUsername = (value: string): string => {
    // Only allow lowercase letters, numbers, underscores, and periods
    // Similar to Instagram username rules
    return value.toLowerCase().replace(/[^a-z0-9_.]/g, "");
  };

  // Debounced username availability check
  const checkUsername = useCallback(
    async (username: string) => {
      if (!username || username.length < 3) {
        setUsernameStatus("idle");
        return;
      }

      setUsernameStatus("checking");
      try {
        const result = await checkUsernameAvailability({ username });
        setUsernameStatus(result.available ? "available" : "unavailable");
        if (!result.available) {
          setErrors((errs) => ({
            ...errs,
            username: "Username is not available",
          }));
        } else {
          setErrors((errs) => ({ ...errs, username: null }));
        }
      } catch (error) {
        setUsernameStatus("idle");
        console.error("Error checking username:", error);
      }
    },
    [checkUsernameAvailability]
  );

  // Effect to handle debouncing
  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    if (credentials.username) {
      const timeout = setTimeout(() => {
        checkUsername(credentials.username);
      }, 500); // 500ms debounce
      setDebounceTimeout(timeout);
    } else {
      // Clear status and errors when username is empty
      setUsernameStatus("idle");
      setErrors((errs) => ({ ...errs, username: null }));
    }

    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [credentials.username, checkUsername]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (isSubmitting) return;
    try {
      if (!credentials.username || credentials.username.length < 3) {
        throw new Error("username|Username must be at least 3 characters");
      }

      if (usernameStatus === "unavailable") {
        throw new Error("username|Username is not available");
      }

      if (usernameStatus === "checking") {
        throw new Error(
          "username|Please wait while we check username availability"
        );
      }

      if (!validator.isEmail(credentials.email)) {
        throw new Error("email|Invalid email");
      }

      if (credentials.password.length < 8) {
        throw new Error("password|Password is too short");
      }

      setIsSubmitting(true);

      await signUpWithEmailAndPassword!({
        email: credentials.email,
        password: credentials.password,
        username: credentials.username,
      });
      setOpen(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        let errorMessage = err.message;
        let errorKey = "form";

        if (
          err.message.includes("username|") ||
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
        <Label htmlFor="email-signup">Email</Label>
        <Input
          id="email-signup"
          type="email"
          placeholder="name@replyke.com"
          autoComplete="email"
          onChange={(event) =>
            setCredentials((cs) => ({
              ...cs,
              email: event.target.value.trim(),
            }))
          }
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-signup">Password</Label>
        <Input
          id="password-signup"
          type="password"
          required
          onChange={(event) =>
            setCredentials((cs) => ({
              ...cs,
              password: event.target.value.trim(),
            }))
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="username-signup">Username</Label>
        <div className="relative">
          <Input
            id="username-signup"
            type="text"
            placeholder="johndoe"
            autoComplete="username"
            value={credentials.username}
            onChange={(event) => {
              const validatedUsername = validateUsername(event.target.value);
              setCredentials((cs) => ({
                ...cs,
                username: validatedUsername,
              }));
            }}
            className={`pr-10 ${
              usernameStatus === "available"
                ? "border-green-500 focus-visible:ring-green-500"
                : usernameStatus === "unavailable"
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }`}
            required
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {usernameStatus === "checking" && (
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            )}
            {usernameStatus === "available" && (
              <Check className="h-4 w-4 text-green-500" />
            )}
            {usernameStatus === "unavailable" && (
              <X className="h-4 w-4 text-red-500" />
            )}
          </div>
        </div>
        {errors.username && (
          <p className="text-xs text-red-600">{errors.username}</p>
        )}
        {usernameStatus === "available" && !errors.username && (
          <p className="text-xs text-green-600">Username is available</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={invalidDetails}>
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
        <GitHubAuthButton />
        <GoogleAuthButton />
      </div>
    </form>
  );
}
