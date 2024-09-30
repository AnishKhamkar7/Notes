import { z } from "zod";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { error } from "console";

expand(config());

const schema = z.object({
  PORT: z.coerce.number().int().positive(),
  MONGO_URL: z.string().trim().min(1),
  JWT_ACCESS_TOKEN_SECRET: z.string().trim().min(1),
  JWT_ACCESS_TOKEN_EXPIRY: z.string().trim().min(1),
});

const parsedEnv = schema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(parsedEnv.error.format(), error)
  );
  process.exit(1);
}

export default parsedEnv.data;
