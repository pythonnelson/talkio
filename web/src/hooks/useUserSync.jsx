import { useAuth } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import api from "../lib/axios";

function useUserSync() {
  const { isSignedIn, getToken } = useAuth();
  const hasSynced = useRef(false);

  const {
    mutate: syncUser,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      const res = await api.post(
        "/auth/callback",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return res.data;
    },
    onSuccess: () => {
      hasSynced.current = true;
    },
    onError: (error) => {
      console.error("User sync failed:", error);
    },
  });

  useEffect(() => {
    if (
      isSignedIn &&
      !hasSynced.current &&
      !isPending &&
      !isSuccess &&
      !isError
    ) {
      syncUser();
    }
    if (!isSignedIn) {
      hasSynced.current = false;
    }
  }, [isSignedIn, syncUser, isPending, isSuccess, isError]);

  return { isSynced: isSuccess, isSyncing: isPending, isError };
}
export default useUserSync;
