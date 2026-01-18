import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Pedidos } from './Pedidos';
import { Inventario } from './Inventario';
import { useNavigate } from 'react-router-dom';
import { get } from '../api/http';

export const Admin = ({
  isToggleOpen,
  setIsToggleOpen,
  isAdmin,
  isBagOpen,
  setIsBagOpen
}) => {
  const [page, setPage] = useState('pedidos');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const checkStore = async () => {
      try {
        const res = await get('/stores', null, 'core');
        const stores = Array.isArray(res) ? res : res?.stores;
        if (Array.isArray(stores) && stores.length === 0) {
          navigate('/register?step=2');
        }
      } catch (error) {
        console.error('Error checking stores:', error);
      }
    };

    checkStore();
  }, [navigate]);

  return (
    <div className="max-w-md p-6 mx-auto mt-15">
      <div className='className="sticky top-0 z-50"'>
        <Header
          isVisible={true}
          isToggleOpen={isToggleOpen}
          setIsToggleOpen={setIsToggleOpen}
          isAdmin={isAdmin}
          isBagOpen={isBagOpen}
          setIsBagOpen={setIsBagOpen}
          setPage={setPage}
        />
      </div>

      {page === 'pedidos' && <Pedidos />}
      {page === 'inventario' && <Inventario />}
    </div>
  );
};
