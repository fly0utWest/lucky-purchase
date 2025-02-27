import { RequestHandler, Router } from "express";
import { registerUser } from "../controllers/user.controllers";
import { validate } from "../middleware/validate.middleware";
import { RegisterUserSchema } from "../validators/user.validator";

const router = Router();

router.post(
  "/register",
  validate(RegisterUserSchema) as RequestHandler,
  registerUser as RequestHandler
);

export default router;
