import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useGetBooks = ({
  limit = 1000000,
  offset = 0,
  price_from = null,
  price_to = null,
  seller_id = "",
  publisher_id = "",
  category_id = "",
  translator_id = "",
  author_id = "",
  language_id = "",
  city_id = "",
  district_id = "",
  title = "",
  writing_type = "",
  status = "",
  is_new = null, // default qiymati null
} = {}) => {
  return useQuery({
    queryKey: [
      "getBooks",
      limit,
      offset,
      price_from,
      price_to,
      seller_id,
      publisher_id,
      category_id,
      translator_id,
      author_id,
      language_id,
      city_id,
      district_id,
      title,
      writing_type,
      status,
      is_new,
    ],
    queryFn: async () => {
      const params = {
        limit: Number(limit),
        offset: Number(offset),
        ...(price_from !== null && { price_from }),
        ...(price_to !== null && { price_to }),
        ...(publisher_id && { publisher_id }),
        ...(seller_id && { seller_id }),
        ...(category_id && { category_id }),
        ...(translator_id && { translator_id }),
        ...(author_id && { author_id }),
        ...(language_id && { language_id }),
        ...(city_id && { city_id }),
        ...(district_id && { district_id }),
        ...(title && { title }),
        ...(writing_type && { writing_type }),
        ...(status && { status }),
        ...(is_new !== null && { is_new }),
      };

      console.log("Request parameters:", params);

      const response = await gatewayRequest.get(`/books/list`, { params });
      return response.data;
    },
    onSuccess: (books) => {
      console.log("Books list:", books);
    },
    onError: (error) => {
      console.error("Error fetching books:", error?.response?.data || error);
    },
  });
};
