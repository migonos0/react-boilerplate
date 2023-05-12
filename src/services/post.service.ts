import {
  CREATE_POST_ENDPOINT,
  FIND_ALL_POSTS_ENDPOINT,
} from "../constants/service-endpoints";
import { httpClient } from "../libs/http-client";
import { CreatePostInput } from "../schemas/inputs/create-post.schema";
import { PostSchema } from "../schemas/post.schema";

export const findAllPosts = async () => {
  const response = await httpClient.get(FIND_ALL_POSTS_ENDPOINT);

  return PostSchema.array().parse(response.data);
};

export const createPost = async (input: CreatePostInput) => {
  const response = await httpClient.post(CREATE_POST_ENDPOINT, input);
  return PostSchema.parse(response.data);
};
