import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Cart } from '../types/cart';
import ApiClient from '../services/api-client';



const useCart = () => {
  const queryClient = useQueryClient();
  const apiClient = new ApiClient<Cart>('/cart');

  const handleMutate = (
    updater: (cartItems: Cart[] | undefined) => Cart[]
  ) => {
    queryClient.cancelQueries({ queryKey: ['cart'] });

    const previousCarts = queryClient.getQueryData<Cart[]>(['cart']);
    const optimisticUpdate = updater(previousCarts);

    queryClient.setQueryData(['cart'], () => optimisticUpdate);

    return { previousCarts };
  };

  const handleError = (context: { previousCarts?: Cart[] }) => {
    queryClient.setQueryData(['cart'], context.previousCarts);
  };

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['cart'] });
  };



  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => apiClient.getAll(),
  });

  const addToCart = useMutation({
    mutationFn: apiClient.create,
    onMutate: (newItem) => handleMutate((previousCarts) => [
      ...(previousCarts ?? []),
      newItem,
    ]),
    onError: (_error, _newItem, context) => handleError({ previousCarts: context?.previousCarts }),
    onSuccess: () => handleSuccess(),
  });

  const updateCart = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Cart> }) =>
      apiClient.update(id, data),
    onMutate: ({ id, data }) => handleMutate((previousCarts) =>
      previousCarts?.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, ...data } : cartItem
      ) ?? []
    ),
    onError: (_error, _newItem, context) => handleError({ previousCarts: context?.previousCarts }),
    onSuccess: () => handleSuccess(),
  });

  const deleteCart = useMutation({
    mutationFn: apiClient.delete,
    onMutate: (id) =>
      handleMutate((previousCarts) =>
        previousCarts?.filter((cartItem) => cartItem.id !== id) ?? []
      ),
    onError: (_error, _newItem, context) => handleError({ previousCarts: context?.previousCarts }),
    onSuccess: () => handleSuccess(),
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
