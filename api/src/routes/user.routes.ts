import { RequestHandler, Router } from "express";
import {
  getUserByIdController,
  registerUser,
} from "../controllers/user.controllers";
import { validate } from "../middleware/validate.middleware";
import { RegisterUserSchema, userIdSchema } from "../validators/user.validator";

const router = Router();

router.post(
  "/register",
  validate(RegisterUserSchema) as RequestHandler,
  registerUser as RequestHandler
);

router.get(
  "/:id",
  validate(userIdSchema, "params") as RequestHandler,
  getUserByIdController as RequestHandler
);

export default router;
