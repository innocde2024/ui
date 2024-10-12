/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable comma-dangle */
import React, { useState } from "react";
import { Tag } from "antd";

import useAllUserInformation from "../../hook/auth/useUserInfomation";
import LikeSection from "../LikeSection";
import CommentSection from "../CommentSection";
import formatDate from "../../utils/formatDate";
import CommentRealTime from "../commentRealTime";

const Post = ({ post }) => {
  const { data, isLoading } = useAllUserInformation();
  const [isShowComment, setIsShowComment] = useState(false);
  const allInformation = data?.data;
  const userId = post.author;
  const author = allInformation?.find(
    (information) => String(information.id) === String(userId)
  );
  const handleToggleCmt = () => {
    setIsShowComment((pre) => !pre);
  };
  return (
    !isLoading && (
      <div className="bg-orange-100 mx-auto my-7 border border-orange-300 rounded-2xl shadow-lg overflow-hidden max-w-2xl">
        <div className="flex items-center p-3 justify-between border-b border-orange-200">
          <div className="flex items-center ">
            <img
              src={author?.avatarUrl}
              alt="avatar"
              className="h-10 w-10 rounded-full object-cover border p-1 mr-3"
            />
            <div>
              <p className="flex-1 font-bold text-sm">{author?.fullName}</p>
              <p className="text-xs">{formatDate(new Date(post.createdAt))}</p>
            </div>
          </div>
          <Tag color="gold">{post?.topic}</Tag>
        </div>
        <div className="p-3 flex flex-col">
          <p className="text-gray-700 font-normal">{post.content}</p>
          <img
            src={post?.fileUrl}
            alt=""
            className="object-cover max-w-full h-[300px]"
          />
        </div>

        <div className="flex space-x-2 items-center justify-between px-2">
          <LikeSection post={post} />
          <span onClick={handleToggleCmt}>
            <CommentSection comment={post?.comments} />
          </span>
        </div>
        {isShowComment && <CommentRealTime postId={post?._id} />}
      </div>
    )
  );
};
export default Post;
