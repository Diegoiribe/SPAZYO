import React from 'react';
import { Header } from '../components/Header';
import { Pedidos } from './Pedidos';
import { Inventario } from './Inventario';
import { useState } from 'react';

export const Admin = ({
  isToggleOpen,
  setIsToggleOpen,
  isAdmin,
  isBagOpen,
  setIsBagOpen
}) => {
  const [page, setPage] = useState('pedidos');

  return (
    <div className="p-6 mt-15">
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
