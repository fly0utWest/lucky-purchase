import { Server } from "socket.io";
import { Server as HttpServer } from "node:http";
import { authenticateJWTSocket } from "../src/middlewares/auth.middleware";

export function createSocketIO(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["POST", "GET"],
    },
  });
  console.log("[ИНФО] Websocket-сервер был создан");

  io.use(authenticateJWTSocket);
}
