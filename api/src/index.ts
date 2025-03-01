import express from "express";
import "@dotenvx/dotenvx/config";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/notFound.middleware";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: 'Я API магазина "Удачная покупка", привет ;)!' });
});
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер крутится на ${PORT} порту`);
});
