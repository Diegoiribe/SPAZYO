import React from 'react';
import { useEffect } from 'react';

export const NoFound = ({ isNoFound }) => {
  useEffect(() => {
    // Only run redirect when explicitly true
    if (isNoFound !== true) return;

    const timer = setTimeout(() => {
      window.location.href = '/';
    }, 3000);

    return () => clearTimeout(timer);
  }, [isNoFound]);

  return (
    <div className="max-w-md mx-auto mt-15">
      <div className="relative mt-5">
        {/* Label */}
        <div
          onClick={() => (window.location.href = 'https://spazyo.xyz')}
          className="text-xs font-light tracking-[0.35em] uppercase text-neutral-400 cursor-pointer"
        >
          spazyo
        </div>

        {/* Title + avatars */}
        <div className="relative">
          <h2 className="max-w-md mt-5 text-4xl font-light leading-tight">
            {isNoFound ? 'Esta ruta no existe' : 'Esta tienda no existe'}
          </h2>

          {/* Avatars near title */}
        </div>

        {/* Testimonial card */}
        <div className="mt-15">
          <div className="p-5 text-white bg-black shadow-lg rounded-xs">
            {isNoFound ? (
              <p className="text-sm font-light leading-relaxed ">
                Ups… esta página no existe. Serás redirigido automáticamente al
                inicio para continuar explorando la tienda.
              </p>
            ) : (
              <p className="text-sm font-light leading-relaxed ">
                Esta tienda está disponible. Regístrate{' '}
                <span
                  onClick={() => {
                    console.log('CLICK FUNCIONA');
                    window.location.href = 'https://spazyo.xyz';
                  }}
                  className="text-blue-400 underline cursor-pointer"
                >
                  click aqui
                </span>{' '}
                y empieza a vender en minutos.
              </p>
            )}

            <p className="mt-5 text-xs font-light text-neutral-300">
              Si necesitas ayuda, contáctanos a través de nuestro soporte.
            </p>
          </div>
        </div>
      </div>
      {/* Pricing */}

      <p className="w-full mb-10 text-xs font-light text-center uppercase text-neutral-500 mt-15">
        CREATE WITH SPAZYO
      </p>
    </div>
  );
};
