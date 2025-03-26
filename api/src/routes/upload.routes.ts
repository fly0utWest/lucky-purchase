import { Router } from "express";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import { authenticateJWT } from "../middleware/auth.middleware";
import { Request, Response } from "express";

const router = Router();

// Настройка хранилища
const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, "static/items");
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const uniqueName = `${crypto.randomBytes(16).toString("hex")}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// Настройка загрузки
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Неподдерживаемый формат файла"));
    }
  },
});

// Маршрут для загрузки изображения
router.post(
  "/",
  authenticateJWT,
  upload.single("image"),
  (req: Request, res: Response): void => {
    if (!req.file) {
      res.status(400).json({ error: "Файл не был загружен" });
      return;
    }
    res.json({ filename: req.file.filename });
  }
);

export default router;
