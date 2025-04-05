import Router, { RequestHandler } from "express";
import { validate } from "../middleware/validate.middleware";
import { CreateItemSchema, GetItemsSchema } from "../validators/item.validator";
import {
  getItemsHandler,
  getItemByIdHandler,
  removeItemByIdHandler,
  createItemHandler,
} from "../controllers/item.controller";
import { authenticateJWT } from "../middleware/auth.middleware";
import { upload } from "../services/item.service";
import { addFilesToBody } from "../middleware/upload.middleware";

const router = Router();

router.post(
  "/create",
  authenticateJWT as RequestHandler,
  upload.array("images", 3),
  addFilesToBody as RequestHandler,
  validate(CreateItemSchema) as RequestHandler,
  createItemHandler as RequestHandler
);

router.get(
  "/get",
  validate(GetItemsSchema, "query") as RequestHandler,
  getItemsHandler as RequestHandler
);

router.get("/:id", getItemByIdHandler as RequestHandler);

router.delete(
  "/delete/:id",
  authenticateJWT as RequestHandler,
  removeItemByIdHandler as RequestHandler
);

export default router;
