/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import { useQuery } from "@tanstack/react-query";
import authApi from "../../api/authApi";
import { DISPLAY_USER } from "./constants";

const useAllUserInformation = () =>
  useQuery({
    queryKey: [DISPLAY_USER],
    queryFn: () => authApi.get(`/user/displays`),
  });
export default useAllUserInformation;
