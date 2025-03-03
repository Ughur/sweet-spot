import useCart from '../hooks/useCart';
import { Dessert } from '../types/desserts';
import CartItem from './CartItem';

interface Props {
  desserts: Dessert[];
}
const Cart = ({ desserts }: Props) => {
  const { cart } = useCart();
  return (
    <>
      <h1 className='text-red text-2xl font-bold'>
        Your Cart(2)
      </h1>
      {cart?.map((cartItem) => (
        <CartItem
          key={cartItem.id}
          cartItem={cartItem}
          dessert={desserts?.find(
            (d) => d.id === cartItem.dessertId
          )}
        />
      ))}
    </>
  );
};

export default Cart;
