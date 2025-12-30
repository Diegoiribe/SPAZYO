export const Pedidos = () => {
  const data = [
    {
      id: 14234123,
      name: 'Diego Iribe Carrazco',
      address: 'Sens 2640 montecarlo residencial, Culiacan, Sin.',
      pedidos: [
        {
          id: 1,
          name: 'Ropa deportiva'
        }
      ]
    },
    {
      id: 2432423,
      name: 'Sergio Iribe Carrazco',
      address: 'Sens 2640 montecarlo residencial, Culiacan, Sin.',
      pedidos: [
        {
          id: 1,
          name: 'Ropa deportiva'
        }
      ]
    },
    {
      id: 3234234,
      name: 'Juan Fermin Lopez',
      address: 'Sens 2640 montecarlo residencial, Culiacan, Sin.',
      pedidos: [
        {
          id: 1,
          name: 'Ropa deportiva'
        }
      ]
    }
  ];

  return (
    <div className="mt-20">
      <p className="pb-3 text-xl font-semibold">Pedidos</p>
      <p className="pb-5 text-xs font-light text-neutral-500">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum sit
        quo optio sed officia earum illo, vitae eveniet obcaecati amet dolorem
        velit, possimus dolorum harum labore tempora quas rem recusandae.
      </p>
      <div className="inline-flex items-center gap-2 p-2 border-[.75px] rounded-md border-neutral-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="text-xs lucide lucide-list-filter-icon lucide-list-filter"
        >
          <path d="M2 5h20" />
          <path d="M6 12h12" />
          <path d="M9 19h6" />
        </svg>
        <p className="text-xs font-light">Filtrar</p>
      </div>
      <div className="space-y-6">
        {data.map((item) => (
          <div
            className="p-6 rounded-md bg-neutral-50 first:mt-6"
            key={item.id}
          >
            <div className="flex justify-between">
              <div>
                <p className="font-semibold text-md">{item.name}</p>
                <p className="-mt-0.5 text-xs pl-0.5 font-light text-neutral-500">
                  #{item.id}
                </p>
              </div>
              <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-plus-icon lucide-plus"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              {/* Fecha */}
              <p className="text-xs font-light ">14 May, 2025</p>
              {/* Status */}
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <p className="text-xs font-light ">Enviado</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
