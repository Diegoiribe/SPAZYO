import React from 'react';
import { Header } from '../components/Header';
import { Pedidos } from './Pedidos';

export const Admin = ({ isToggleOpen, setIsToggleOpen, isAdmin }) => {
  return (
    <div className="p-6 mt-15">
      <div className='className="sticky top-0 z-50"'>
        <Header
          isVisible={true}
          isToggleOpen={isToggleOpen}
          setIsToggleOpen={setIsToggleOpen}
          isAdmin={isAdmin}
        />
      </div>
      <Pedidos />
    </div>
  );
};
