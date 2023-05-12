import { TypeOf, object, string } from "zod";

const AUTHOR_IS_REQUIRED = "Please insert an author.";
const TITLE_IS_REQUIRED = "Please insert a title.";

export const CreatePostSchema = object({
  author: string({ required_error: AUTHOR_IS_REQUIRED }).min(1, {
    message: AUTHOR_IS_REQUIRED,
  }),
  title: string({ required_error: TITLE_IS_REQUIRED }).min(1, {
    message: TITLE_IS_REQUIRED,
  }),
});
export type CreatePostInput = TypeOf<typeof CreatePostSchema>;
