import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Toggle = ({ setIsToggleOpen, isToggleOpen, isAdmin = false }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isToggleOpen) {
      setTimeout(() => setShouldRender(true), 300); // Delay de 300ms antes de mostrar
      setTimeout(() => setIsVisible(true), 310); // Aplica la opacidad después del render
    } else {
      setIsVisible(false); // Opacidad 0 inmediatamente
      setTimeout(() => setShouldRender(false), 600); // Oculta después de 300ms
    }
  }, [isToggleOpen]);

  return (
    <>
      {shouldRender && (
        <div
          className={`fixed top-0 left-0 h-full w-full bg-white/80 backdrop-blur-xl transition-opacity z-100 duration-300 overflow-y-auto ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Botón de cerrar */}
          <div className="flex items-center gap-5 p-10">
            <Link
              to={'/'}
              className="overflow-hidden text-4xl font-bold text-black uppercase"
              onClick={() => setIsToggleOpen(false)}
            >
              ZAyca
            </Link>
            <div className="flex items-center justify-end p-4">
              <button
                onClick={() => setIsToggleOpen(false)}
                className="text-black cursor-pointer"
              >
                <svg
                  width="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.35719 3H14.6428C15.7266 2.99999 16.6007 2.99998 17.3086 3.05782C18.0375 3.11737 18.6777 3.24318 19.27 3.54497C20.2108 4.02433 20.9757 4.78924 21.455 5.73005C21.7568 6.32234 21.8826 6.96253 21.9422 7.69138C22 8.39925 22 9.27339 22 10.3572V13.6428C22 14.7266 22 15.6008 21.9422 16.3086C21.8826 17.0375 21.7568 17.6777 21.455 18.27C20.9757 19.2108 20.2108 19.9757 19.27 20.455C18.6777 20.7568 18.0375 20.8826 17.3086 20.9422C16.6008 21 15.7266 21 14.6428 21H9.35717C8.27339 21 7.39925 21 6.69138 20.9422C5.96253 20.8826 5.32234 20.7568 4.73005 20.455C3.78924 19.9757 3.02433 19.2108 2.54497 18.27C2.24318 17.6777 2.11737 17.0375 2.05782 16.3086C1.99998 15.6007 1.99999 14.7266 2 13.6428V10.3572C1.99999 9.27341 1.99998 8.39926 2.05782 7.69138C2.11737 6.96253 2.24318 6.32234 2.54497 5.73005C3.02433 4.78924 3.78924 4.02433 4.73005 3.54497C5.32234 3.24318 5.96253 3.11737 6.69138 3.05782C7.39926 2.99998 8.27341 2.99999 9.35719 3ZM6.85424 5.05118C6.24907 5.10062 5.90138 5.19279 5.63803 5.32698C5.07354 5.6146 4.6146 6.07354 4.32698 6.63803C4.19279 6.90138 4.10062 7.24907 4.05118 7.85424C4.00078 8.47108 4 9.26339 4 10.4V13.6C4 14.7366 4.00078 15.5289 4.05118 16.1458C4.10062 16.7509 4.19279 17.0986 4.32698 17.362C4.6146 17.9265 5.07354 18.3854 5.63803 18.673C5.90138 18.8072 6.24907 18.8994 6.85424 18.9488C7.47108 18.9992 8.26339 19 9.4 19H14.6C15.7366 19 16.5289 18.9992 17.1458 18.9488C17.7509 18.8994 18.0986 18.8072 18.362 18.673C18.9265 18.3854 19.3854 17.9265 19.673 17.362C19.8072 17.0986 19.8994 16.7509 19.9488 16.1458C19.9992 15.5289 20 14.7366 20 13.6V10.4C20 9.26339 19.9992 8.47108 19.9488 7.85424C19.8994 7.24907 19.8072 6.90138 19.673 6.63803C19.3854 6.07354 18.9265 5.6146 18.362 5.32698C18.0986 5.19279 17.7509 5.10062 17.1458 5.05118C16.5289 5.00078 15.7366 5 14.6 5H9.4C8.26339 5 7.47108 5.00078 6.85424 5.05118ZM7 7C7.55229 7 8 7.44772 8 8V16C8 16.5523 7.55229 17 7 17C6.44772 17 6 16.5523 6 16V8C6 7.44772 6.44772 7 7 7Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Contenido de la sidebar */}
          {!isAdmin ? (
            <div className="flex flex-col gap-3 p-10 mt-24 ">
              <p className="text-xs uppercase text-neutral-500">Switch to</p>
              <Link
                to="/"
                className="text-xs font-semibold text-black uppercase cursor-pointer"
                onClick={() => setIsToggleOpen(false)}
              >
                view all
              </Link>
              <Link
                to="/newdrop"
                className="text-xs font-semibold text-[#ff2222] uppercase cursor-pointer"
                onClick={() => setIsToggleOpen(false)}
              >
                new drop
              </Link>
              <Link
                to="/pedido"
                className="text-xs font-semibold text-black uppercase cursor-pointer"
                onClick={() => setIsToggleOpen(false)}
              >
                Rastrear pedido
              </Link>
            </div>
          ) : (
            /* Si esta logeado admin */

            <div className="flex flex-col gap-3 p-10 mt-24 ">
              <p className="text-xs uppercase text-neutral-500">Dashboard</p>

              <p
                className="text-sm text-black uppercase cursor-pointer"
                onClick={() => setIsToggleOpen(false)}
              ></p>
              <p
                className="text-sm text-black uppercase cursor-pointer"
                onClick={() => setIsToggleOpen(false)}
              >
                Inventario
              </p>

              <p
                className="text-sm text-black uppercase cursor-pointer"
                onClick={() => setIsToggleOpen(false)}
              >
                Pedidos
              </p>
              <p
                className="text-sm text-black uppercase cursor-pointer"
                onClick={() => setIsToggleOpen(false)}
              ></p>
            </div>
          )}
        </div>
      )}
    </>
  );
};
