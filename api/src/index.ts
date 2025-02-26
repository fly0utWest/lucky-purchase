import express from "express";
import "@dotenvx/dotenvx/config";
import userRoutes from "./routes/user.routes";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Lucky Purchase API!" });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} port`);
});
