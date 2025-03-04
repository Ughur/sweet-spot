import useCart from '../hooks/useCart';
import { Dessert } from '../types/desserts';
import CartItem from './CartItem';
import EmptyCartImage from '../assets/images/illustration-empty-cart.svg?react';
import CarbonNeutralImage from '../assets/images/icon-carbon-neutral.svg?react';
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
        <>
          <div className='cart-items mt-4'>
            {cart?.map((cartItem) => (
              <CartItem
                key={cartItem.id ?? cartItem.dessertId}
                cartItem={cartItem}
                dessert={desserts?.find((d) => d.id === cartItem.dessertId)}
                onRemoveFromCart={() => deleteCart.mutate(cartItem.id ?? 0)}
              />
            ))}
          </div>
          <div className=''>
            <div className='flex justify-between items-center mt-5'>
              <span className='text-rose-500 font-medium'>Order Total</span>
              <span className='text-rose-900 font-bold text-2xl'>
                $
                {cart?.reduce(
                  (acc, item) =>
                    acc +
                    item.quantity *
                      (desserts?.find((d) => d.id === item.dessertId)?.price ??
                        0),
                  0
                )}
              </span>
            </div>
            <p className='flex-center gap-1 mt-6'>
              <CarbonNeutralImage /> This is a{' '}
              <span className='font-medium'>carbon-neutral</span> delivery
            </p>
            <button
              className='flex-center w-full mt-6 
            bg-red rounded-full px-4 py-3 text-white cursor-pointer
            font-medium  transition-colors hover:bg-[#6B1515]'
            >
              Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
