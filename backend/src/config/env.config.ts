import { z } from "zod";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import ErrorFactory from "../errors/index";

expand(config());

const schema = z.object({
  PORT: z.coerce.number().int().positive(),
  MONGO_URL: z.string().trim().min(1),
  JWT_ACCESS_TOKEN_SECRET: z.string().trim().min(1),
  JWT_ACCESS_TOKEN_EXPIRY: z.string().trim().min(1),
});

const parsedEnv = schema.safeParse(process.env);

if (!parsedEnv) {
  throw ErrorFactory.badRequestError("Parsed Env is empty ");
}

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(parsedEnv.error.format(), null, 2)
  );
}

export default parsedEnv.data;
