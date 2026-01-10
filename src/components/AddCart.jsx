import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { get } from '../api/http';

export const AddCart = () => {
  const { id, idColor } = useParams();
  const navigate = useNavigate();
  const [productAdd, setProductAdd] = useState([]);
  const [showSizes, setShowSizes] = useState(false);

  const containerRef = useRef(null);
  const product = productAdd.find((p) => p.id === Number(id));
  const activeVariant = product?.variants.find((v) => v.id === Number(idColor));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get('/products');
        console.log('Data fetched:', data);
        setProductAdd(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showSizes &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowSizes(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSizes]);

  if (!product) return null;

  return (
    <div ref={containerRef} className="py-2 bg-white">
      {!showSizes && (
        <>
          <div className="flex items-center justify-between">
            <div>
              <p className="pb-1 text-xs font-light uppercase text-neutral-800">
                new
              </p>
              <p className="text-xs font-light uppercase truncate text-neutral-800 w-54">
                {product.name}
              </p>
            </div>

            <div className="flex gap-2 py-2">
              {product.variants.map((variant) => {
                const isActive = Number(idColor) === variant.id;

                return (
                  <div
                    key={variant.id}
                    onClick={() => navigate(`/product/${id}/${variant.id}`)}
                    className={`
                      relative w-4 h-4 cursor-pointer border overflow-hidden
                      ${
                        isActive
                          ? 'scale-100 border-neutral-500'
                          : 'border-neutral-100'
                      }
                      transition
                    `}
                  >
                    {/* Color base */}
                    <div
                      className="absolute inset-0"
                      style={{ backgroundColor: variant.color }}
                    />

                    {/* Black opacity filter */}
                    <div
                      className={`
                        absolute inset-0 bg-black
                        ${isActive ? 'opacity-5' : 'opacity-5'}
                        transition-opacity
                      `}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <p className="pt-3 text-xs font-light text-neutral-800">
            $
            {new Intl.NumberFormat('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(product.price)}
          </p>
        </>
      )}

      {!showSizes && (
        <button
          className="flex items-center justify-center w-full py-2 mt-6 border-[.8px] rounded-xs"
          onClick={() => setShowSizes(true)}
        >
          <p className="text-xs font-light uppercase text-neutral-800">add</p>
        </button>
      )}
      {showSizes && activeVariant?.sizes && (
        <div className="">
          <p className="mb-5 text-xs font-light uppercase truncate text-neutral-800">
            Selecciona la talla
          </p>
          {Object.entries(activeVariant.sizes).map(([size]) => (
            <div
              key={size}
              onClick={() => {
                const bag = JSON.parse(localStorage.getItem('bag')) || [];

                const newItem = {
                  id: `${product.id}-${activeVariant.id}-${size}`,
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  img: activeVariant.photos?.[0],
                  color: activeVariant.color,
                  size
                };

                const updatedBag = [...bag, newItem];
                localStorage.setItem('bag', JSON.stringify(updatedBag));
                setShowSizes(false);
              }}
              className="flex items-center justify-center w-full py-3 transition cursor-pointer rounded-xs hover:bg-black hover:text-white"
            >
              <p className="text-xs font-light uppercase">{size}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
