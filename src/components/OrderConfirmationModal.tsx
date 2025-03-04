import useCart from '../hooks/useCart';
import { Cart } from '../types/cart';
import { Dessert } from '../types/desserts';
import CartItem from './CartItem';
import Modal from './Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  cart: Cart[] | undefined;
  desserts: Dessert[] | undefined;
}

const OrderConfirmationModal = ({
  isOpen,
  onClose,
  total,
  cart,
  desserts,
}: Props) => {
  const { deleteCart } = useCart();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='text-center'>
        <h2 className='text-2xl font-bold text-rose-900 mb-4'>
          Confirm Your Order
        </h2>
        {cart?.map((cartItem) => (
          <CartItem
            key={cartItem.id}
            cartItem={cartItem}
            dessert={desserts?.find((d) => d.id === cartItem.dessertId)}
            onRemoveFromCart={() => deleteCart.mutate(cartItem.id ?? 0)}
          />
        ))}
        <p className='mb-6 text-rose-500'>
          You're about to place an order for a total of{' '}
          <span className='font-bold text-rose-900'>${total.toFixed(2)}</span>
        </p>
        <div className='flex gap-4 justify-center'>
          <button
            onClick={onClose}
            className='px-4 py-2 border border-rose-300 text-rose-900 rounded-full hover:border-red hover:text-red transition-colors'
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-red text-white rounded-full hover:bg-[#6B1515] transition-colors'
          >
            Place Order
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderConfirmationModal;
