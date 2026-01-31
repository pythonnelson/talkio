import express from "express";
import path from "path";
import cors from "cors";

import { clerkMiddleware } from "@clerk/express";

import authRoutes from "./routes/authRoutes";
import chatRoutes from "./routes/chatRoutes";
import messagesRoutes from "./routes/messageRoutes";
import usersRoutes from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

const frontendUrl = process.env.FRONTEND_URL;
if (process.env.NODE_ENV === "production" && !frontendUrl) {
  throw new Error("FRONTEND_URL must be set in production");
}

const allowedOrigins = [
  "http://localhost:8081", // expo mobile
  "http://localhost:5173", // vite web devs
  ...(frontendUrl ? [frontendUrl] : []), // production
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // allow credentials from client (cookies, authorization headers, etc.)
  }),
);

/*
Creates an Express application. The express() function is a 
top-level function exported by the express module.
*/
app.use(express.json());

/*
Middleware that integrates Clerk authentication into the 
Express application. It checks the request's cookies and 
headers for a session JWT and, if found, attaches the Auth 
object to the request object under the auth key.
*/
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/users", usersRoutes);

app.use(errorHandler);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../web/dist")));

  app.get("/{*any}", (_, res) => {
    res.sendFile(path.join(__dirname, "../../web/dist/index.html"));
  });
}
export default app;
