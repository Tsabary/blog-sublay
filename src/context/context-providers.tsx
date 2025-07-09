import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "./auth-context";
import PopulatedReplykeProvider from "./populated-replyke-provider";
import { PostHogProvider } from "./posthog-provider";
import { Toaster } from "@/components/ui/sonner";

function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <PostHogProvider>
        <AuthProvider>
          <PopulatedReplykeProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </PopulatedReplykeProvider>
        </AuthProvider>
      </PostHogProvider>
    </>
  );
}

export default ContextProviders;
