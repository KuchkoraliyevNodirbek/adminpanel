import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useGetBooks = (limit = 10, offset = 0) => {
  return useQuery({
    queryKey: ["getBooks", limit, offset], // Query key for caching
    queryFn: async () => {
      // Fetch books from the API
      const response = await gatewayRequest.get(`/books/list?limit=${limit}&offset=${offset}`);
      return response.data; // Ensure response.data has the expected structure
    },
    onSuccess: (data) => {
      console.log("Books list:", data); // Log books on success
    },
    onError: (error) => {
      console.error("Error fetching books:", error); // Log error on failure
    },
    // Retry configuration can be added here if necessary
  });
};
