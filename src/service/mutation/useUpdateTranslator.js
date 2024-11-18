import { useMutation } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useUpdateTranslator = () => {
  const mutation = useMutation({
    mutationFn: async ({ id, translatorData }) => {
      const response = await gatewayRequest.put(
        `/translators/update?id=${id}`,
        translatorData
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Translator updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error updating translator:", error);
    },
  });

  return mutation;
};
