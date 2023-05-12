import { useCallback } from "react";
import { FIND_ALL_POSTS_ENDPOINT } from "../constants/service-endpoints";
import { useSWR } from "../hooks/use-swr";
import { findAllPosts } from "../services/post.service";
import { Post } from "../schemas/post.schema";

export const usePosts = () => {
  const key = FIND_ALL_POSTS_ENDPOINT;
  const fetcher = findAllPosts;
  const { data, error, isLoading, mutate } = useSWR(key, fetcher);

  error && console.error(error);

  const addPost = useCallback(
    (post: Post) => {
      mutate((posts) => [...[post], ...(posts ?? [])], { revalidate: false });
    },
    [mutate]
  );

  return { isLoading, posts: data, addPost };
};
