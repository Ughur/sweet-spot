import { Dessert } from '../types/desserts';
import DessertCard from './DessertCard';

interface Props {
  desserts: Dessert[];
}

const DessertGrid = ({ desserts }: Props) => {
  return desserts?.map((dessert) => (
    <DessertCard key={dessert.id} dessert={dessert} />
  ));
};

export default DessertGrid;
