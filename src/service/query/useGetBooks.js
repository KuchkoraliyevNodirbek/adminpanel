import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useGetBooks = (filters = {}, limit = 10, offset = 0) => {
  return useQuery({
    queryKey: ["getBooks", filters, limit, offset],
    queryFn: async () => {
      const {
        price_from = "",
        price_to = "",
        publisher_id = "",
        category_id = "",
        translator_id = "",
        author_id = "",
        language_id = "",
        city_id = "",
        district_id = "",
        title = "",
        writing_type = "",
      } = filters;

      const response = await gatewayRequest.get(
        `/books/list?price_from=${price_from}&price_to=${price_to}&publisher_id=${publisher_id}&category_id=${category_id}&translator_id=${translator_id}&author_id=${author_id}&language_id=${language_id}&city_id=${city_id}&district_id=${district_id}&title=${title}&writing_type=${writing_type}&limit=${limit}&offset=${offset}`
      );

      return response.data;
    },
    onSuccess: (data) => {
      console.log("Books list:", data);
    },
    onError: (error) => {
      console.error("Error fetching books:", error);
    },
  });
};
