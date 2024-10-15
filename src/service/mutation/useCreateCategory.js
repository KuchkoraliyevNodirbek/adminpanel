import { useMutation } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/gateway-request";
// import { request } from "../../config/request"; 


export const useCreateCategory = () => {

  
    return useMutation({
        mutationFn: (newCategory) =>
             gatewayRequest.post("/categories/create", newCategory, {
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                },
            }).then((res) => res.data),
        onSuccess: (res) => {
            console.log("Kategoriya muvaffaqiyatli yaratildi:", res);
        },
        onError: (error) => {
            console.error("Kategoriya yaratishda xatolik:", error);
        },
    });
};
