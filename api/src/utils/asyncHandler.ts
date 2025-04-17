import { Request, Response, NextFunction } from "express";
import { ApiResponse, SuccessResponse } from "../types/responses";

export default function asyncHandler(
  fn: (
    req: Request,
    res: Response<ApiResponse>,
    next: NextFunction
  ) => Promise<Response<SuccessResponse> | void>
) {
  return (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
