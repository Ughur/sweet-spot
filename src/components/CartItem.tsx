import { Cart } from '../types/cart';
import { Dessert } from '../types/desserts';

interface Props {
  cartItem: Cart;
  dessert: Dessert | undefined;
}
const CartItem = ({ cartItem, dessert }: Props) => {
  return (
    <div key={cartItem.id}>
      <h1>{dessert?.name}</h1>
    </div>
  );
};

export default CartItem;
