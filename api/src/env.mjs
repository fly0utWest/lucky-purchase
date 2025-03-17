import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url("Set string is not an url"),
    JWT_SECRET: z.string().base64("JWT secret is not valid, bro"),
    PORT: z.string().min(4, "Port is not valid"),
  },
  runtimeEnv: process.env
});
