import React from 'react';
import { Header } from '../components/Header';
import { CatalogTemplate } from '../components/CatalogTemplate';

export const Catalog = ({
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

      <p className="mb-2 text-[11px] font-semibold uppercase truncate text-neutral-800">
        view all
      </p>
      <CatalogTemplate />
    </div>
  );
};
