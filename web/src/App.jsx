import { Routes, Route, Navigate } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import PageLoader from "./components/PageLoader";

function App() {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return <PageLoader />;
  return (
    <Routes>
      <Route
        path="/"
        element={!isSignedIn ? <HomePage /> : <Navigate to={"/chat"} />}
      />
      <Route
        path="/chat"
        element={isSignedIn ? <ChatPage /> : <Navigate to={"/"} />}
      />
    </Routes>
  );
}

export default App;
