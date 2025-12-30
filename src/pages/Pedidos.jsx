export const Pedidos = () => {
  const data = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      <div>
        {data.map((item) => (
          <div className="p-6 first:mt-6 " key={item.id}>
            <p className="text-[10px] font-light text-neutral-500">
              N{item.id}
            </p>

            <div>
              <p className="font-semibold text-md">{item.name}</p>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <p className="text-xs font-light text-neutral-500">Pedido</p>
                  {item.pedidos.map((item) => (
                    <div className="mt-1">
                      <p className="text-sm font-light ">{item.name}</p>
                      <p className="text-[10px] font-light text-neutral-500">
                        #{item.id}
                      </p>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="mb-1 text-xs font-light text-neutral-500">
                    Direccion
                  </p>
                  <p className="text-sm font-light ">{item.address}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              {/* Fecha */}
              <p className="p-1 text-[10px] font-light rounded-sm text-neutral-500">
                14 May, 2025
              </p>
              {/* Status */}
              <p className="p-1 text-[10px] font-semibold text-blue-500 bg-blue-100 rounded-sm  ">
                Enviado
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
