import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useUpdateAuthors = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...updatedData }) =>
      gatewayRequest
        .put(`/authors/update?id=${id}`, updatedData)
        .then((res) => res.data),
    onSuccess: (res) => {
      console.log("Muallif muvaffaqiyatli yangilandi:", res);
      queryClient.invalidateQueries("authorsList");
    },
    onError: (error) => {
      console.error("Muallifni yangilashda xato:", error);
    },
  });
};
