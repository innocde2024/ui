/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import { useQuery } from "@tanstack/react-query";
import forumApi from "../../api/forumApi";

const usePostById = (postId) =>
  useQuery({
    queryKey: [`COMMENT${postId}`],
    queryFn: () => forumApi.get(`/api/forum/posts/${postId}`),
  })?.data?.data;
export default usePostById;
