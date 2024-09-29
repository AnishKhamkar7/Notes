import { z } from "zod";

export const querySchema = z.union([z.string(), z.array(z.string())]);

export type QuerySchema = z.infer<typeof querySchema>;
