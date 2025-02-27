import express, { NextFunction, Request, Response } from "express";
import "@dotenvx/dotenvx/config";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import cors from "cors";
import { AppError } from "./utils/errors";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Lucky Purchase API!" });
});
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  console.error("Unexpected error:", err);
  res.status(500).json({ error: "Internal server error" });
  return;
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} port`);
});
