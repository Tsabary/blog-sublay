"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import useAuth from "../../hooks/useAuth";

// Google/GitHub sign-in lands here after the server has set the refresh
// cookie. The access token and account are fetched with that cookie rather
// than read from this page's URL, so nothing sensitive is ever in the address
// bar or browser history.
function AuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const { getNewAccessToken } = useAuth();

  useEffect(() => {
    // The server refused to connect this sign-in to an existing account
    // because the provider hasn't verified the email.
    if (error === "email_not_verified") {
      toast.error(
        "An account with this email already exists, but your Google/GitHub account hasn't verified the email. Verify it with the provider, or sign in with your password.",
      );
      router.replace("/");
      return;
    }
    getNewAccessToken?.().finally(() => router.replace("/"));
  }, [error, getNewAccessToken, router]);

  return null;
}

function AuthSuccessPage() {
  return (
    <Suspense fallback={null}>
      <AuthSuccessContent />
    </Suspense>
  );
}

export default AuthSuccessPage;
