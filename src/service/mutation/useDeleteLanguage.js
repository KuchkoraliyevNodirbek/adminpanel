import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useDeleteLanguages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      gatewayRequest
        .delete(`/languages/delete?id=${id}`)
        .then((res) => res.data),
    onSuccess: (res) => {
      console.log("Shahar muvaffaqiyatli o'chirildi:", res);
      queryClient.invalidateQueries("getCitiesList");
    },
    onError: (error) => {
      console.error("Shahar o'chirishda xato:", error);
    },
  });
};
