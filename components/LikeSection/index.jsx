/* eslint-disable import/order */
/* eslint-disable import/newline-after-import */
/* eslint-disable eqeqeq */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-no-bind */
import React from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import useUserInfo from "../../hook/auth/useUserInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import forumApi from "../../api/forumApi";
import { ALL_POST } from "../../hook/forum/constants";
const LikeSection = ({ post }) => {
  const queryClient = useQueryClient();
  const { data } = useUserInfo();
  const user = data?.data;
  const isLiked = post.likes.some((like) => like.userId == user?.id);
  const likePost = useMutation({
    mutationFn: () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Authorization token is missing");
      }
      return forumApi.post(
        `/api/forum/post/like/${post?._id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
    },
  });
  const handleLike = () => {
    likePost.mutate(
      {},
      {
        onSuccess() {
          queryClient.invalidateQueries(ALL_POST);
        },
      }
    );
  };
  return (
    <div className="flex  py-2 px-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {!!post?.likes.length && post?.likes.length}
          {isLiked ? (
            <HeartFilled
              onClick={handleLike}
              style={{ fontSize: "25px", color: "red" }}
            />
          ) : (
            <HeartOutlined onClick={handleLike} style={{ fontSize: "25px" }} />
          )}
        </div>
      </div>
    </div>
  );
};
export default LikeSection;
