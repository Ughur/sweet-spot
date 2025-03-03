import { Cart } from '../types/cart';
import { Dessert } from '../types/desserts';
import RemoveFromCartIcon from '../assets/images/icon-remove-item.svg?react';

interface Props {
  cartItem: Cart;
  dessert: Dessert | undefined;
  onRemoveFromCart: () => void;
}
const CartItem = ({ cartItem, dessert, onRemoveFromCart }: Props) => {
  return (
    <div key={cartItem.id} className='flex justify-between items-center mt-4'>
      <div className='flex flex-col'>
        <h1 className='font-medium text-rose-900'>{dessert?.name}</h1>
        <div className='flex gap-2 text-rose-500'>
          <span className='text-red'>x{cartItem.quantity}</span>
          <span>@ ${dessert?.price.toFixed(2)}</span>
          <span className='font-medium'>
            ${((dessert?.price ?? 0) * cartItem.quantity).toFixed(2)}
          </span>
        </div>
      </div>

      <button className='flex-center' onClick={onRemoveFromCart}>
        <div className='icon-container text-rose-400'>
          <RemoveFromCartIcon />
        </div>
      </button>
    </div>
  );
};

export default CartItem;
