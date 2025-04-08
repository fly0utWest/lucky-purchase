import { RequestHandler, Router } from "express";
import {
  getCategoriesHandler,
  searchItemHandler,
} from "../controllers/search.controller";
import { validate } from "../middlewares/validate.middleware";
import { SearchSchema } from "../validators/search.validator";

const router = Router();

router.get("/categories", getCategoriesHandler as RequestHandler);
router.get(
  "/",
  validate(SearchSchema, "query") as RequestHandler,
  searchItemHandler as RequestHandler
);
export default router;
