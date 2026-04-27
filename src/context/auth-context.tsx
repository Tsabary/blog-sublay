"use client";

import { useState, useEffect, createContext, useCallback } from "react";
import { handleError } from "@replyke/react-js";

import axios from "@/config/axios";
import { Client } from "@/types/Client";

type AuthContextProps = {
  client: Client | null;
  setClient: React.Dispatch<React.SetStateAction<Client | null>>;

  setAccessToken: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;

  signUpWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  signOut: () => void;
  changePassword: (password: string, newPassword: string) => void;
  handleGoogleLogin: () => Promise<void>;
  handleGithubLogin: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  updateUserProfile: () => Promise<void>;
  accessToken: string | null | undefined;
  getNewAccessToken: () => Promise<string>;
};

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [client, setClient] = useState<Client | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>();

  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  const signUpWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      const path = `/dashboard/clients-auth/sign-up`;

      const response = await axios.post(
        path,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      const { accessToken: newAccessToken, client: newClient } = response.data;

      setAccessToken(newAccessToken);
      setClient(newClient);
    } catch (err: unknown) {
      handleError(err, "Failed to sign up: ");
    }
  };

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      const path = `/clients-auth/sign-in`;

      const response = await axios.post(
        path,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      const { accessToken: newAccessToken, client: newClient } = response.data;

      setAccessToken(newAccessToken);
      setClient(newClient);
    } catch (err: unknown) {
      handleError(err, "Failed to sign in: ");
    }
  };

  const signOut = async () => {
    try {
      const path = `/dashboard/clients-auth/sign-out`;

      await axios.post(path, undefined, { withCredentials: true });
      setAccessToken(null);
      setClient(null);
    } catch (err: unknown) {
      handleError(err, "Failed to sign out: ");
    }
  };

  const changePassword = async (password: string, newPassword: string) => {
    if (!client) throw new Error("No client is logged in");
    if (!client.email)
      throw new Error("Didn't authenticate using email and password");

    try {
      const path = `/dashboard/clients-auth/change-password`;

      await axios.post(
        path,
        {
          password,
          newPassword,
        },
        { withCredentials: true }
      );
    } catch (err: unknown) {
      handleError(err, "Failed to update password: ");
    }
  };

  const getNewAccessToken = useCallback(async () => {
    try {
      const path = `/dashboard/clients-auth/request-new-access-token`;

      const response = await axios.post(path, undefined, {
        withCredentials: true,
      });

      const { accessToken: newAccessToken, client: newClient } = response.data;

      setAccessToken(newAccessToken);
      setClient(newClient);
      return newAccessToken;
    } catch (err: unknown) {
      handleError(err, "Refresh error: ");
    }
  }, []);

    const handleGoogleLogin = async () => {
    try {
      window.location.href =
        process.env.NEXT_PUBLIC_SERVER_URL + "/dashboard/clients-auth/google";
    } catch (err: unknown) {
      handleError(err, "Failed to initiate Google login: ");
    }
  };

  const handleGithubLogin = async () => {
    try {
      window.location.href =
        process.env.NEXT_PUBLIC_SERVER_URL + "/dashboard/clients-auth/github";
    } catch (err: unknown) {
      handleError(err, "Failed to initiate GitHub login: ");
    }
  };

  
  const deleteAccount = async () => {};

  async function updateUserProfile(): Promise<void> {}

  useEffect(() => {
    const fetchInitial = async () => {
      setTimeout(async () => {
        await getNewAccessToken();
        setLoadingInitial(false);
      }, 0);
    };
    fetchInitial();
  }, [getNewAccessToken]);

  return (
    <AuthContext.Provider
      value={{
        client,
        setClient,

        setAccessToken,

        signUpWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        changePassword,
        deleteAccount,
        updateUserProfile,
        getNewAccessToken,
        accessToken,
        handleGoogleLogin,
        handleGithubLogin,
      }}
    >
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};
