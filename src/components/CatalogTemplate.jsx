import React from 'react';
import { Link } from 'react-router-dom';
import { get } from '../api/http';
import { useState, useEffect } from 'react';

export const CatalogTemplate = ({ subdomain }) => {
  const [productsCatalog, setProductsCatalog] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('VIEW ALL');
  const [isGrid, setIsGrid] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get(`/public/products/${subdomain}`);
        console.log('Data fetched:', data);
        setProductsCatalog(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  console.log('productsCatalog:', productsCatalog);

  const categories = [
    'VIEW ALL',
    ...new Set(productsCatalog.map((p) => p.category).filter(Boolean))
  ];

  const filteredProducts = productsCatalog.filter(
    (item) =>
      selectedCategory === 'VIEW ALL' || item.category === selectedCategory
  );

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex justify-between px-6 mt-2 mb-3">
        <div className="relative inline-flex items-center gap-2 cursor-pointer ">
          <span className="text-xs font-medium uppercase ">
            {selectedCategory}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4 ml-1 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentIndex(0);
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div
          onClick={() => setIsGrid((prev) => !prev)}
          className="cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${
              isGrid ? 'text-black' : 'text-neutral-500'
            } lucide lucide-layout-grid-icon lucide-layout-grid`}
          >
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
          </svg>
        </div>
      </div>
      {!isGrid ? (
        <div
          className="flex mt-2"
          style={{
            transform: `translateX(calc(-${
              currentIndex * 100
            }% + ${currentTranslate}px))`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
          }}
          onTouchStart={(e) => {
            setStartX(e.touches[0].clientX);
            setIsDragging(true);
            setShowHint(false);
          }}
          onTouchMove={(e) => {
            const currentX = e.touches[0].clientX;
            const diff = currentX - startX;
            setCurrentTranslate(diff * 0.6);
          }}
          onTouchEnd={(e) => {
            const threshold = 50;
            if (
              currentTranslate < -threshold &&
              currentIndex < filteredProducts.length - 1
            ) {
              setCurrentIndex((prev) => prev + 1);
            } else if (currentTranslate > threshold && currentIndex > 0) {
              setCurrentIndex((prev) => prev - 1);
            }
            setCurrentTranslate(0);
            setIsDragging(false);
          }}
        >
          {filteredProducts.map((item) => (
            <Link
              to={`/product/${item.id}/${item.variants[0].id}`}
              className="flex-shrink-0 w-full px-6 cursor-pointer"
              key={item.id}
            >
              <div className="flex flex-col items-start w-full gap-2 mt-2">
                <img
                  src={item.variants[0].photos[0]}
                  alt=""
                  className="object-cover w-full h-[65vh] rounded-xs"
                />
                <div className="w-full">
                  <div className="flex items-center justify-between w-full gap-5 px-2 mt-2 ">
                    <p className="font-light truncate w-fulltext-sm text-neutral-800">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-1">
                      <div
                        className="w-2.75 h-2.75 border border-neutral-100 "
                        style={{
                          backgroundColor: item.variants[0].color
                        }}
                      />
                      <p className="text-xs font-light text-black uppercase ">
                        +{item.variants.length}
                      </p>
                    </div>
                  </div>
                  <p className="px-2 mt-2 text-xs uppercase text-neutral-500 ">
                    ${' '}
                    {new Intl.NumberFormat('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }).format(item.price)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 px-6 mt-6 gap-x-6 gap-y-2">
          {filteredProducts.map((item) => (
            <Link
              to={`/product/${item.id}/${item.variants[0].id}`}
              className="cursor-pointer"
              key={item.id}
            >
              <img
                src={item.variants[0].photos[0]}
                alt=""
                className="object-contain rounded-xs h-58"
              />
              <div className="flex items-center gap-4 pt-2 pl-2">
                <p className="text-[12px] uppercase font-light truncate text-neutral-800">
                  {item.name}
                </p>
                <div className="flex items-center gap-1">
                  <div
                    className="w-2.75 h-2.75 border border-neutral-100 "
                    style={{
                      backgroundColor: item.variants[0].color
                    }}
                  />
                  <p className="text-[12px] font-light uppercase text-neutral-800">
                    +{item.variants.length}
                  </p>
                </div>
              </div>
              <p className="text-[12px] font-light uppercase text-neutral-800 pb-6 pl-2">
                ${' '}
                {new Intl.NumberFormat('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(item.price)}
              </p>
            </Link>
          ))}
        </div>
      )}
      {!isGrid && showHint && (
        <div className="absolute z-10 -translate-y-1/2 right-4 top-1/2">
          <div className="flex items-center justify-center w-10 h-10 bg-black rounded-full animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white lucide lucide-arrow-right-icon lucide-arrow-right"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
