import { Request, Response, NextFunction } from "express";

export const addFilesToBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body.images = req.files;
  next();
};
