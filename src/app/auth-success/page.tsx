"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth";

// Google/GitHub sign-in lands here after the server has set the refresh
// cookie. The access token and account are fetched with that cookie rather
// than read from this page's URL, so nothing sensitive is ever in the address
// bar or browser history.
function AuthSuccessPage() {
  const router = useRouter();
  const { getNewAccessToken } = useAuth();

  useEffect(() => {
    getNewAccessToken?.().finally(() => router.replace("/"));
  }, [getNewAccessToken, router]);

  return null;
}

export default AuthSuccessPage;
