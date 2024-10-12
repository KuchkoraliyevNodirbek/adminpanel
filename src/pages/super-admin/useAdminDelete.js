import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useAdminDelete = (id) => {
    return useQuery({
        queryKey: ["adminDelete", id], // queryKey ga id qo'shildi          
        queryFn: () => request.delete(`/auth/admin/delete/${id}`).then((res) => res.data),
        onSuccess: (res) => {
            console.log("Admin deleted successfully:", res);
        },
        onError: (error) => {
            console.error("Error deleting admin:", error);  // Xato holatida xabar berish
        },
    });
}