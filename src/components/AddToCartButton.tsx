import AddToCartIcon from '../assets/images/icon-add-to-cart.svg';
import DecrementIcon from '../assets/images/icon-decrement-quantity.svg?react';
import IncrementIcon from '../assets/images/icon-increment-quantity.svg?react';

interface Props {
  quantity: number;
  onAddToCart: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

const AddToCartButton = ({
  quantity,
  onAddToCart,
  onIncrement,
  onDecrement,
}: Props) => {
  if (quantity === 0)
    return (
      <button
        className='flex items-center gap-2
      cursor-pointer font-medium
      bg-white text-rose-900
      rounded-full py-2 min-w-[150px] px-4 border-1 border-rose-300
      hover:border-red hover:text-red transition-colors
      '
        onClick={onAddToCart}
      >
        <img src={AddToCartIcon} alt='Add To Cart' />
        Add to cart
      </button>
    );
  return (
    <div
      className='flex items-center justify-around gap-2
      bg-red text-white
      rounded-full min-w-[150px] py-2 '
    >
      <button
        className='icon-container'
        onClick={onDecrement}
      >
        <DecrementIcon />
      </button>
      <span>{quantity}</span>
      <button
        className='icon-container'
        onClick={onIncrement}
      >
        <IncrementIcon />
      </button>
    </div>
  );
};

export default AddToCartButton;
