import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "./auth-context";
import PopulatedSublayProvider from "./populated-sublay-provider";
import { PostHogProvider } from "./posthog-provider";
import { Toaster } from "@/components/ui/sonner";

function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <PostHogProvider>
        <AuthProvider>
          <PopulatedSublayProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </PopulatedSublayProvider>
        </AuthProvider>
      </PostHogProvider>
    </>
  );
}

export default ContextProviders;
