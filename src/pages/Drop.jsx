import React from 'react';
import { Header } from '../components/Header';
import { DropTemplate } from '../components/DropTemplate';

export const Drop = ({
  isToggleOpen,
  setIsToggleOpen,
  isBagOpen,
  setIsBagOpen
}) => {
  return (
    <div className="max-w-md p-6 mx-auto mt-15">
      <div className="sticky top-0 z-50">
        <Header
          isVisible={true}
          isToggleOpen={isToggleOpen}
          setIsToggleOpen={setIsToggleOpen}
          isBagOpen={isBagOpen}
          setIsBagOpen={setIsBagOpen}
        />
      </div>
      <DropTemplate />
    </div>
  );
};
