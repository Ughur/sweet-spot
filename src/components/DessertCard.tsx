import { Dessert } from '../types/desserts';
import AddToCartButton from './AddToCartButton';
interface Props {
  dessert: Dessert;
}
const DessertCard = ({ dessert }: Props) => {
  return (
    <div>
      <div className='rounded-md overflow-hidden'>
        <picture>
          <source
            srcSet={dessert.image.mobile}
            media='(max-width: 640px)'
          />
          <source
            srcSet={dessert.image.tablet}
            media='(max-width: 1280px)'
          />
          <source
            srcSet={dessert.image.desktop}
            media='(min-width: 1281px)'
          />
          <img
            src={dessert.image.thumbnail}
            alt={dessert.name}
            className='w-full'
          />
        </picture>
      </div>
      <div className='mt-6 relative'>
        <p className='text-rose-500 text-sm lg:text-lg'>
          {dessert.category}
        </p>
        <h1 className='font-medium text-rose-900'>
          {dessert.name}
        </h1>
        <p className='font-medium text-red'>
          ${dessert.price.toFixed(2)}
        </p>
        <div
          className='w-full absolute -top-11 left-1/2 
        transform -translate-x-1/2
        flex justify-center
        '
        >
          <AddToCartButton
            quantity={0}
            onDecrement={() => {}}
            onIncrement={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default DessertCard;
