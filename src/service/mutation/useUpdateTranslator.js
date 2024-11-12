import { useMutation } from '@tanstack/react-query';
import { gatewayRequest } from '../../config/geteway-request';

// Custom hook for updating a translator
export const useUpdateTranslator = () => {
  // Define the mutation function to handle the update request
  const mutation = useMutation({
    mutationFn: async ({ id, translatorData }) => {
      // Send the PUT request with the translator ID as a query parameter
      // and the updated translator data as the body
      const response = await gatewayRequest.put(`/translators/update?id=${id}`, translatorData);
      return response.data; // Return updated data from the response
    },
    onSuccess: (data) => {
      // Handle successful update
      console.log('Translator updated successfully:', data);
    },
    onError: (error) => {
      // Handle error during the update
      console.error('Error updating translator:', error);
    },
  });

  return mutation;
};
