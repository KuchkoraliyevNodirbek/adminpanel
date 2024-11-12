import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gatewayRequest as request } from "../../config/geteway-request";

export const useCreateTranslator = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (translatorData) =>
      request
        .post("/translators/create", translatorData)
        .then((res) => res.data),
    onSuccess: (res) => {
      console.log("New translator created:", res);
      // Invalidate or refetch any related queries if needed, e.g., the list of translators
      queryClient.invalidateQueries("translatorsList");
    },
    onError: (error) => {
      console.error("Error creating translator:", error);
    },
  });
};
