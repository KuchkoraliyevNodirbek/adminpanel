import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useDeleteDistricts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      gatewayRequest
        .delete(`/districts/delete?id=${id}`)
        .then((res) => res.data),
    onSuccess: (res) => {
      console.log("Tuman muvaffaqiyatli o'chirildi:", res);
      queryClient.invalidateQueries("getDistrictsList");
    },
    onError: (error) => {
      console.error("Tuman o'chirishda xato:", error);
    },
  });
};
