
import React from 'react';
import { data } from '../data/db'
import { Link } from 'react-router-dom'


export const CatalogTemplate = () => {

  return (
    <div className="grid grid-cols-2 gap-6">
      {data.map((item) => (
        <Link to={`/product/${item.id}`} className='cursor-pointer' key={item.id}>
          <img src={item.img} alt="" className="rounded-sm " />
          <div className="flex items-center gap-4 pt-2 pl-2">
            <p className="text-[12px] font-light truncate text-neutral-800">
              {item.name}
            </p>
            <div className="flex items-center gap-1">
              <div className="w-[11px] h-[11px] bg-blue-200 border border-neutral-200 rounded-xs"></div>{' '}
              <p className="text-[12px] font-light uppercase text-neutral-800">
                +{item.colors.length - 1}
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
  );
};
