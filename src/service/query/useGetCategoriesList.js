// import { useQuery } from "@tanstack/react-query";
// import { request } from "../../config/request"; // Assuming you have a request configuration like Axios

// export const useGetCategories = (name = 'string', limit = 10, offset = 0) => {
//     return useQuery({
//         queryKey: ["getCategories", name, limit, offset], // Adding name, limit, and offset to the queryKey
//         queryFn: () =>
//             request.get(`/categories/list?name=${name}&limit=${limit}&offset=${offset}`).then((res) => res.data),
//         onSuccess: (res) => {
//             console.log("Categories list:", res);
//         },
//         onError: (error) => {
//             console.error("Error fetching categories:", error);
//         },
//     });
// };


import { useQuery } from "@tanstack/react-query";
import { gatewayRequest } from "../../config/geteway-request";

export const useGetCategories = (name = '', limit = 10, offset = 0) => {
    return useQuery({
        queryKey: ["getCategories", name, limit, offset], // Query key
        queryFn: async () => {
            const response = await gatewayRequest.get(`/categories/list?name=${name}&limit=${limit}&offset=${offset}`);
            return response.data.categories; // Return the categories array from the response
        },
        onSuccess: (categories) => {
            console.log("Categories list:", categories); // Log categories on success
        },
        onError: (error) => {
            console.error("Error fetching categories:", error); // Log error on failure
        },
        // Retry configuration can be added here if necessary
    });
};


// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// export const useGetCategories = (searchTerm, limit, offset) => {
//   return useQuery(['categories', searchTerm, limit, offset], async () => {
//     const response = await axios.get(`your-api-url/categories`, {
//       params: {
//         _limit: limit,
//         _page: Math.floor(offset / limit) + 1, // Calculate page number
//       },
//     });
//     return response.data;
//   });
// };
