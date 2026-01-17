import { useState, useEffect } from 'react';
import { post } from '../api/http';

export const CreateProduct = ({ isCreateOpen, setIsCreateOpen }) => {
  const [shouldRenderCreate, setShouldRenderCreate] = useState(false);
  const [isVisibleCreate, setIsVisibleCreate] = useState(false);
  const [formDataProduct, setFormDataProduct] = useState({
    name: '',
    images: [],
    color: '#000000',
    sizes: [{ size: '', quantity: 0 }],
    price: '',
    description: '',
    categoria: '',
    variants: []
  });

  // Helper: build product payload for backend
  const buildProductPayload = (data) => {
    return {
      name: data.name,
      description: data.description,
      category: data.categoria,
      price: Number(data.price),
      isActive: true,
      discount: 0,
      shippingCost: 150,
      variants: data.variants.map((variant) => ({
        colorName: variant.colorName || '',
        color: variant.color,
        sizes: variant.sizes.reduce((acc, s) => {
          if (s.size && s.quantity > 0) {
            acc[s.size] = s.quantity;
          }
          return acc;
        }, {}),
        photos: variant.photos.map((photo) => photo)
      }))
    };
  };
  // Handler to build and log product payload
  const handleSubmitProduct = async () => {
    const payload = buildProductPayload(formDataProduct);
    await post('/products', payload, 'core');
    console.log('PRODUCT PAYLOAD →', payload);
  };

  // Expose the helper for DevTools testing
  useEffect(() => {
    window.__SPAZYO_BUILD_PRODUCT__ = () =>
      buildProductPayload(formDataProduct);
  }, [formDataProduct]);

  const handleChange = (e) => {
    setFormDataProduct({ ...formDataProduct, [e.target.name]: e.target.value });
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormDataProduct({
      ...formDataProduct,
      images: [...formDataProduct.images, ...files]
    });
  };

  const handleColorChange = (e) => {
    setFormDataProduct({
      ...formDataProduct,
      color: e.target.value
    });
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...formDataProduct.sizes];
    updatedSizes[index][field] = value;
    setFormDataProduct({
      ...formDataProduct,
      sizes: updatedSizes
    });
  };

  const handleAddSizeRow = () => {
    setFormDataProduct({
      ...formDataProduct,
      sizes: [...formDataProduct.sizes, { size: '', quantity: 0 }]
    });
  };

  const handlePriceChange = (e) => {
    setFormDataProduct({
      ...formDataProduct,
      price: e.target.value
    });
  };

  const resetCurrentVariant = () => {
    setFormDataProduct((prev) => ({
      ...prev,
      images: [],
      color: '#000000',
      sizes: [{ size: '', quantity: 0 }]
    }));
  };

  const handleAddVariant = () => {
    setFormDataProduct((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          color: prev.color,
          colorName: '',
          sizes: prev.sizes,
          photos: prev.images
        }
      ]
    }));

    resetCurrentVariant();
  };

  useEffect(() => {
    let showTimeout;
    let visibleTimeout;
    let hideTimeout;

    if (isCreateOpen) {
      showTimeout = setTimeout(() => {
        setShouldRenderCreate(true);
      }, 300);

      visibleTimeout = setTimeout(() => {
        setIsVisibleCreate(true);
      }, 310);
    } else {
      visibleTimeout = setTimeout(() => {
        setIsVisibleCreate(false);
      }, 0);

      hideTimeout = setTimeout(() => {
        setShouldRenderCreate(false);
      }, 600);
    }

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(visibleTimeout);
      clearTimeout(hideTimeout);
    };
  }, [isCreateOpen]);

  return (
    <div className="max-w-md mx-auto">
      {shouldRenderCreate && (
        <div
          className={`fixed top-15 left-0 h-full w-full bg-white  z-50 duration-300 overflow-y-auto  ${
            isVisibleCreate ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col gap-5 p-6 mb-30">
            <div
              className="flex items-center gap-2 mb-5 cursor-pointer"
              onClick={() => setIsCreateOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                className=" lucide lucide-arrow-left-icon lucide-arrow-left"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              <p className="text-sm font-medium uppercase ">Crear Producto</p>
            </div>
            <div className="relative w-full border rounded-full placeholder:capitalize border-black/20 peer focus-within:border-blue-400">
              <input
                value={formDataProduct.name}
                onChange={handleChange}
                type="text"
                name="name"
                id="name"
                required
                className="px-4 py-3 text-base  scale-[0.875]
    origin-left  uppercase peer w-full outline-none placeholder:capitalize "
              />
              <label
                htmlFor="name"
                className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-xs text-sm peer-valid:-top-[1px] peer-valid:text-xs peer-focus:text-blue-400"
              >
                Nombre
              </label>
            </div>

            {/* Fixed add images button */}
            <label className="inline-flex items-center w-full gap-1 text-xs font-light leading-none cursor-pointer text-neutral-500">
              <span className="text-lg leading-none">+</span>
              Agregar imágenes
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                className="hidden"
              />
            </label>

            {/* Horizontal images carousel */}
            {formDataProduct.images.length > 0 && (
              <div
                className="flex gap-3 overflow-x-auto
              scrollbar-hide
              [-ms-overflow-style:none]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden -mt-2"
              >
                {formDataProduct.images.map((img, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="rounded-sm "
                  />
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 my-5">
              <input
                type="color"
                value={formDataProduct.color}
                onChange={handleColorChange}
                className="w-4 h-4 cursor-pointer rounded-xs border-neutral-100"
              />
              <p className="-mt-0.5 text-sm font-light uppercase text-neutral-600">
                |
              </p>
              <span className="text-sm font-light uppercase text-neutral-600">
                {formDataProduct.color}
              </span>
            </div>

            <div className="relative w-full border rounded-full placeholder:capitalize border-black/20 peer focus-within:border-blue-400">
              <input
                value={formDataProduct.description}
                onChange={handleChange}
                type="text"
                name="description"
                id="description"
                required
                className="px-4 py-3 text-base  scale-[0.875]
    origin-left  uppercase peer w-full outline-none placeholder:capitalize "
              />
              <label
                htmlFor="description"
                className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-xs text-sm peer-valid:-top-[1px] peer-valid:text-xs peer-focus:text-blue-400 "
              >
                Descripcion
              </label>
            </div>

            <div className="relative w-full mb-5 -mt-1 border rounded-full placeholder:capitalize border-black/20 peer focus-within:border-blue-400">
              <input
                value={formDataProduct.categoria}
                onChange={handleChange}
                type="text"
                name="categoria"
                id="categoria"
                required
                className="px-4 py-3 text-base  scale-[0.875]
    origin-left  uppercase peer w-full outline-none placeholder:capitalize "
              />
              <label
                htmlFor="categoria"
                className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-xs text-sm peer-valid:-top-[1px] peer-valid:text-xs peer-focus:text-blue-400"
              >
                Categoria
              </label>
            </div>

            <div className="">
              <div className="overflow-hidden border rounded-md border-neutral-100">
                <div className="grid grid-cols-2 px-4 py-2 text-xs font-light uppercase bg-neutral-50 border-neutral-100 text-neutral-500 ">
                  <span>Talla</span>
                  <span className="text-right">Cantidad</span>
                </div>

                {formDataProduct.sizes.map((row, index) => (
                  <div
                    key={index}
                    className="grid items-center grid-cols-2 px-4 py-3 border-t text-neutral-700 border-neutral-100"
                  >
                    <input
                      type="text"
                      value={row.size}
                      onChange={(e) =>
                        handleSizeChange(index, 'size', e.target.value)
                      }
                      placeholder="Ej: S"
                      className="w-full outline-none origin-left text-base
    scale-[0.75]"
                    />

                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={row.quantity === 0 ? '' : row.quantity}
                      onChange={(e) =>
                        handleSizeChange(
                          index,
                          'quantity',
                          e.target.value === '' ? 0 : Number(e.target.value)
                        )
                      }
                      className="w-20 origin-left ml-auto text-right outline-none text-base
    scale-[0.75]"
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddSizeRow}
                className="flex items-center gap-1 px-1 mt-3 text-xs font-light text-neutral-500"
              >
                <span className="text-lg leading-none">+</span>
                Agregar talla
              </button>
            </div>

            <div>
              <div className="flex flex-col p-3 font-light border rounded-md bg-neutral-50 border-neutral-100">
                <label className="w-full text-xs font-light uppercase text-end text-neutral-500">
                  Price
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formDataProduct.price}
                  onChange={handlePriceChange}
                  placeholder="0.00"
                  className="mt-1 origin-right text-base
    scale-[0.75]  font-light text-right bg-transparent outline-none text-neutral-700"
                />
              </div>

              <div className="flex items-center justify-between mt-5">
                <button
                  type="button"
                  onClick={handleSubmitProduct}
                  className="flex items-center gap-2 px-1 text-xs font-semibold text-blue-400 rounded-sm"
                >
                  Crear
                </button>
                <button
                  type="button"
                  onClick={handleAddVariant}
                  className="flex items-center gap-2 px-1 text-xs font-light text-neutral-500"
                >
                  Agregar variante →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
