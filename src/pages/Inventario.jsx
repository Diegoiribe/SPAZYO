import { useState, useEffect } from 'react';
import { InventaryTemplate } from '../components/InventaryTemplate';
import { get } from '../api/http';
import { CreateProduct } from '../components/CreateProduct';

export const Inventario = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [productsInventary, setProductsInventary] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get('/products', null, 'tenant');
        console.log('Data fetched:', data);
        setProductsInventary(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const [productState, setProductState] = useState({
    isOpen: false,
    productId: null
  });

  const openOrder = (id) => {
    setProductState({
      isOpen: true,
      productId: id
    });
  };

  const categories = [
    'ALL',
    ...new Set(productsInventary.map((p) => p.category).filter(Boolean))
  ];

  const getTotalStockByProduct = (product) => {
    return (
      product?.variants?.reduce((total, variant) => {
        const variantStock = Object.values(variant?.sizes ?? {}).reduce(
          (sum, qty) => sum + qty,
          0
        );
        return total + variantStock;
      }, 0) ?? 0
    );
  };

  return (
    <div className="">
      <CreateProduct
        isCreateOpen={isCreateOpen}
        setIsCreateOpen={setIsCreateOpen}
      />
      {!productState.isOpen ? (
        <>
          <p className="pb-5 text-2xl font-semibold uppercase">Inventario</p>
          <div className="flex justify-between">
            <div className="relative inline-flex items-center ">
              <div className="inline-flex items-center gap-2 p-2 border rounded-md cursor-pointer bg-neutral-50 border-neutral-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-archive-icon lucide-archive text-neutral-500"
                >
                  <rect width="20" height="5" x="2" y="3" rx="1" />
                  <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
                  <path d="M10 12h4" />
                </svg>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="text-xs font-light uppercase bg-transparent outline-none appearance-none cursor-pointer text-neutral-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-down-icon lucide-chevron-down text-neutral-500"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
            <div
              className="inline-flex items-center gap-2 p-2 ml-2 border rounded-md cursor-pointer bg-neutral-50 border-neutral-100"
              onClick={() => setIsCreateOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-plus-icon lucide-plus text-neutral-500"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </div>
          </div>
          <div className="mt-5 border rounded-md border-neutral-100">
            <div className="grid grid-cols-[40px_1fr_80px_10px] gap-4 px-3 py-3 text-xs font-light bg-neutral-50 border-b border-neutral-100 rounded-t-md text-neutral-500 uppercase">
              <p>Items</p>
              <p>Name</p>
              <p>Colors</p>
            </div>
            {productsInventary
              .filter(
                (product) =>
                  selectedCategory === 'ALL' ||
                  product.category === selectedCategory
              )
              .map((product) => (
                <div
                  onClick={() => openOrder(product.id)}
                  key={product.id}
                  className={`grid items-center grid-cols-[40px_1fr_80px_10px] gap-4 px-3 py-3 text-xs  border-b border-neutral-100  cursor-pointer ${
                    getTotalStockByProduct(product) < 5
                      ? ' text-amber-400 font-medium'
                      : 'text-black font-light'
                  }`}
                >
                  <p className="">{getTotalStockByProduct(product)}</p>
                  <p className="uppercase truncate">{product.name}</p>

                  <div className="flex items-center gap-1 py-2">
                    {product.variants.slice(0, 3).map((variant) => (
                      <div
                        key={variant.id}
                        className="w-3 h-3 border border-neutral-200"
                        style={{
                          backgroundColor: variant.color
                        }}
                      />
                    ))}

                    {product.variants.length > 3 && (
                      <div className="flex items-center justify-center text-xs font-light">
                        +{product.variants.length - 3}
                      </div>
                    )}
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-move-up-right-icon lucide-move-up-right"
                  >
                    <path d="M13 5H19V11" />
                    <path d="M19 5L5 19" />
                  </svg>
                </div>
              ))}
          </div>
        </>
      ) : (
        <InventaryTemplate
          setProductState={setProductState}
          productState={productState}
        />
      )}
    </div>
  );
};
