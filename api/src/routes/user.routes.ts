import { RequestHandler, Router } from "express";
import {
  getAuthedUserHandler,
  getUserByIdHandler,
  registerUserHandler,
} from "../controllers/user.controllers";
import { validate } from "../middleware/validate.middleware";
import { RegisterUserSchema } from "../validators/user.validator";
import { authenticateJWT } from "../middleware/auth.middleware";
import { UUIDSchema } from "../services/shared.validator";

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

export default router;
