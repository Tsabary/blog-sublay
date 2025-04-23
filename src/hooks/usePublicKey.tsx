import { useEffect, useState } from "react";
import axios from "../config/axios";
import { handleError } from "@replyke/react-js";

function usePublicKey() {
  const [publicKey, setPublicKey] = useState<string | null>(null);

  const fetchPublicKey = async () => {
    try {
      const path = `/crypto`;
      const response = await axios.get(path);

      const fetchedKey = response.data as string;
      if (fetchedKey) setPublicKey(fetchedKey);
    } catch (err: unknown) {
      handleError(err, "Failed to fetch public key: ");
    }
  };
  useEffect(() => {
    fetchPublicKey();
  }, []);

  return publicKey;
}

export default usePublicKey;
