import express from "express";
import { clerkMiddleware } from "@clerk/express";

import authRoutes from "./routes/authRoutes";
import chatRoutes from "./routes/chatRoutes";
import messagesRoutes from "./routes/messageRoutes";
import usersRoutes from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

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

export default app;
