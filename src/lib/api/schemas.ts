// src/lib/api/schemas.ts
import { z } from "zod";

export const PostSchema = z.object({
  id: z.number(),
  title: z.string().min(3),
  body: z.string(),
  userId: z.number(),
});

export type Post = z.infer<typeof PostSchema>;