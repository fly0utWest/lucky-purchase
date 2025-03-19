import Router, { RequestHandler } from "express";
import { validate } from "../middleware/validate.middleware";
import { CreateItemSchema, GetItemsSchema } from "../validators/item.validator";
import {
  getItemsController,
  registerItem,
} from "../controllers/item.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/create",
  authenticateJWT as RequestHandler,
  validate(CreateItemSchema) as RequestHandler,
  registerItem as RequestHandler
);

router.get(
  "/get",
  validate(GetItemsSchema, "query") as RequestHandler,
  getItemsController as RequestHandler
);

export default router;
