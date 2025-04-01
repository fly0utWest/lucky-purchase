import { RequestHandler, Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { authenticateJWT } from "../middleware/auth.middleware";
import { ToggleFavoriteSchema } from "../validators/favorite.validator";
import { toggleFavoriteHandler } from "../controllers/favorite.controller";

const router = Router();

router.post(
  "/toggle",
  authenticateJWT as RequestHandler,
  validate(ToggleFavoriteSchema, "query") as RequestHandler,
  toggleFavoriteHandler as RequestHandler
);

export default router;
