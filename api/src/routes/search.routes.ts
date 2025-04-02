import { RequestHandler, Router } from "express";
import { getCategoriesHandler } from "../controllers/search.controller";

const router = Router();

router.get("/categories", getCategoriesHandler as RequestHandler);

export default router;
