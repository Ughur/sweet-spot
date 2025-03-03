import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Cart } from '../types/cart';
import ApiClient from '../services/api-client';

const useCart = () => {
  const queryClient = useQueryClient();
  const apiClient = new ApiClient<Cart>('/cart');

  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => apiClient.getAll(),
  });

  const addToCart = useMutation({
    mutationFn: apiClient.create,
    onMutate: (newItem) => {
      queryClient.cancelQueries({ queryKey: ['cart'] });

      const previousCarts = queryClient.getQueryData<
        Cart[]
      >(['cart']);
      const optimisticUpdate = [
        ...(previousCarts ?? []),
        newItem,
      ];

      queryClient.setQueryData(
        ['cart'],
        () => optimisticUpdate
      );

      return { previousCarts };
    },
    onError: (_error, _newItem, context) => {
      queryClient.setQueryData(
        ['cart'],
        context?.previousCarts
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const updateCart = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Cart>;
    }) => apiClient.update(id, data),
    onMutate: ({ id, data }) => {
      queryClient.cancelQueries({ queryKey: ['cart'] });

      const previousCarts = queryClient.getQueryData<
        Cart[]
      >(['cart']);
      const optimisticUpdate = previousCarts?.map(
        (cartItem) =>
          cartItem.id === id
            ? { ...cartItem, ...data }
            : cartItem
      );

      queryClient.setQueryData(
        ['cart'],
        () => optimisticUpdate
      );
      return { previousCarts };
    },
    onError: (_error, _newItem, context) => {
      queryClient.setQueryData(
        ['cart'],
        context?.previousCarts
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const deleteCart = useMutation({
    mutationFn: apiClient.delete,
    onMutate: (id) => {
      queryClient.cancelQueries({ queryKey: ['cart'] });

      const previousCarts = queryClient.getQueryData<
        Cart[]
      >(['cart']);
      const optimisticUpdate = previousCarts?.filter(
        (cartItem) => cartItem.id !== id
      );

      queryClient.setQueryData(
        ['cart'],
        () => optimisticUpdate
      );
      return { previousCarts };
    },
    onError: (_error, _newItem, context) => {
      queryClient.setQueryData(
        ['cart'],
        context?.previousCarts
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return {
    cart,
    isLoading,
    addToCart,
    updateCart,
    deleteCart,
  };
};

export default useCart;
