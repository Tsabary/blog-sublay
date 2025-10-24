"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useAuth from "../../hooks/useAuth";

function AuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setClient, setAccessToken } = useAuth();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const id = searchParams.get("id");
    const email = searchParams.get("email");
    const name = searchParams.get("name");
    const avatar = searchParams.get("avatar");

    if (!id) return;

    setAccessToken?.(accessToken);
    setClient?.({
      id,
      email: email || undefined,
      name: name || undefined,
      avatar: avatar || undefined,
    });

    router.push("/");
  }, [searchParams, setAccessToken, setClient, router]);

  return null;
}

export default AuthSuccessPage;
