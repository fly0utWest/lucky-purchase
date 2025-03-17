import Router, { RequestHandler } from "express";
import { validate } from "../middleware/validate.middleware";
import { CreateItemSchema } from "../validators/item.validator";
import { registerItem } from "../controllers/item.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/create",
  authenticateJWT as RequestHandler,
  validate(CreateItemSchema) as RequestHandler,
  registerItem as RequestHandler
);

export default router;
