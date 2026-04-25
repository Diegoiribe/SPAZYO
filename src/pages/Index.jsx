import React from 'react';
import spazyo from '../assets/sapzyo.jpg';
import gif from '../assets/giff.gif';
import { ToggleLanding } from '../components/ToggleLanding';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export const Index = () => {
  const [isToggleLangingOpen, setIsToggleLangingOpen] = useState(false);

  const cards = [
    {
      img: spazyo,
      title: 'Tu tienda online',
      description: 'Tus productos, tu marca, en un solo lugar.'
    },
    {
      img: spazyo,
      title: 'Siempre activo',
      description: 'Atiende a tus clientes, incluso cuando no estás.'
    },
    {
      img: spazyo,
      title: 'Todo en un panel',
      description: 'Tienda, mensajes y ventas, juntos.'
    }
  ];
  const carouselRef = useRef(null);
  const scrollCarousel = (dir) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

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
            <div className="flex items-center gap-2 -mt-10 mb-5 text-xs text-center font-light tracking-[0.35em] uppercase text-neutral-400">
              <p> para creadores</p>
            </div>
            <img src={gif} className="h-36" alt="" />

            <div className="w-64 text-4xl font-medium leading-tight text-center">
              <p>Tu empleado pero mejor.</p>
            </div>
            <p className="mb-5 text-sm font-light text-center w-72 text-neutral-400">
              Es como tener un empleado pero sin descanso y sin complicaciones.
            </p>
            <button
              onClick={() =>
                (window.location.href = 'https://admin.spazyo.xyz/register')
              }
              className="px-12 py-4 text-xl font-medium text-white bg-black rounded-full cursor-pointer"
            >
              Empieza ahora
            </button>
            <p className="-mt-3 text-xs font-light text-center text-neutral-400">
              Paga solo por lo que usas
            </p>
          </div>
        </div>
      </div>
      <div className="">
        {/* What do we do */}
        <div className="mb-40">
          <div>
            <div className="flex justify-end gap-2 pr-6 mb-6">
              <button
                onClick={() => scrollCarousel(-1)}
                className="text-xl font-medium text-black rounded-full "
              >
                ←
              </button>
              <button
                onClick={() => scrollCarousel(1)}
                className="text-xl font-medium rounded-full "
              >
                →
              </button>
            </div>

            {/* carousel */}
            <div
              ref={carouselRef}
              className="flex gap-12 overflow-x-auto scroll-smooth
                [-ms-overflow-style:none]
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden pl-16 pr-6"
            >
              {cards.map((card, i) => (
                <div key={i} className="flex-shrink-0 ">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="object-cover mb-3 rounded-sm w-68 bg-neutral-100 "
                  />
                  <div className="pl-2 mt-8 w-46">
                    <p className="font-medium leading-tight">{card.title}</p>
                    <p className="mt-1 text-sm font-light text-neutral-400">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 mb-40">
        <h1 className="text-4xl font-medium leading-tight text-center">
          Miralo en accion
        </h1>
        <p className="my-5 text-sm font-light text-neutral-400">
          Trabaja por ti todo el día, todos los días, sin pausas y sin depender
          de nadie, para que cada mensaje tenga una respuesta y cada
          conversación una oportunidad de venta.
        </p>
        <div className="w-full h-64 mt-10 bg-neutral-100 rounded-2xl"></div>
      </div>

      <div className="flex flex-col items-center justify-center px-6 mb-30">
        <p className="mb-5 text-4xl font-medium leading-tight text-center">
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
