import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useAdminCreate = () => {
  return useMutation({
    mutationFn: (data) =>
      request.post("/auth/admin/add/admin", data).then((res) => res.data),
    onSuccess: (res) => {
      console.log("Admin created successfully:", res);
    },
    onError: (error) => {
      console.error("Error creating admin:", error);
    },
  });
};
