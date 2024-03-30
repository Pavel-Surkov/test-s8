import z from 'zod';

export const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
});

export const postsSchema = z.array(postSchema);
