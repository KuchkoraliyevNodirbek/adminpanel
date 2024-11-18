import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useGetVacancies = ({
  title = "",
  working_styles = "",
  working_types = "",
  salary_from = null,
  salary_to = null,
  status = "",
  publisher_id = null,
  city_id = "",
  district_id = null,
  limit = 10,
  offset = 0,
} = {}) => {
  return useQuery({
    queryKey: [
      "getVacancies",
      title,
      working_styles,
      working_types,
      salary_from,
      salary_to,
      status,
      publisher_id,
      city_id,
      district_id,
      limit,
      offset,
    ],
    queryFn: async () => {
      const params = {
        ...(title && { title }),
        ...(working_styles && { working_styles }),
        ...(working_types && { working_types }),
        ...(salary_from !== null && { salary_from }),
        ...(salary_to !== null && { salary_to }),
        ...(status && { status }),
        ...(publisher_id !== null && { publisher_id }),
        ...(city_id && { city_id }),
        ...(district_id !== null && { district_id }),
        ...(limit && { limit }),
        ...(offset && { offset }),
      };

      console.log("Request parameters:", params);

      const response = await gatewayRequest.get("/vacancies/list", { params });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Vacancies data:", data);
    },
    onError: (error) => {
      console.error(
        "Error fetching vacancies:",
        error?.response?.data || error
      );
    },
  });
};
