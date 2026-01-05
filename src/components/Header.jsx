import React from 'react';
import { Toggle } from './Toggle';
import { Bag } from './Bag';

export const Header = ({
  isVisible = false,
  isToggleOpen,
  setIsToggleOpen,
  isAdmin,
  isBagOpen,
  setIsBagOpen
}) => {
  console.log(isBagOpen);

  return (
    <>
      <Bag
        isBagOpen={isBagOpen}
        setIsBagOpen={setIsBagOpen}
        isToggleOpen={isToggleOpen}
        setIsToggleOpen={setIsToggleOpen}
        isAdmin={isAdmin}
      />
      <Toggle
        isToggleOpen={isToggleOpen}
        setIsToggleOpen={setIsToggleOpen}
        isAdmin={isAdmin}
      />

      <div
        className="
        fixed
        p-6
        flex
        top-0
        justify-between
        left-0
        right-0
        z-50
        bg-white
        h-[calc(64px+env(safe-area-inset-top))]
        "
      >
        <svg
          onClick={() => setIsToggleOpen(true)}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth=".5"
          strokeLinecap="round"
          strokeLinejoin="round"
          class="lucide lucide-menu-icon lucide-menu cursor-pointer"
        >
          <path d="M4 5h16" />
          <path d="M4 12h16" />
          <path d="M4 19h16" />
        </svg>
        {isVisible && <p className="text-2xl font-bold uppercase">zayca</p>}
        {!isAdmin && (
          <div className="relative pr-6">
            <svg
              onClick={() => setIsBagOpen(true)}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth=".5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`lucide lucide-shopping-bag-icon absolute inset-0
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

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width=".5"
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
    </>
  );
};
