import React from 'react';

export const Index = () => {
  const shops = [
    {
      id: 1,
      img: 'https://static.zara.net/assets/public/1187/230a/5f27436ea875/e83bcaddee9d/04416226800-a1/04416226800-a1.jpg?ts=1768389751475&w=468',
      brand: 'ZARA',
      bg: '#f5f5f5'
    },
    {
      id: 2,
      img: 'https://static.zara.net/assets/public/3662/1d46/d2d54917a44f/9c0eb418e1fe/08281289800-a1/08281289800-a1.jpg?ts=1762331489955&w=468',
      brand: 'COS',
      bg: '#eeeeee'
    },
    {
      id: 3,
      img: '',
      brand: '',
      bg: '#ffffff'
    },
    {
      id: 4,
      img: 'https://static.zara.net/assets/public/85c0/8ccd/04eb4d1b99d2/65394270aaaa/06987403711-a1/06987403711-a1.jpg?ts=1768232413375&w=468',
      brand: 'ARKET',
      bg: '#f2f2f2'
    },
    {
      id: 5,
      img: 'https://static.zara.net/assets/public/8bcc/067a/275742e7b3dd/7ef8dd2f8c65/00155752800-a5/00155752800-a5.jpg?ts=1764325397594&w=468',
      brand: 'MASSIMO DUTTI',
      bg: '#ededed'
    },
    {
      id: 6,
      img: '',
      brand: '',
      bg: '#ffffff'
    },
    {
      id: 7,
      img: 'https://static.zara.net/assets/public/85c0/8ccd/04eb4d1b99d2/65394270aaaa/06987403711-a1/06987403711-a1.jpg?ts=1768232413375&w=468',
      brand: 'ARKET',
      bg: '#f2f2f2'
    },
    {
      id: 8,
      img: 'https://static.zara.net/assets/public/8bcc/067a/275742e7b3dd/7ef8dd2f8c65/00155752800-a5/00155752800-a5.jpg?ts=1764325397594&w=468',
      brand: 'MASSIMO DUTTI',
      bg: '#ededed'
    },
    {
      id: 9,
      img: 'https://static.zara.net/assets/public/85c0/8ccd/04eb4d1b99d2/65394270aaaa/06987403711-a1/06987403711-a1.jpg?ts=1768232413375&w=468',
      brand: 'ARKET',
      bg: '#f2f2f2'
    },
    {
      id: 10,
      img: 'https://static.zara.net/assets/public/8bcc/067a/275742e7b3dd/7ef8dd2f8c65/00155752800-a5/00155752800-a5.jpg?ts=1764325397594&w=468',
      brand: 'MASSIMO DUTTI',
      bg: '#ededed'
    },

    {
      id: 11,
      img: 'https://static.zara.net/assets/public/85c0/8ccd/04eb4d1b99d2/65394270aaaa/06987403711-a1/06987403711-a1.jpg?ts=1768232413375&w=468',
      brand: 'ARKET',
      bg: '#f2f2f2'
    },
    {
      id: 12,
      img: '',
      brand: '',
      bg: '#ffffff'
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
      <div className="grid grid-cols-4 gap-2 mt-10">
        {shops.map((shop) => (
          <div
            key={shop.id}
            className="relative overflow-hidden rounded-xs aspect-[3/5]"
            style={{ backgroundColor: shop.bg }}
          >
            <img
              src={shop.img}
              alt={shop.brand}
              className="absolute inset-0 object-cover w-full h-full"
            />

            {/* Overlay */}
            <div className="absolute inset-0 flex items-center justify-center ">
              <span className="text-sm font-semibold tracking-widest text-white uppercase">
                {shop.brand}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
