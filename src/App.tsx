import Cart from './components/Cart';
import DessertGrid from './components/DessertGrid';
import useDesserts from './hooks/useDesserts';

const App = () => {
  const { data: desserts } = useDesserts();
  const safeDesserts = desserts ?? [];
  return (
    <div className='container mx-auto p-4'>
      <div className='flex flex-col md:flex-row gap-6'>
        <div className='flex-1'>
          <DessertGrid desserts={safeDesserts} />
        </div>
        <div className='w-full md:w-1/6 lg:w-1/4'>
          <Cart desserts={safeDesserts} />
        </div>
      </div>
    </div>
  );
};

export default App;
