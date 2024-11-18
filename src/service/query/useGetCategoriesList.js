import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useGetCategories = (name = "", limit = 100000000, offset = 0) => {
  return useQuery({
    queryKey: ["getCategories", name, limit, offset],
    queryFn: async () => {
      const response = await gatewayRequest.get(
        `/categories/list?name=${name}&limit=${limit}&offset=${offset}`
      );
      return response.data;
    },
    onSuccess: (categories) => {
      console.log("Categories list:", categories);
    },
    onError: (error) => {
      console.error("Error fetching categories:", error);
    },
  });
};
