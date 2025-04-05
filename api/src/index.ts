import express from "express";
import "@dotenvx/dotenvx/config";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import favoriteRoutes from "./routes/favorite.routes";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/notFound.middleware";
import itemRouter from "./routes/item.routes";
import fs from "fs";
import path from "path";
import searchRoutes from "./routes/search.routes";

const PORT = process.env.PORT || 7777;

const app = express();

const userAvatarsDir = path.join(process.cwd(), "static", "users", "avatars");
if (!fs.existsSync(userAvatarsDir)) {
  fs.mkdirSync(userAvatarsDir, { recursive: true });
}

const userBackgroundsDir = path.join(
  process.cwd(),
  "static",
  "users",
  "backgrounds"
);
if (!fs.existsSync(userBackgroundsDir)) {
  fs.mkdirSync(userBackgroundsDir, { recursive: true });
}

const itemsImgdDir = path.join(process.cwd(), "static", "items");
if (!fs.existsSync(itemsImgdDir)) {
  fs.mkdirSync(itemsImgdDir, { recursive: true });
}

app.use(cors({ origin: "*" }));
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
