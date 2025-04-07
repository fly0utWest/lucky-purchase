import multer from "multer";
import crypto from "crypto";
import { Request } from "express";
import path from "path";
import fs from "fs";

const createStorage = (destination: string) => {
  const ensureDir = () => {
    const uploadPath = path.join(process.cwd(), "static", destination);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
      console.log(`[ИНФО] Директория для хранилища создана: ${uploadPath}`);
    }
  };

  ensureDir();

  return multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void
    ) => {
      const uploadPath = path.join(process.cwd(), "static", destination);
      if (!fs.existsSync(uploadPath)) {
        try {
          fs.mkdirSync(uploadPath, { recursive: true });
        } catch (err) {
          return cb(
            new Error(`Could not create directory ${uploadPath}`),
            uploadPath
          );
        }
      }
      cb(null, uploadPath);
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
};

export const createUploader = (
  storage: multer.StorageEngine,
  fileSize: number = 5 * 1024 * 1024,
  allowedTypes: string[] = ["image/jpeg", "image/png", "image/webp"]
) =>
  multer({
    storage,
    limits: {
      fileSize,
    },
    fileFilter: (
      req: Request,
      file: Express.Multer.File,
      cb: multer.FileFilterCallback
    ) => {
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Неподдерживаемый формат файла"));
      }
    },
  });

export default createStorage;
