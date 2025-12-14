import React from 'react';

export const AddCart = () => {
  return (
    <div className="py-2 bg-white ">
      {/* Etiqueta */}
      <p className="pb-1 text-xs font-light uppercase text-neutral-800">new</p>
      <p className="text-xs font-light uppercase text-neutral-800">
        SUETER CASHMERE RAYAS
      </p>
      <p className="pt-2 text-xs font-light text-neutral-800">
        {' '}
        ${' '}
        {new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(2999)}
      </p>
      <button className="flex items-center justify-center w-full py-2 mt-6  border-[.8px] rounded-xs">
        <p className="text-xs font-light uppercase text-neutral-800">add</p>
      </button>
    </div>
  );
};
