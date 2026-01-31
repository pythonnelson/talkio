import { useAuth } from "@clerk/clerk-react";
import React from "react";

function ChatPage() {
  const { signOut } = useAuth();
  return (
    <button
      onClick={() =>
        signOut({
          redirectUrl: "/",
        })
      }
    >
      Sign Out
    </button>
  );
}

export default ChatPage;
