import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gatewayRequest as request } from "../../config/geteway-request";

export const useDeleteTranslator = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) =>
            request
                .delete(`/translators/delete?id=${id}`)
                .then((res) => res.data),
        onSuccess: (res) => {
            console.log("Translator muvaffaqiyatli o'chirildi:", res);
            queryClient.invalidateQueries("getTranslatorsList");
        },
        onError: (error) => {
            console.error("Translator o'chirishda xato:", error);
        },
    });
};
