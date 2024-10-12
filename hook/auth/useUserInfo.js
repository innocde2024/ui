/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
import { useQuery } from "@tanstack/react-query";
import authApi from "../../api/authApi";
import { USER_INFO } from "./constants";

const useUserInfo = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  return useQuery({
    queryKey: [USER_INFO],
    queryFn: () =>
      authApi.get("/profile", {
        headers: {
          Authorization: token,
        },
      }),
    cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: !!token,
  }); // ko cham data
};
export default useUserInfo;
