import express, { RequestHandler } from "express";
import "@dotenvx/dotenvx/config";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import favoriteRoutes from "./routes/favorite.routes";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware";
import { notFoundHandler } from "./middlewares/notFound.middleware";
import itemRouter from "./routes/item.routes";
import path from "path";
import searchRoutes from "./routes/search.routes";
import { createServer } from "node:http";
import { createSocketIO } from "../config/chat";
import helmet from "helmet";

const PORT = process.env.PORT || 7777;

const app = express();

const websocketServer = createServer(app);

createSocketIO(websocketServer);

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "produuction" ? process.env.ORIGIN_URL : "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));
app.use(express.json());

app.use("/static", express.static(path.join(process.cwd(), "static")));

app.get("/", (req, res) => {
  res.json({ message: 'Я API магазина "Удачная покупка", привет ;)!' });
});
app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

app.use("/user", userRoutes);
app.use("/item", itemRouter);
app.use("/auth", authRoutes);
app.use("/favorite", favoriteRoutes);
app.use("/search", searchRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[ИНФО] Сервер крутится на ${PORT} порту`);
});
