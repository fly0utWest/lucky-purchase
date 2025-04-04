import Router, { RequestHandler } from "express";
import { validate } from "../middleware/validate.middleware";
import { CreateItemSchema, GetItemsSchema } from "../validators/item.validator";
import {
  getItemsHandler,
  registerItemHandler,
  getItemByIdHandler,
  uploadImageHandler,
  removeItemByIdHandler,
} from "../controllers/item.controller";
import { authenticateJWT } from "../middleware/auth.middleware";
import { upload } from "../services/item.service";

const router = Router();

router.post(
  "/upload",
  authenticateJWT as RequestHandler,
  upload.single("image"),
  uploadImageHandler as RequestHandler
);

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

router.delete(
  "/delete/:id",
  authenticateJWT as RequestHandler,
  removeItemByIdHandler as RequestHandler
);

export default router;
