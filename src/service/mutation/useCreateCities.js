import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useCreateCities = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCities) => {
      return gatewayRequest.post("/cities/create", newCities);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getCitiesList"]);
      console.log("Shahar muvaffaqiyatli yaratildi");
    },
    onError: (error) => {
      console.error("Shahar yaratishda xatolik:", error);
    },
  });
};
