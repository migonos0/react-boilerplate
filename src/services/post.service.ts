import { FIND_ALL_POSTS_ENDPOINT } from "../constants/service-endpoints";
import { httpClient } from "../libs/http-client";
import { PostSchema } from "../schemas/post.schema";

export const findAllPosts = async () => {
  const response = await httpClient.get(FIND_ALL_POSTS_ENDPOINT);

  return PostSchema.array().parse(response.data);
};
