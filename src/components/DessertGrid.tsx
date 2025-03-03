import { Dessert } from '../types/desserts';
import DessertCard from './DessertCard';

interface Props {
  desserts: Dessert[];
}

const DessertGrid = ({ desserts }: Props) => {
  return (
    <>
      <h1 className='text-4xl font-bold text-rose-900'>
        Desserts
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>
        {desserts.map((dessert) => (
          <DessertCard key={dessert.id} dessert={dessert} />
        ))}
      </div>
    </>
  );
};

export default DessertGrid;
