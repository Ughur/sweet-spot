import Cart from './components/Cart';
import DessertGrid from './components/DessertGrid';
import useDesserts from './hooks/useDesserts';

const App = () => {
  const { data: desserts } = useDesserts();
  const safeDesserts = desserts ?? [];
  return (
    <>
      <DessertGrid desserts={safeDesserts} />
      <Cart desserts={safeDesserts} />
    </>
  );
};

export default App;
