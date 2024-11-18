import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useGetPublisherById = (id) => {
  return useQuery({
    queryKey: ["getCategoryById", id],
    queryFn: () =>
      gatewayRequest.get(`/publishers/get?id=${id}`).then((res) => res.data),
    onSuccess: (category) => {
      console.log("Kategoriya topildi:", category);
    },
    onError: (error) => {
      console.error("Kategoriyani olishda xatolik yuz berdi:", error);
    },
  });
};
