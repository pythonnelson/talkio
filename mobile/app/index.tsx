import { Redirect, useRootNavigationState } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const nav = useRootNavigationState();

  // Block rendering until router + Clerk are ready
  if (!isLoaded || !nav?.key) return null;

  return isSignedIn ? <Redirect href="/(tabs)" /> : <Redirect href="/(auth)" />;
}
