/* eslint-disable no-unused-expressions */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable react/function-component-definition */
import { MessageOutlined } from "@ant-design/icons";

("use client");

const CommentSection = ({ comment }) => (
  <div className=" flex items-center  gap-1">
    <span>{!!comment?.length && comment?.length}</span>
    <span className="cursor-pointer">
      <MessageOutlined style={{ fontSize: "25px" }} />
    </span>
  </div>
);
export default CommentSection;
