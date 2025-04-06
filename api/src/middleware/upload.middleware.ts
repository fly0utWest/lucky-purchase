import { Request, Response, NextFunction } from "express";

export const addFilesToBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.files) {
    req.body.images = req.files;
  }

  if (req.file) {
    req.body.images = [req.file];
  }
  
  next();
};
