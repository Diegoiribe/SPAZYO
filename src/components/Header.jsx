import React from 'react';
import { Toggle } from './Toggle';
import { Bag } from './Bag';
import { useEffect, useState } from 'react';
import { get } from '../api/http';

export const Header = ({
  isVisible = false,
  isToggleOpen,
  setIsToggleOpen,
  isAdmin,
  isBagOpen,
  setIsBagOpen,
  setPage,
  subdomain
}) => {
  const [bagItems, setBagItems] = useState([]);
  const [img, setImg] = useState('');
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching data for subdomain:', subdomain);
    const fetchData = async () => {
      try {
        const endpoint =
          subdomain === 'admin' ? '/stores/me' : `/public/stores/${subdomain}`;
        const data = await get(endpoint);
        console.log('Data fetched:', data);
        setImg(data.logo);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setImgLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let interval;

    const loadAsync = () => {
      const storedBag = localStorage.getItem('bag');
      setBagItems(storedBag ? JSON.parse(storedBag) : []);
    };

    // async initial load
    setTimeout(loadAsync, 0);

    // polling
    interval = setInterval(loadAsync, 300);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Bag
        isBagOpen={isBagOpen}
        setIsBagOpen={setIsBagOpen}
        isToggleOpen={isToggleOpen}
        setIsToggleOpen={setIsToggleOpen}
        isAdmin={isAdmin}
        bagItems={bagItems}
        setBagItems={setBagItems}
      />
      <Toggle
        isToggleOpen={isToggleOpen}
        setIsToggleOpen={setIsToggleOpen}
        isAdmin={isAdmin}
        setPage={setPage}
        subdomain={subdomain}
      />

      <div
        className="
        fixed
        p-6
        mt-2
        flex
        top-0
        justify-between
        items-center
        left-0
        right-0
        z-50
        bg-white
        h-[calc(64px+env(safe-area-inset-top))]
        
        "
      >
        {isVisible ? (
          imgLoading ? (
            <div className="rounded-sm size-14 bg-neutral-200 animate-pulse" />
          ) : (
            <img src={img} alt="img" className="object-contain size-14" />
          )
        ) : (
          <div></div>
        )}
        <div className="flex items-center gap-2">
          <svg
            onClick={() => setIsToggleOpen(true)}
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            class="lucide lucide-menu-icon lucide-menu cursor-pointer"
          >
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>

          {/* aqui */}
          {!isAdmin && (
            <div className="relative ">
              <svg
                onClick={() => setIsBagOpen(true)}
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`lucide lucide-shopping-bag-icon  inset-0
  transition-all duration-300 ease-out
  ${
    !isBagOpen
      ? 'opacity-100 scale-100 translate-y-0 delay-200'
      : 'opacity-0 scale-90 -translate-y-0.5 pointer-events-none'
  }
`}
              >
                <path d="M16 10a4 4 0 0 1-8 0" />
                <path d="M3.103 6.034h17.794" />
                <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
              </svg>
              {bagItems.length > 0 && !isBagOpen && (
                <div className="absolute -bottom-1 -left-1 flex items-center justify-center w-3 h-3 text-[8px] font-medium text-white bg-black rounded-full">
                  {bagItems.length}
                </div>
              )}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                className={`lucide lucide-x-icon lucide-x absolute inset-0
  transition-all duration-300 ease-out
  ${
    isBagOpen
      ? 'opacity-100 scale-100 rotate-0'
      : 'opacity-0 scale-110 rotate-45 pointer-events-none '
  }
`}
                onClick={() => setIsBagOpen(false)}
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
