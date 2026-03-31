import React from 'react';
import { Header } from '../components/Header';
import { CatalogTemplate } from '../components/CatalogTemplate';

export const Catalog = ({
  isToggleOpen,
  setIsToggleOpen,
  isBagOpen,
  setIsBagOpen,
  subdomain
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
          subdomain={subdomain}
        />
      </div>

      <p className="mt-2 mb-2 text-lg font-medium text-neutral-800">View all</p>
      <CatalogTemplate subdomain={subdomain} />
    </div>
  );
};
