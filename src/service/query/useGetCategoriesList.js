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
import { gatewayRequest } from "../../config/gateway-request";

export const useGetCategories = (name = '', limit = 10, offset = 0) => {
    return useQuery({
        queryKey: ["getCategories", name, limit, offset],
        queryFn: async () => {
            const response = await gatewayRequest.get(`/categories/list?name=${name}&limit=${limit}&offset=${offset}`);
            return response.data.categories; // return the categories array from the response
        },
        onSuccess: (categories) => {
            console.log("Categories list:", categories);
        },
        onError: (error) => {
            console.error("Error fetching categories:", error);
        },
    });
};
