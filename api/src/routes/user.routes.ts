import { RequestHandler, Router } from "express";
import {
  getAuthedUser,
  getUserByIdController,
  registerUser,
} from "../controllers/user.controllers";
import { validate } from "../middleware/validate.middleware";
import {
  RegisterUserSchema,
  UserByIdSchema,
} from "../validators/user.validator";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/register",
  validate(RegisterUserSchema) as RequestHandler,
  registerUser as RequestHandler
);

router.get(
  "/me",
  authenticateJWT as RequestHandler,
  validate(UserByIdSchema, "userId") as RequestHandler,
  getAuthedUser
);

router.get(
  "/:id",
  validate(UserByIdSchema, "params") as RequestHandler,
  getUserByIdController as RequestHandler
);

export default router;
