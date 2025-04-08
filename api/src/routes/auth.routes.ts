import { RequestHandler, Router } from "express";
import { loginUserHandler } from "../controllers/auth.controller";
import { LoginUserSchema } from "../validators/auth.validator";
import { validate } from "../middlewares/validate.middleware";

const router = Router();

router.post(
  "/login",
  validate(LoginUserSchema) as RequestHandler,
  loginUserHandler as RequestHandler
);

export default router;
