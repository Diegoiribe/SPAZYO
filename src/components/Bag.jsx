import { useState, useEffect } from 'react';

export const Bag = ({ isBagOpen, bagItems, setBagItems }) => {
  const [shouldRenderBag, setShouldRenderBag] = useState(false);
  const [isVisibleBag, setIsVisibleBag] = useState(false);

  useEffect(() => {
    let showTimeout;
    let visibleTimeout;
    let hideTimeout;

    if (isBagOpen) {
      showTimeout = setTimeout(() => {
        setShouldRenderBag(true);
      }, 300);

      visibleTimeout = setTimeout(() => {
        setIsVisibleBag(true);
      }, 310);
    } else {
      visibleTimeout = setTimeout(() => {
        setIsVisibleBag(false);
      }, 0);

      hideTimeout = setTimeout(() => {
        setShouldRenderBag(false);
      }, 600);
    }

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(visibleTimeout);
      clearTimeout(hideTimeout);
    };
  }, [isBagOpen]);

  const total = bagItems.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <>
      {shouldRenderBag && (
        <div
          className={`fixed top-0 left-0 h-full w-full bg-white z-50 duration-300 overflow-y-auto ${
            isVisibleBag ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="p-10 mt-15">
            <div className="flex items-center gap-2 mb-5">
              <p className="text-sm font-semibold uppercase">shopping bag</p>
              <p className="text-sm font-semibold uppercase">
                [{bagItems.length}]
              </p>
            </div>
            <p className="text-[11px] text-neutral-400  font-light bg-neutral-50 p-4 rounded-sm mb-5">
              The items in the bag are not reserved until the purchase is
              completed.
            </p>
            {/* ITEMS */}
            <div>
              {bagItems.map((item, index) => (
                <div
                  key={`${item.id}`}
                  className="flex justify-between gap-4 pt-2 last:mb-10"
                >
                  <img
                    src={item.img}
                    alt=""
                    className="object-contain w-39 rounded-xs"
                  />
                  <div className="flex flex-col w-1/2 gap-3 pt-4 pr-3">
                    <p className="pb-1 -mt-1 text-xs font-light uppercase text-neutral-600">
                      {item.name}
                    </p>
                    <div className="flex gap-2">
                      <p className="-mt-1 text-xs font-light uppercase text-neutral-600">
                        {item.color}
                      </p>
                      <p className="-mt-1 text-xs font-light uppercase text-neutral-600">
                        |
                      </p>
                      <p className="-mt-1 text-xs font-light uppercase text-neutral-600">
                        {item.size}
                      </p>
                    </div>
                    <div className="flex flex-col justify-between ">
                      <p className="text-xs font-light uppercase text-neutral-600">
                        ${' '}
                        {new Intl.NumberFormat('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        }).format(item.price)}
                      </p>
                      <p
                        className="mt-5 text-xs font-semibold uppercase cursor-pointer text-neutral-600"
                        onClick={() => {
                          const updatedBag = bagItems.filter(
                            (_, i) => i !== index
                          );
                          setBagItems(updatedBag);
                          localStorage.setItem(
                            'bag',
                            JSON.stringify(updatedBag)
                          );
                        }}
                      >
                        Delete
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`fixed bottom-0 left-0 p-6 right-0 z-100 bg-white
              transition-all duration-500 ease-out
              `}
          >
            <div className="flex justify-between h-full px-4 py-2 bg-white">
              <button className="flex items-center justify-center py-2 bg-black px-11 rounded-xs">
                <p className="text-xs font-light text-white uppercase">
                  continuar
                </p>
              </button>
              <div>
                <p className="pt-3 pb-0.5 text-xs font-light text-neutral-800 text-end">
                  $
                  {new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }).format(total)}
                </p>
                <p className="text-neutral-400 uppercase font-medium text-[8px]">
                  con impuestos
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
