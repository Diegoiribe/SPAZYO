import { useState, useEffect } from 'react';
import { patch } from '../api/http';
import { coreInstance } from '../api/axiosConfig';

export const EditVariant = ({
  isEditVariantOpen,
  setIsEditVariantOpen,
  product,
  activeVariant
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [form, setForm] = useState({
    color: '#000000',
    colorName: '',
    sizes: [{ size: '', quantity: 0 }],
    photos: []
  });

  // Populate form when activeVariant is available
  useEffect(() => {
    if (!activeVariant) return;
    setForm({
      color: activeVariant.color ?? '#000000',
      colorName: activeVariant.colorName ?? '',
      sizes: Object.entries(activeVariant.sizes ?? {}).map(
        ([size, quantity]) => ({
          size,
          quantity
        })
      ),
      photos: activeVariant.photos ?? []
    });
  }, [activeVariant]);

  const handleImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    setUploadingImages(true);
    try {
      const urls = await Promise.all(
        files.map(async (file) => {
          const fd = new FormData();
          fd.append('files', file);
          const res = await coreInstance.post('/api/s3/upload', fd);
          if (Array.isArray(res.data)) return res.data[0];
          if (typeof res.data === 'string') return res.data;
          return res.data.url ?? res.data.urls?.[0] ?? res.data.fileUrl;
        })
      );
      setForm((prev) => ({ ...prev, photos: [...prev.photos, ...urls] }));
    } finally {
      setUploadingImages(false);
    }
  };

  const handleRemovePhoto = (index) => {
    setForm((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSizeChange = (index, field, value) => {
    const updated = [...form.sizes];
    updated[index][field] = value;
    setForm((prev) => ({ ...prev, sizes: updated }));
  };

  const handleAddSizeRow = () => {
    setForm((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { size: '', quantity: 0 }]
    }));
  };

  const handleSubmit = async () => {
    if (!product || !activeVariant) return;

    const payload = {
      colorName: form.colorName,
      color: form.color,
      sizes: form.sizes.reduce((acc, s) => {
        if (s.size && s.quantity > 0) acc[s.size] = s.quantity;
        return acc;
      }, {}),
      photos: form.photos
    };

    await patch(
      `/products/${product.id}/variants/${activeVariant.id}`,
      payload
    );
    setIsEditVariantOpen(false);
  };

  useEffect(() => {
    let showTimeout;
    let visibleTimeout;
    let hideTimeout;

    if (isEditVariantOpen) {
      showTimeout = setTimeout(() => setShouldRender(true), 300);
      visibleTimeout = setTimeout(() => setIsVisible(true), 310);
    } else {
      visibleTimeout = setTimeout(() => setIsVisible(false), 0);
      hideTimeout = setTimeout(() => setShouldRender(false), 600);
    }

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(visibleTimeout);
      clearTimeout(hideTimeout);
    };
  }, [isEditVariantOpen]);

  return (
    <div className="max-w-md mx-auto">
      {shouldRender && (
        <div
          className={`fixed top-15 left-0 h-full w-full bg-white z-50 duration-300 overflow-y-auto ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col gap-5 p-6 mb-30">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsEditVariantOpen(false)}
            >
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
                className="lucide lucide-arrow-left"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              <p className="text-sm font-medium uppercase">Editar Variante</p>
            </div>

            <p className="mt-2 mb-2 text-sm font-light uppercase truncate text-neutral-600">
              {product?.name}
            </p>

            {/* Add images */}
            <label className="inline-flex items-center w-full gap-1 -mt-5 text-xs font-light leading-none cursor-pointer text-neutral-500">
              <span className="text-lg leading-none">+</span>
              {uploadingImages ? 'Subiendo...' : 'Agregar imágenes'}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                disabled={uploadingImages}
                className="hidden"
              />
            </label>

            {/* Images carousel with remove button */}
            {form.photos.length > 0 && (
              <div
                className="flex gap-3 overflow-x-auto
                scrollbar-hide
                [-ms-overflow-style:none]
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden -mt-2"
              >
                {form.photos.map((url, index) => (
                  <div key={index} className="relative flex-shrink-0">
                    <img src={url} alt="preview" className="rounded-sm" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute flex items-center justify-center w-4 h-4 text-xs leading-none rounded-full top-1 right-1 bg-white/80 text-neutral-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Color picker + name */}
            <div className="flex items-center gap-2 my-5">
              <input
                type="color"
                value={form.color}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, color: e.target.value }))
                }
                className="w-4 h-4 cursor-pointer rounded-xs border-neutral-100"
              />
              <p className="-mt-0.5 text-sm font-light uppercase text-neutral-600">
                |
              </p>
              <input
                type="text"
                value={form.colorName}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, colorName: e.target.value }))
                }
                placeholder="Nombre del color"
                className="text-sm font-light outline-none text-neutral-600 placeholder:text-neutral-300"
              />
            </div>

            {/* Sizes table */}
            <div>
              <div className="overflow-hidden border rounded-md border-neutral-100">
                <div className="grid grid-cols-2 px-4 py-2 text-xs font-light uppercase bg-neutral-50 border-neutral-100 text-neutral-500">
                  <span>Talla</span>
                  <span className="text-right">Cantidad</span>
                </div>

                {form.sizes.map((row, index) => (
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
                      className="w-full outline-none origin-left text-base scale-[0.75]"
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
                      className="w-20 origin-left ml-auto text-right outline-none text-base scale-[0.75]"
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

            {/* Price (read-only) */}
            <div className="flex flex-col p-3 font-light border rounded-md bg-neutral-50 border-neutral-100">
              <label className="w-full text-xs font-light uppercase text-end text-neutral-500">
                Price
              </label>
              <input
                type="number"
                value={product?.price ?? ''}
                readOnly
                placeholder="0.00"
                className="mt-1 origin-right text-base scale-[0.75] font-light text-right bg-transparent outline-none text-neutral-700"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center gap-2 px-1 text-xs font-semibold text-blue-400 rounded-sm"
            >
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
