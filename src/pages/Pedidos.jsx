
export const Pedidos = () => {

    const data = [
        {
            id: 1,
            nombre: "Diego Iribe Carrazco",
            address: "Sens 2640 montecarlo residencial, Culiacan, Sin.",
            pedidos: [
                {
                    id: 1,
                    name: "Ropa deportiva"
                }
            ]
        },
        {
            id: 2,
            nombre: "Sergio Iribe Carrazco",
            address: "Sens 2640 montecarlo residencial, Culiacan, Sin.",
            pedidos: [
                {
                    id: 1,
                    name: "Ropa deportiva"
                }
            ]
        },
        {
            id: 3,
            nombre: "Juan Fermin Lopez",
            address: "Sens 2640 montecarlo residencial, Culiacan, Sin.",
            pedidos: [
                {
                    id: 1,
                    name: "Ropa deportiva"
                }
            ]
        },
    ]

    return (
        <div>
            <p className="text-xl font-semibold pb-3">Pedidos</p>
            <p className="text-xs font-light text-neutral-500 pb-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum sit quo optio sed officia earum illo, vitae eveniet obcaecati amet dolorem velit, possimus dolorum harum labore tempora quas rem recusandae.</p>
            <div className=" inline-flex gap-2 items-center border border-neutral-200 p-2 rounded-md ">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-list-filter-icon lucide-list-filter text-xs"><path d="M2 5h20" /><path d="M6 12h12" /><path d="M9 19h6" /></svg>
                <p className="text-xs font-light">Filtrar</p>
            </div>
            <div>
                {data.map((item) => {
                    <div className="flex p-6 border-t border-neutral-200" key={item.id}>
                        <div><p>{item.id}</p></div>
                        <div>
                            <p>{item.name}</p>
                            <div>
                                <div><p>Pedido</p>
                                    {item.pedidos.map((item) => {
                                        <p>{item.name}</p>
                                    })}
                                </div>
                                <div><p>Direccion</p><p>{item.address}</p></div>
                            </div>
                        </div>
                    </div>
                })}</div>
        </div>
    )
}
