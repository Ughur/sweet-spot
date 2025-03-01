import { useQuery } from "@tanstack/react-query";
import { Cart } from "../types/cart";
import ApiClient from "../services/api-client";

const useCart = () => {
    const apiClient = new ApiClient<Cart>('/cart')

    return useQuery({
        queryKey: ['cart'],
        queryFn: () => apiClient.getAll(),
    });
}

export default useCart;