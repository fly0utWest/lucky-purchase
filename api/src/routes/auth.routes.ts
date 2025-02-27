import { RequestHandler, Router } from "express";
import { loginUser } from "../controllers/auth.controller";

const router = Router();

router.post("/login", loginUser as RequestHandler);

export default router