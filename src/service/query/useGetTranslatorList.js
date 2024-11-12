import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request"

export const useGetTranslatorsList = (
  name = "",
  surname = "",
  limit = 10,
  offset = 0
) => {
  return useQuery({
    queryKey: ["getTranslatorsList", name, surname, limit, offset],
    queryFn: async () => {
      const response = await gatewayRequest.get(
        `/translators/list?name=${name}&surname=${surname}&limit=${limit}&offset=${offset}`
      );
      return response.data;
    },
    onSuccess: (translators) => {
      console.log("Translators list:", translators);
    },
    onError: (error) => {
      console.error("Error fetching translators:", error);
    },
  });
};
