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
    <div className="max-w-md mx-auto mt-15">
      <div className="sticky top-0 z-50 px-6 pt-6">
        <Header
          isVisible={true}
          isToggleOpen={isToggleOpen}
          setIsToggleOpen={setIsToggleOpen}
          isBagOpen={isBagOpen}
          setIsBagOpen={setIsBagOpen}
          subdomain={subdomain}
        />
      </div>

      <CatalogTemplate subdomain={subdomain} />
    </div>
  );
};
