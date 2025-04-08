import { Request, Response, NextFunction } from "express";
export const addFilesToBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.files) {
    if (Array.isArray(req.files)) {
      req.body.images = req.files.map((file) => file.filename);
    } else {
      const fileMap: Record<string, string[]> = {};
      Object.entries(req.files).forEach(([fieldName, files]) => {
        fileMap[fieldName] = (files as Express.Multer.File[]).map(
          (file) => file.filename
        );
      });
      req.body = { ...req.body, ...fileMap };
    }
  } else if (req.file) {
    if (req.route.path.includes("/avatar")) {
      req.body.avatar = req.file.filename;
    } else if (req.route.path.includes("/background")) {
      req.body.background = req.file.filename;
    } else {
      req.body.images = req.file.filename;
    }
  }
};
