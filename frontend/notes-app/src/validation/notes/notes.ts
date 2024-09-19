import { z } from "zod";

export const notesSchema = z
  .object({
    title: z.string().trim().min(3, "Title must contain at least 3 characters"),
    content: z
      .string()
      .trim()
      .min(3, "Content must contain at least 3 characters"),
  })
  .strict();

export type NotesSchema = z.infer<typeof notesSchema>;
