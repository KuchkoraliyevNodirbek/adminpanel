import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      gatewayRequest.delete(`https://gateway.axadjonovsardorbek.uz/categories/delete?id=${id}`).then((res) => res.data), // URLni yangilash
    onSuccess: (res) => {
      console.log("Kategoriyangiz muvaffaqiyatli o'chirildi:", res);
      // Kategoriyalar ro'yxatini yangilash
      queryClient.invalidateQueries("categoryList"); // Kategoriyalar ro'yxatini yangilash
    },
    onError: (error) => {
      console.error("Kategoriyani o'chirishda xato:", error);
    },
  });
};
