import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useGetAuthorsById = (id) => {
  return useQuery({
    queryKey: ["getAuthorsById", id],
    queryFn: () =>
      gatewayRequest.get(`/authors/get?id=${id}`).then((res) => res.data),
    onSuccess: (author) => {
      console.log("Muallif topildi:", author);
    },
    onError: (error) => {
      console.error("Muallifni olishda xatolik yuz berdi:", error);
    },
  });
};
