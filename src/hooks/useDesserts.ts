import { useQuery } from "@tanstack/react-query"
import ApiClient from "../services/api-client"
import { Dessert } from "../types/desserts"

const useDesserts = () => {
    const apiClient = new ApiClient<Dessert>('/desserts')

    return useQuery({
        queryKey: ['desserts'],
        queryFn: () => apiClient.getAll(),
    });
}

export default useDesserts;