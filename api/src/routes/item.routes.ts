import Router, { RequestHandler } from "express";
import { validate } from "../middleware/validate.middleware";
import { CreateItemSchema, GetItemsSchema } from "../validators/item.validator";
import {
  getItemsHandler,
  registerItemHandler,
  getItemByIdHandler,
} from "../controllers/item.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/create",
  authenticateJWT as RequestHandler,
  validate(CreateItemSchema) as RequestHandler,
  registerItemHandler as RequestHandler
);

router.get(
  "/get",
  validate(GetItemsSchema, "query") as RequestHandler,
  getItemsHandler as RequestHandler
);

router.get("/:id", getItemByIdHandler as RequestHandler);

export default router;
