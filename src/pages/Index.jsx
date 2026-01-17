import React from 'react';
import mosaico from '../assets/mosaico.svg';
import cos from '../assets/cos.jpg';
import chanel from '../assets/chanel.jpg';

export const Index = () => {
  const mosaicOverlays = [
    {
      id: 1,
      colStart: 2,
      rowStart: 1,
      colSpan: 1,
      rowSpan: 1,
      letter: 'S'
    },
    {
      id: 2,
      colStart: 4,
      rowStart: 2,
      colSpan: 1,
      rowSpan: 1,
      letter: 'P'
    },
    {
      id: 3,
      colStart: 6,
      rowStart: 3,
      colSpan: 1,
      rowSpan: 1,
      letter: 'A'
    },
    {
      id: 4,
      colStart: 3,
      rowStart: 4,
      colSpan: 1,
      rowSpan: 1,
      letter: 'Z'
    },
    {
      id: 5,
      colStart: 5,
      rowStart: 5,
      colSpan: 1,
      rowSpan: 1,
      letter: 'Y'
    },
    {
      id: 6,
      colStart: 1,
      rowStart: 6,
      colSpan: 1,
      rowSpan: 1,
      letter: 'O'
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
          <p className="text-4xl font-light text-center w-72">
            The fastest way to create{' '}
            <span className="text-rose-400">shops</span>
          </p>
          <div className="flex items-center justify-center gap-3 mt-8 text-xs font-light">
            <p className="text-center">Create your account</p>
            <p className="text-6xl font-bold rotate-180 text-rose-400">⃔</p>
            <p className="text-center">Upload your items</p>
            <p className="text-6xl font-bold text-rose-400">⃕ </p>
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
      <div className="relative mb-5 mt-15">
        {/* Mosaic container */}
        <div
          className="relative w-full h-[420px] rounded-xs overflow-hidden"
          style={{
            backgroundImage: `url(${mosaico})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
            {/* Grid lines */}
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={`cell-${i}`} className="border-2 border-white " />
            ))}

            {/* Mosaic overlays */}
            {mosaicOverlays.map((item) => (
              <div
                key={item.id}
                className="relative z-10 flex items-center justify-center bg-white"
                style={{
                  gridColumn: `${item.colStart} / span ${item.colSpan}`,
                  gridRow: `${item.rowStart} / span ${item.rowSpan}`,
                  backgroundColor: item.bg
                }}
              >
                <p className="text-4xl font-black text-rose-400">
                  {item.letter}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
