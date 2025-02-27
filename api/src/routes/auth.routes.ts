import { RequestHandler, Router } from "express";
import { loginUser } from "../controllers/auth.controller";
import { LoginUserSchema } from "../validators/auth.validator";
import { validate } from "../middleware/validate.middleware";

const router = Router();

router.post(
  "/login",
  validate(LoginUserSchema) as RequestHandler,
  loginUser as RequestHandler
);

export default router;
