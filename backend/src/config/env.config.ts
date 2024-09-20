import { z } from "zod";
import { config } from "dotenv";
import { expand } from "dotenv-expand";

expand(config());

const schema = z.object({
  // HOST: z.string().trim().min(1),
  PORT: z.coerce.number().int().positive(),
  // NODE_ENV: z.enum(['development', 'production', 'test']),

  // DB_HOST: z.string().trim().min(1),
  // DB_USER: z.string().trim().min(1),
  // DB_PASSWORD: z.string().trim().min(1),
  // DB_NAME: z.string().trim().min(1),
  // DB_PORT: z.coerce.number().int().positive(),
  MONGO_URL: z.string().trim().min(1),

  JWT_ACCESS_TOKEN_SECRET: z.string().trim().min(1),
  JWT_ACCESS_TOKEN_EXPIRY: z.string().trim().min(1),
  //   JWT_REFRESH_TOKEN_SECRET: z.string().trim().min(1),
  //   JWT_REFRESH_TOKEN_EXPIRY: z.string().trim().min(1),

  CLIENT_URL: z.string().trim().min(1),
});

const parsedEnv = schema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(parsedEnv.error.format(), null, 4)
  );
  process.exit(1);
}

export default parsedEnv.data;
