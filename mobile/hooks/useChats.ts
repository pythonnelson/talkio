import { useApi } from "@/lib/axios";
import type { Chat } from "@/types";

import { useQuery } from "@tanstack/react-query";

export const useChats = () => {
  const { apiWithAuth } = useApi();

  return useQuery({
    queryKey: ["chats"],
    queryFn: async ({ signal }): Promise<Chat[]> => {
      const { data } = await apiWithAuth<Chat[]>({
        method: "GET",
        url: "/chats",
        signal,
      });
      return data;
    },
  });
};
