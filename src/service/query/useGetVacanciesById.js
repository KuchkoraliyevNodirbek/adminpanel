import { gatewayRequest } from "../../config/geteway-request";
import { useQuery } from "@tanstack/react-query";

export const useGetVacanciesById = (vacancyId) => {
  return useQuery({
    queryKey: ["vacancy", vacancyId],
    queryFn: async () => {
      const { data } = await gatewayRequest.get(
        `/vacancies/get?id=${vacancyId}`
      );
      return data;
    },
    enabled: !!vacancyId,
    onSuccess: (vacancy) => {
      console.log("Vacancy found:", vacancy);
    },
    onError: (error) => {
      console.error("Error fetching vacancy details:", error);
    },
  });
};
