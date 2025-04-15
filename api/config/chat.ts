import { Server } from "socket.io";
import { Server as HttpServer } from "node:http";

export function createSocketIO(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["POST", "GET"],
    },
  });
  console.log("[ИНФО] Websocket-сервер был создан");
  
}
