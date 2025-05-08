"use client";

import React, { useEffect, useState } from "react";
import { ReplykeProvider } from "@replyke/react-js";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../config/useAxiosPrivate";

function PopulatedReplykeProvider({ children }: { children: React.ReactNode }) {
  const { client } = useAuth();
  const axios = useAxiosPrivate();

  const [signedToken, setSignedToken] = useState<string>();

  useEffect(() => {
    const handleSignJwt = async () => {
      if (!client) return;

      const response = await axios.get("/auth/sign-jwt");
      const token = response.data;

      // Set the signed JWT in the state
      setSignedToken(token);
    };

    handleSignJwt();
  }, [client, axios]);

  return (
    <ReplykeProvider
      projectId={process.env.NEXT_PUBLIC_REPLYKE_PROJECT_ID}
      signedToken={signedToken}
    >
      {children}
    </ReplykeProvider>
  );
}

export default PopulatedReplykeProvider;
