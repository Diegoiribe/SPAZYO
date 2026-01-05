import React from 'react';
import { Header } from '../components/Header';
import { Pedidos } from './Pedidos';

export const Admin = ({
  isToggleOpen,
  setIsToggleOpen,
  isAdmin,
  isBagOpen,
  setIsBagOpen
}) => {
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
        />
      </div>
      <Pedidos />
    </div>
  );
};
