import { useAuth } from "@clerk/clerk-react";

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
