import { TypeOf, number, object, string } from "zod";

export const PostSchema = object({
  id: number(),
  title: string(),
  author: string(),
});
export type Post = TypeOf<typeof PostSchema>;
