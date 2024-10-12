/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import { useQuery } from "@tanstack/react-query";
import forumApi from "../../api/forumApi";
import { ALL_POST } from "./constants";

const useAllPost = (page, limit, topic) =>
  useQuery({
    queryKey: [ALL_POST],
    queryFn: () =>
      forumApi.get(
        `/api/forum/posts?page=${page}&limit=${limit}&topic=${topic}`
      ),
  });
export default useAllPost;
