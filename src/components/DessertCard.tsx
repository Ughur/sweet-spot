import { Dessert } from '../types/desserts';
interface Props {
  dessert: Dessert;
}
const DessertCard = ({ dessert }: Props) => {
  const imagePath = new URL(
    dessert.image.thumbnail,
    import.meta.url
  ).href;

  return (
    <div>
      <h1>{dessert.name}</h1>
      <p>{dessert.category}</p>
      <p>{dessert.price}</p>
      <img src={imagePath} alt={dessert.name} />
    </div>
  );
};

export default DessertCard;
