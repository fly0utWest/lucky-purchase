import express from "express";
import "@dotenvx/dotenvx/config";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/notFound.middleware";
import itemRouter from "./routes/item.routes";
import fs from "fs";
import path from "path";

const PORT = process.env.PORT || 7777;

const app = express();

// Создаем директорию для загрузки файлов, если она не существует
const uploadDir = path.join(process.cwd(), "static", "items");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(cors({ origin: "*" }));
app.use(express.json());

// Обслуживание статических файлов
app.use("/static", express.static(path.join(process.cwd(), "static")));

app.get("/", (req, res) => {
  res.json({ message: 'Я API магазина "Удачная покупка", привет ;)!' });
});
app.use("/user", userRoutes);
app.use("/item", itemRouter);
app.use("/auth", authRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
