import React from 'react';
import spazyo from '../assets/Spazyo.jpg';
// import bandera from '../assets/bandera.jpg';
import gif from '../assets/giff.gif';
import { ToggleLanding } from '../components/ToggleLanding';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Index = () => {
  const [isToggleLangingOpen, setIsToggleLangingOpen] = useState(false);

  return (
    <div className="max-w-md mx-auto">
      <div className="relative min-h-screen px-6 ">
        <div className="absolute inset-0 to-transparent"></div>

        <div className="relative z-10">
          {/* band */}
          <ToggleLanding
            isToggleLangingOpen={isToggleLangingOpen}
            setIsToggleLandingOpen={setIsToggleLangingOpen}
          />
          {/* header */}
          <div className="flex flex-row-reverse items-center justify-between px-1 mt-3 bg-transparent">
            <button
              onClick={() =>
                (window.location.href = 'https://admin.spazyo.xyz/register')
              }
              className="px-4 py-2 text-xs font-medium text-white bg-black rounded-full cursor-pointer"
            >
              Empezar
            </button>

            <div onClick={() => setIsToggleLangingOpen(true)}>
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
                class="lucide lucide-menu-icon lucide-menu cursor-pointer "
              >
                <path d="M4 5h16" />
                <path d="M4 12h16" />
                <path d="M4 19h16" />
              </svg>
            </div>
          </div>
          {/* slogan */}
          <div className="flex flex-col items-center justify-center h-screen gap-5 ">
            <div className="flex items-center gap-2 -mt-10 text-sm font-light text-neutral-600">
              <p> Disponible para creadores 🎨</p>
            </div>
            <img src={gif} className="h-36" alt="" />

            <div className="text-4xl font-medium leading-tight text-center w-72">
              <p>Tu tienda online, en minutos.</p>
            </div>
            <p className="mb-5 text-sm font-light text-center text-neutral-600">
              Crea tu tienda y empieza a vender hoy.
            </p>
            <button
              onClick={() =>
                (window.location.href = 'https://admin.spazyo.xyz/register')
              }
              className="px-12 py-4 text-xl font-medium text-white bg-black rounded-full cursor-pointer"
            >
              Empieza ahora
            </button>
            <p className="-mt-3 text-xs font-light text-center text-neutral-500">
              Gratis - 10% de comision por venta
            </p>
          </div>
        </div>
      </div>
      <div className="px-6 ">
        {/* What do we do */}
        <div className="mb-20">
          <div>
            <p className="mb-5 text-xs font-light tracking-[0.35em] uppercase text-neutral-400">
              Sin suscripcion
            </p>
            <p className="max-w-md text-4xl font-light leading-tight">
              Tu tienda siempre en linea
            </p>
          </div>
          <img src={spazyo} className="w-full mt-5 bg-center bg-cover "></img>
        </div>

        {/* Why Spazyo? */}
        <div className="relative mt-5">
          {/* Label */}
          <p className="mb-5 text-xs font-light tracking-[0.35em] uppercase text-neutral-400">
            ¿Por que Spazyo?
          </p>

          {/* Title + avatars */}
          <div className="relative">
            <h2 className="max-w-md text-4xl font-light leading-tight">
              Una forma simple de vender en línea
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
              stroke="#000000"
              strokeWidth="16"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Testimonial card */}
          <div className="mt-15">
            <div className="p-5 text-white bg-black rounded-sm shadow-lg">
              <p className="text-sm font-light leading-relaxed ">
                Spazyo nos permitió lanzar nuestra tienda sin sacrificar diseño
                ni libertad. Todo es simple, claro y sin costos ocultos.
              </p>

              <p className="mt-5 text-xs font-light text-neutral-300">
                Ana María López, Fundadora de @Mayco
              </p>
            </div>
          </div>
        </div>
        {/* Pricing */}
        <div className="mb-30 mt-30">
          <div className="">
            <p className="mb-5 text-xs font-light tracking-[0.35em] uppercase text-neutral-400">
              Precio
            </p>

            <p className="text-3xl font-light leading-tight">
              Gratis de usar —
              <span className="text-neutral-400"> combramos una </span>
              <span className="font-medium">comision del 10%</span>
              <span className="text-neutral-400"> por venta.</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center px-6 mb-30">
        <p className="max-w-md mb-5 text-4xl font-light leading-tight">
          Pruebalo ahora
        </p>
        <button className="px-12 py-4 text-xl font-medium text-white bg-black rounded-full cursor-pointer">
          Empieza ahora
        </button>
      </div>
      <p className="w-full mb-10 text-xs font-light text-center uppercase text-neutral-500">
        CREATE WITH SPAZYO
      </p>
    </div>
  );
};
