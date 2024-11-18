import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useGetAuthors = (name = "", limit = 10, offset = 0) => {
  return useQuery({
    queryKey: ["getAuthors", name, limit, offset],
    queryFn: async () => {
      const response = await gatewayRequest.get(
        `/authors/list?name=${name}&limit=${limit}&offset=${offset}`
      );
      return response.data;
    },
    onSuccess: (authors) => {
      console.log("Authors list:", authors);
    },
    onError: (error) => {
      console.error("Error fetching authors:", error);
    },
  });
};
