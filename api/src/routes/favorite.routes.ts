import { RequestHandler, Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { ToggleFavoriteSchema } from "../validators/favorite.validator";
import {
  getFavoritesListHandler,
  toggleFavoriteHandler,
  checkFavoriteStatusHandler,
} from "../controllers/favorite.controller";

const router = Router();

router.post(
  "/toggle",
  authenticateJWT as RequestHandler,
  validate(ToggleFavoriteSchema, "query") as RequestHandler,
  toggleFavoriteHandler as RequestHandler
);

router.get(
  "/get",
  authenticateJWT as RequestHandler,
  getFavoritesListHandler as RequestHandler
);

router.get(
  "/is-favorite",
  authenticateJWT as RequestHandler,
  checkFavoriteStatusHandler as RequestHandler
);

export default router;
