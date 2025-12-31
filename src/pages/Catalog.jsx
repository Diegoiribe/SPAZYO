import React from 'react';
import { Header } from '../components/Header';
import { CatalogTemplate } from '../components/CatalogTemplate';

export const Catalog = ({ isToggleOpen, setIsToggleOpen }) => {
  return (
    <div className="p-6 mt-15">
      <div className="sticky top-0 z-50">
        <Header
          isVisible={true}
          isToggleOpen={isToggleOpen}
          setIsToggleOpen={setIsToggleOpen}
        />
      </div>
      <CatalogTemplate />
    </div>
  );
};
