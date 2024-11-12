import { useQuery } from '@tanstack/react-query';
import { gatewayRequest } from '../../config/geteway-request';

// Custom hook to fetch a translator by their ID
export const useGetTranslatorById = (id) => {
  return useQuery({
    queryKey: ['getTranslatorById', id], // Cache the query using the translator ID
    queryFn: async () => {
      // Fetch the translator's data from the API using the ID as a query parameter
      const response = await gatewayRequest.get(`/translators/get?id=${id}`);
      return response.data; // Return the fetched data
    },
    enabled: !!id, // Only run the query if an ID is provided
    onSuccess: (data) => {
      console.log('Fetched translator:', data);
    },
    onError: (error) => {
      console.error('Error fetching translator:', error);
    },
  });
};
