/* eslint-disable react/button-has-type */

"use client";

import useUserInfo from "../../hook/auth/useUserInfo";
import CommonLoading from "../Loading";

const MiniProfile = ({ onCreatePost }) => {
  const { data, isLoading } = useUserInfo();
  const user = data?.data;
  return isLoading ? (
    <CommonLoading />
  ) : (
    <div className="flex items-center justify-between mt-14 ml-10 w-full">
      <img
        src={user?.avatarUrl}
        alt="user-profile-pic or instagram logo"
        className="w-16 h-16 rounded-full border p-[2px]"
      />
      <div className="flex-1 ml-4">
        <h2 className="font-bold">{user?.fullName} </h2>
        <h3 className="text-sm text-[#fff]">Bạn đang nghĩ gì?</h3>
      </div>

      <button
        onClick={onCreatePost}
        className="text-[#fff] text-sm font-semibold"
      >
        Tạo bài Viết
      </button>
    </div>
  );
};
export default MiniProfile;
