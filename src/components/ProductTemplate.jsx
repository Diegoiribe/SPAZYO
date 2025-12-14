import React from 'react';

export const ProductTemplate = () => {
  const data = [
    {
      img: 'https://static.zara.net/assets/public/cfec/7cb8/c2b04b4481e9/bb8b5807138c/08281716716-p/08281716716-p.jpg?ts=1762939187527&w=1125'
    },
    {
      img: 'https://static.zara.net/assets/public/b12d/7452/cbb4418aa0a3/536354cf7c2d/08281716716-a1/08281716716-a1.jpg?ts=1762939184397&w=1280'
    },
    {
      img: 'https://static.zara.net/assets/public/dce4/cf33/6c43488c9707/640162532c8d/08281716716-a2/08281716716-a2.jpg?ts=1762939186713&w=850'
    },
    {
      img: 'https://static.zara.net/assets/public/acfc/938f/95db4199b8d7/82d71b1641ca/08281716716-a3/08281716716-a3.jpg?ts=1762939187030&w=850'
    },
    {
      img: 'https://static.zara.net/assets/public/42e8/4fb0/c7664d038200/2779efc9c010/08281716716-a4/08281716716-a4.jpg?ts=1762939187680&w=850'
    },
    {
      img: 'https://static.zara.net/assets/public/6665/7c68/8e874d5b9774/2cc198736f74/08281716716-000-a5/08281716716-000-a5.jpg?ts=1762967657225&w=850'
    },
    {
      img: 'https://static.zara.net/assets/public/6d25/1b76/95134cea8810/15e33fb11bd7/08281716716-e1/08281716716-e1.jpg?ts=1762774920460&w=850'
    },
    {
      img: 'https://static.zara.net/assets/public/7912/46cb/220b48fb816a/c6b25c7230c9/08281716716-e2/08281716716-e2.jpg?ts=1762774920709&w=850'
    }
  ];

  return (
    <div>
      {/* First Image */}
      <img
        className="object-cover w-full rounded-sm h-3/4"
        src={data?.[0]?.img}
        alt=""
      />

      {/* Description */}
      <p className="pb-10 text-sm font-light text-neutral-800 pt-15">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
        molestias quaerat animi nihil eum, vel quisquam tempore voluptates dicta
        dolorem odit atque adipisci autem iste ratione? Dolore, iste. Optio, ad?
      </p>
      {/* Id */}
      <p className="text-[11px] font-light uppercase text-neutral-800 pb-15">
        RAYAS | 2897/896/896
      </p>
      {/* Mas fotos */}
      <div>
        {data.slice(1).map((item, index) => (
          <img
            className="object-cover w-full mb-6 rounded-sm h-3/4"
            key={index}
            src={item.img}
            alt="Ropa"
          />
        ))}
      </div>
    </div>
  );
};
