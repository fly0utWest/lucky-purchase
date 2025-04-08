import { RequestHandler, Router } from "express";
import {
  getAuthedUserHandler,
  getUserByIdHandler,
  registerUserHandler,
} from "../controllers/user.controllers";
import { validate } from "../middleware/validate.middleware";
import {
  RegisterUserSchema,
  UpdateUserAvatarSchema,
  UpdateUserBackgroundSchema,
  UpdateUserDataSchema,
  UpdateUserSchema,
} from "../validators/user.validator";
import { authenticateJWT } from "../middleware/auth.middleware";
import { UUIDSchema } from "../services/shared.validator";
import { updateUserByIdHandler } from "../controllers/user.controllers";
import {
  avatarUploader,
  backgroundUploader,
} from "../../config/storage/user.storage";
import { addFilesToBody } from "../middleware/upload.middleware";

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
  validate(UpdateUserDataSchema, "body") as RequestHandler,
  updateUserByIdHandler as RequestHandler
);
router.put(
  "/update/avatar",
  authenticateJWT as RequestHandler,
  avatarUploader.single("avatar") as RequestHandler,
  addFilesToBody as RequestHandler,
  validate(UpdateUserAvatarSchema, "body") as RequestHandler,
  updateUserByIdHandler as RequestHandler
);
router.put(
  "/update/background",
  authenticateJWT as RequestHandler,
  backgroundUploader.single("background") as RequestHandler,
  addFilesToBody as RequestHandler,
  validate(UpdateUserBackgroundSchema, "body") as RequestHandler,
  updateUserByIdHandler as RequestHandler
);

export default router;
