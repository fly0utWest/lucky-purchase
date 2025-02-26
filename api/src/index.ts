import express from "express";
import "@dotenvx/dotenvx/config";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Lucky Purchase API!" });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} port`);
});
