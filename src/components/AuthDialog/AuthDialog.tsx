"use client";

import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignupForm from "./SignUpForm";
import SignInForm from "./SignInForm";

export default function AuthDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (state: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex items-center">
          <DialogTitle className="text-center text-2xl font-bold">
            Welcome
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <SignInForm setOpen={setOpen} />
          </TabsContent>

          <TabsContent value="signup">
            <SignupForm setOpen={setOpen} />
          </TabsContent>
        </Tabs>

        <div className="mt-4 text-center text-xs text-muted-foreground">
          <p>By continuing, you agree to our</p>
          <p>
            <a
              href="https://replyke.com/terms-of-service.html"
              target="_blank"
              className="underline hover:text-primary"
            >
              Terms of Service
            </a>{" "}
            &{" "}
            <a
              href="https://replyke.com/privacy-policy.html"
              target="_blank"
              className="underline hover:text-primary"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
