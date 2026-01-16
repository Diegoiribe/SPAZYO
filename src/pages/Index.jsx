import React from 'react';

export const Index = () => {
  const shops = [
    {
      id: 1,
      img: 'https://i.pinimg.com/736x/7e/2d/c4/7e2dc48969476067c12a3abc218d1e68.jpg',
      brand: 'ZARA',
      bg: '#f5f5f5'
    },
    {
      id: 2,
      img: 'https://i.pinimg.com/736x/5a/4f/74/5a4f74cd46f8bf282784e07484c48205.jpg',
      brand: 'COS',
      bg: '#eeeeee'
    },
    {
      id: 3,
      img: 'https://i.pinimg.com/736x/33/99/6b/33996ba2abad45519447384ba0020912.jpg',
      brand: '',
      bg: '#ffffff'
    },
    {
      id: 4,
      img: 'https://i.pinimg.com/736x/09/62/2f/09622f568e023bdb0eecc9735c2f9e63.jpg',
      brand: 'ARKET',
      bg: '#f2f2f2'
    },
    {
      id: 5,
      img: 'https://i.pinimg.com/1200x/83/c9/c7/83c9c768c187620d0ca6361dc22db811.jpg',
      brand: 'MASSIMO DUTTI',
      bg: '#ededed'
    }
  ];

  return (
    <div className="px-6">
      {/* band */}

      {/* header */}
      <div className="flex flex-row-reverse items-center justify-between px-1 mt-3">
        <h1 className="text-2xl font-bold uppercase">Spazyo</h1>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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
        </div>
      </div>
      {/* slogan */}
      <div className="flex items-center justify-center mt-15">
        <div className="flex flex-col items-center ">
          <p className="text-4xl font-light text-center">
            The fastest way to create{' '}
            <span className="text-neutral-300">shops</span>
          </p>
          <div className="flex items-center justify-center gap-3 mt-8 text-xs font-light">
            <p className="text-center">Create your account</p>
            <p className="text-6xl font-bold rotate-180 text-neutral-300">⃔</p>
            <p className="text-center">Upload your items</p>
            <p className="text-6xl font-bold text-neutral-300">⃕ </p>
            <p className="text-center">Start to sell in all world</p>
          </div>

          <div className="flex items-center justify-between w-full py-1 pl-4 pr-1 mt-10 font-light bg-neutral-100 rounded-xs">
            <p className="text-sm ">Create your account free</p>
            <p className="px-4 py-2 text-sm text-white bg-black rounded-xs">
              Try now
            </p>
          </div>
        </div>
      </div>
      {/* shops */}
      <div
        className="flex
            gap-1
            overflow-x-auto
            scrollbar-hide
            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden mt-15"
      >
        {shops.map((shop) => (
          <img src={shop.img} className="object-cover rounded-xs" alt="" />
        ))}
      </div>
    </div>
  );
};
