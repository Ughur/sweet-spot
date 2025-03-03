import useCart from '../hooks/useCart';
import { Dessert } from '../types/desserts';
import CartItem from './CartItem';
import EmptyCartImage from '../assets/images/illustration-empty-cart.svg?react';
interface Props {
  desserts: Dessert[];
}
const Cart = ({ desserts }: Props) => {
  const { cart, deleteCart } = useCart();

  return (
    <div className='cart-container'>
      <h1 className='text-red text-2xl font-bold'>
        Your Cart({cart?.length ?? 0})
      </h1>
      {cart?.length === 0 ? (
        <div className='flex-center flex-col'>
          <EmptyCartImage />
          <h1 className='text-rose-500 font-medium'>
            Your added items will appear here
          </h1>
        </div>
      ) : (
        <div className='cart-items'>
          {cart?.map((cartItem) => (
            <CartItem
              key={cartItem.id ?? cartItem.dessertId}
              cartItem={cartItem}
              dessert={desserts?.find(
                (d) => d.id === cartItem.dessertId
              )}
              onRemoveFromCart={() =>
                deleteCart.mutate(cartItem.id ?? 0)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
