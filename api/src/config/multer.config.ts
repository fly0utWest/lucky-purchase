import multer from "multer";
import path from "path";
import crypto from "crypto";
import { Request } from "express";

interface MulterConfig {
  destination:
    | string
    | ((
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void
      ) => void);
  fileSize?: number;
  allowedTypes?: string[];
}

export function createUploadMiddleware({
  destination,
  fileSize = 5 * 1024 * 1024, // 5MB по умолчанию
  allowedTypes = ["image/jpeg", "image/png", "image/webp"],
}: MulterConfig) {
  const storage = multer.diskStorage({
    destination:
      typeof destination === "string"
        ? destination
        : (req, file, cb) => destination(req, file, cb),
    filename: (req: Request, file: Express.Multer.File, cb) => {
      const uniqueName = `${crypto.randomBytes(16).toString("hex")}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  });

  return multer({
    storage,
    limits: {
      fileSize,
    },
    fileFilter: (req: Request, file: Express.Multer.File, cb) => {
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Неподдерживаемый формат файла"));
      }
    },
  });
}
