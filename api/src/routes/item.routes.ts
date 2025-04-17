import Router, { RequestHandler } from "express";
import { validate } from "../middlewares/validation.middleware";
import { CreateItemSchema, GetItemsSchema } from "../validators/item.validator";
import {
  getItemsHandler,
  getItemByIdHandler,
  removeItemByIdHandler,
  createItemHandler,
} from "../controllers/item.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import itemUploader from "../../config/storage/item.storage";
import { addFilesToBody } from "../middlewares/upload.middleware";
import { UUIDSchema } from "../validators/shared.validator";

const router = Router();

router.post(
  "/create",
  authenticateJWT as RequestHandler,
  itemUploader.array("images", 3),
  addFilesToBody as RequestHandler,
  validate(CreateItemSchema) as RequestHandler,
  createItemHandler as RequestHandler
);

router.get(
  "/get",
  validate(GetItemsSchema, "query") as RequestHandler,
  getItemsHandler as RequestHandler
);

router.get(
  "/:id",
  validate(UUIDSchema, "params") as RequestHandler,
  getItemByIdHandler as RequestHandler
);

router.delete(
  "/delete/:id",
  authenticateJWT as RequestHandler,
  validate(UUIDSchema, "params") as RequestHandler,
  removeItemByIdHandler as RequestHandler
);

router.delete(
  "/delete/:id",
  authenticateJWT as RequestHandler,
  removeItemByIdHandler as RequestHandler
);

export default router;
