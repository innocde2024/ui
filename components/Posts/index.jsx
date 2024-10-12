import React from "react";
import Post from "../Post";
import useAllPost from "../../hook/forum/useAllPost";
import CommonLoading from "../Loading";

const Posts = () => {
  const { data, isLoading } = useAllPost(1, 100000, "");
  const posts = data?.data.data.posts;
  return isLoading ? (
    <CommonLoading />
  ) : (
    <div>
      {posts
        ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((post) => (
          <Post key={post.id} post={post} />
        ))}
    </div>
  );
};
export default Posts;
