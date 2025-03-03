import { useEffect, useState } from 'react';
import useCart from '../hooks/useCart';
import { Dessert } from '../types/desserts';
import AddToCartButton from './AddToCartButton';
interface Props {
  dessert: Dessert;
}
const DessertCard = ({ dessert }: Props) => {
  const { addToCart, updateCart, deleteCart, cart } = useCart();

  const cartId = cart?.find((item) => item.dessertId === dessert.id);

  const [quantity, setQuantity] = useState(cartId?.quantity ?? 0);

  useEffect(() => {
    setQuantity(cartId?.quantity ?? 0);
  }, [cart, cartId]);

  return (
    <div>
      <div className='rounded-md overflow-hidden'>
        <picture>
          <source srcSet={dessert.image.mobile} media='(max-width: 640px)' />
          <source srcSet={dessert.image.tablet} media='(max-width: 1280px)' />
          <source srcSet={dessert.image.desktop} media='(min-width: 1281px)' />
          <img
            src={dessert.image.thumbnail}
            alt={dessert.name}
            className='w-full'
          />
        </picture>
      </div>
      <div className='mt-6 relative'>
        <p className='text-rose-500 text-sm lg:text-lg'>{dessert.category}</p>
        <h1 className='font-medium text-rose-900'>{dessert.name}</h1>
        <p className='font-medium text-red'>${dessert.price.toFixed(2)}</p>
        <div
          className='w-full absolute -top-11 left-1/2 
        transform -translate-x-1/2
        flex justify-center
        '
        >
          <AddToCartButton
            quantity={quantity}
            onAddToCart={() => {
              setQuantity(1);
              addToCart.mutate({
                dessertId: dessert.id,
                quantity: 1,
              });
            }}
            onDecrement={() => {
              setQuantity(quantity - 1);

              if (quantity <= 1) {
                deleteCart.mutate(cartId?.id ?? 1);
                return;
              }

              updateCart.mutate({
                id: cartId?.id ?? 1,
                data: {
                  dessertId: dessert.id,
                  quantity: quantity - 1,
                },
              });
            }}
            onIncrement={() => {
              setQuantity(quantity + 1);
              updateCart.mutate({
                id: cartId?.id ?? 1,
                data: {
                  dessertId: dessert.id,
                  quantity: quantity + 1,
                },
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DessertCard;
