import { RequestHandler, Router, Request, Response } from "express";
import {
  getAuthedUserHandler,
  getUserByIdHandler,
  registerUserHandler,
  updateUserByIdHandler,
} from "../controllers/user.controllers";
import { validate } from "../middleware/validate.middleware";
import {
  RegisterUserSchema,
  UpdateUserSchema,
} from "../validators/user.validator";
import { authenticateJWT } from "../middleware/auth.middleware";
import { UUIDSchema } from "../services/shared.validator";
import { uploadUserFiles } from "../services/user.service";
import { AppError } from "../utils/errors";
import { updateUserById } from "../services/user.service";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

router.post(
  "/register",
  validate(RegisterUserSchema) as RequestHandler,
  registerUserHandler as RequestHandler
);

router.get("/me", authenticateJWT as RequestHandler, getAuthedUserHandler);

router.get(
  "/:id",
  validate(UUIDSchema, "params") as RequestHandler,
  getUserByIdHandler as RequestHandler
);

router.put(
  "/update",
  authenticateJWT as RequestHandler,
  validate(UpdateUserSchema, "body") as RequestHandler,
  updateUserByIdHandler as RequestHandler
);

router.post(
  "/upload-files",
  authenticateJWT as RequestHandler,
  uploadUserFiles.fields([
    { name: "avatar", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]),
  asyncHandler(async (req: Request, res: Response) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const updateData: { avatar?: string; background?: string } = {};

    if (files.avatar?.[0]) {
      updateData.avatar = files.avatar[0].filename;
    }
    if (files.background?.[0]) {
      updateData.background = files.background[0].filename;
    }

    if (Object.keys(updateData).length === 0) {
      throw new AppError("Файлы не загружены", 400);
    }

    const user = await updateUserById(res.locals.userId, updateData);
    res.json({
      avatar: user?.avatar,
      background: user?.background,
    });
  })
);

export default router;
