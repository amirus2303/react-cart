// components
import Navbar from './Navbar';
import CartContainer from './CartContainer';
import { useAppContext } from './context';


function App() {
  const { loading } = useAppContext()
  return (
    <main>
      <Navbar />
      {!loading && <CartContainer />}
      {loading && <div className='loading' style={{ marginTop: '6rem' }}></div>}
    </main>
  );
}

export default App;
