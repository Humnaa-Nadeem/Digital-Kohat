import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import Routes from "./Router/Router.js";
import SACAR from "./Router/SchlAndColDshBrdRouts.js";
import SARoutes from "./Router/SuperAdminRouter.js";

import { connectMongoClient } from "./Db/mongoClient.js";
import { connectMongoose } from "./Db/mongoose.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Create socket server
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});

// ✅ Socket connection
io.on("connection", (socket) => {

  console.log("Socket connected:", socket.id);

  socket.on("join_superadmin", () => {
    socket.join("superadmin");
    console.log("Superadmin joined room");
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

});

// Backend Middlewares
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// DB Connections
await connectMongoose();
const db = await connectMongoClient();
app.locals.db = db;

// Routes
app.use(Routes);
app.use(SACAR);
app.use(SARoutes);

// ✅ IMPORTANT: server.listen instead of app.listen
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});