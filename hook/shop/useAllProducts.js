/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import { useQuery } from "@tanstack/react-query";
import { ALL_PRODUCT } from "./constants";
import shopApi from "../../api/shopApi";

const useAllProducts = () =>
  useQuery({
    queryKey: [ALL_PRODUCT],
    queryFn: () => shopApi.get(`/products`),
  });
export default useAllProducts;
