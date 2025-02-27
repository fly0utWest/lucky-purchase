import { RequestHandler, Router } from "express";
import { registerUser } from "../controllers/user.controllers";

const router = Router();

router.post("/register", registerUser as RequestHandler);

export default router;
