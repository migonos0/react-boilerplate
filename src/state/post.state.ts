import { FIND_ALL_POSTS_ENDPOINT } from "../constants/service-endpoints";
import { useSWR } from "../hooks/use-swr";
import { findAllPosts } from "../services/post.service";

export const usePosts = () => {
  const key = FIND_ALL_POSTS_ENDPOINT;
  const fetcher = findAllPosts;
  const { data, error, isLoading, mutate } = useSWR(key, fetcher);

  error && console.error(error);

  return { isLoading, posts: data, mutatePosts: mutate };
};
