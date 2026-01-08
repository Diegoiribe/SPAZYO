import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { get } from '../api/http';

export const AddCart = () => {
  const { id, idColor } = useParams();
  const navigate = useNavigate();
  const [productAdd, setProductAdd] = useState([]);
  const product = productAdd.find((p) => p.id === Number(id));

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

  if (!product) return null;

  const colorMap = {
    black: '#1f1f1f',
    white: '#f2f2f2',
    gray: '#9ca3af',
    red: '#7a0c1d',
    blue: '#4a6a8a',
    green: '#5f7f5b',
    brown: '#6b4f3a',
    yellow: '#c9b458',
    beige: '#d6c7a1',
    orange: '#d16a2c',
    'Total Orange': '#d16a2c',
    'Green Apple': '#5f7f5b',
    'All-Star': '#000000'
  };

  console.log('product', product);

  return (
    <div className="py-2 bg-white">
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
                  w-3.5 h-3.5 rounded-xs  cursor-pointer border border-neutral-200
                  ${isActive ? ' scale-100 ' : ''}
                  transition
                `}
                style={{
                  backgroundColor: colorMap[variant.color]
                }}
              />
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

      <button className="flex items-center justify-center w-full py-2 mt-6 border-[.8px] rounded-xs">
        <p className="text-xs font-light uppercase text-neutral-800">add</p>
      </button>
    </div>
  );
};
