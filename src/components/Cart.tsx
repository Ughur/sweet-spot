import useCart from '../hooks/useCart';
import { Dessert } from '../types/desserts';
import CartItem from './CartItem';

interface Props {
  desserts: Dessert[];
}
const Cart = ({ desserts }: Props) => {
  const { data: cart } = useCart();
  return (
    <div>
      <h1>Cart</h1>
      {cart?.map((cartItem) => (
        <CartItem
          key={cartItem.id}
          cartItem={cartItem}
          dessert={desserts?.find(
            (d) => d.id === cartItem.dessertId
          )}
        />
      ))}
    </div>
  );
};

export default Cart;
