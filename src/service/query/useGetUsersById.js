import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useGetAdminById = (id) => {
  return useQuery({
    queryKey: ["getAdminById", id],
    queryFn: () =>
      request.get(`/auth/admin/user/get?id=${id}`).then((res) => res.data),
    enabled: !!id,
    onSuccess: (admin) => {
      console.log("Admin topildi:", admin);
    },
    onError: (error) => {
      console.error("Adminni olishda xatolik yuz berdi:", error);
    },
  });
};
