import React from 'react';
import mosaico from '../assets/mosaico.svg';

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
      colStart: 5,
      rowStart: 2,
      colSpan: 1,
      rowSpan: 1,
      letter: 'P'
    },
    {
      id: 3,
      colStart: 6,
      rowStart: 4,
      colSpan: 1,
      rowSpan: 1,
      letter: 'A'
    },
    {
      id: 4,
      colStart: 1,
      rowStart: 3,
      colSpan: 1,
      rowSpan: 1,
      letter: 'Z'
    },
    {
      id: 5,
      colStart: 3,
      rowStart: 5,
      colSpan: 1,
      rowSpan: 1,
      letter: 'Y'
    },
    {
      id: 6,
      colStart: 5,
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
            <span className="text-purple-300">shops</span>
          </p>
          <div className="flex items-center justify-center gap-3 mt-8 text-xs font-light">
            <p className="text-center">Create your account</p>
            <p className="text-6xl font-bold text-purple-300 rotate-180">⃔</p>
            <p className="text-center">Upload your items</p>
            <p className="text-6xl font-bold text-purple-300">⃕ </p>
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
                <p className="text-4xl font-black text-purple-300">
                  {item.letter}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What do we do */}
      <div className="mt-20">
        <p className="mb-5 text-xs font-light tracking-[0.3em]  uppercase text-neutral-400">
          What do we do?
        </p>

        <div className="flex items-stretch gap-3 pl-2">
          <div className="w-[2px] bg-black"></div>

          <p className="text-sm font-light leading-relaxed">
            Creamos una forma simple de vender en línea. Diseña tu tienda, sube
            tus productos y empieza a vender sin costos iniciales.{' '}
            <span className="font-medium text-purple-300">SPAZYO</span> es
            gratis de usar: solo cobramos una comisión cuando realizas una
            venta.
          </p>
        </div>
      </div>
      {/* How it works */}
      <div className="p-5 mt-20 bg-neutral-100 rounded-xs">
        <p className="text-xs mb-10 font-light tracking-[0.3em]  uppercase">
          How ir works
        </p>
        <div className="flex items-stretch gap-3 pl-2">
          <div className="w-[2px] bg-black"></div>

          <p className="text-sm font-light leading-relaxed">
            Crea tu cuenta, configura tu tienda y sube tus productos. SPAZYO se
            encarga de la infraestructura, los pagos y la gestión de pedidos
            para que tú solo te enfoques en vender.
          </p>
        </div>
        <img
          className="mt-10 rounded-xs"
          src="https://media.gq.com.mx/photos/635810d9b430aa98c0db89df/16:9/w_2560%2Cc_limit/zara-pre-owned-que-es-como-funciona-cuando-llega-a-mexico.jpg"
          alt=""
        />
      </div>
      {/* Why Spazyo? */}
      <div className="relative mt-20">
        {/* Label */}
        <p className="mb-5 text-xs font-light tracking-[0.35em] uppercase text-neutral-400">
          Why Spazyo?
        </p>

        {/* Title + avatars */}
        <div className="relative">
          <h2 className="max-w-md text-4xl font-light leading-tight">
            Built for creators who care about design
          </h2>

          {/* Avatars near title */}
        </div>

        {/* Soft wave */}
        <svg
          viewBox="0 0 1000 120"
          className="w-full h-10 mt-15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 60 C 200 20, 400 100, 600 60 S 1000 60, 1000 60"
            stroke="#D8B4FE"
            strokeWidth="16"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Testimonial card */}
        <div className="mt-15">
          <div className="p-5 text-white bg-black shadow-lg rounded-xs">
            <p className="text-sm font-light leading-relaxed ">
              Spazyo nos permitió lanzar nuestra tienda sin sacrificar diseño ni
              libertad. Todo es simple, claro y sin costos ocultos.
            </p>

            <p className="mt-5 text-xs font-light text-neutral-300">
              Ana María López, Fundadora de @Mayco
            </p>
          </div>
        </div>
      </div>
      {/* Pricing */}
      <div className="mt-20 mb-40">
        <div className="">
          <p className="mb-5 text-xs font-light tracking-[0.35em] uppercase text-neutral-400">
            Pricing
          </p>

          <p className="text-4xl font-light leading-tight">
            Free to use —
            <span className="text-purple-300"> we only charge a </span>
            <span className="font-medium">10% commission</span>
            <span className="text-purple-300"> per sale.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
