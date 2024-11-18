import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useGetTranslatorById = (id) => {
  return useQuery({
    queryKey: ["getTranslatorById", id],
    queryFn: async () => {
      const response = await gatewayRequest.get(`/translators/get?id=${id}`);
      return response.data;
    },
    enabled: !!id,
    onSuccess: (data) => {
      console.log("Fetched translator:", data);
    },
    onError: (error) => {
      console.error("Error fetching translator:", error);
    },
  });
};
