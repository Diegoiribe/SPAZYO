import React from 'react';

export const YouMightLike = () => {
  const data = [
    {
      id: 1,
      img: 'https://static.zara.net/assets/public/658e/d6f5/e20043c2a021/654b6d1f51cb/05536333251-e1/05536333251-e1.jpg?ts=1759995469523&w=242',
      price: 999
    },
    {
      id: 2,
      img: 'https://static.zara.net/assets/public/1026/90db/679d49c89037/19463c48cc80/02634402555-e1/02634402555-e1.jpg?ts=1764693806587&w=242',
      price: 1499
    },
    {
      id: 3,
      img: 'https://static.zara.net/assets/public/8f36/5ab9/65b64e2ab470/01c729dd56a6/20210722999-e1/20210722999-e1.jpg?ts=1754321430732&w=242',
      price: 799
    },
    {
      id: 4,
      img: 'https://static.zara.net/assets/public/e57c/2c4e/785142b694a7/fa54c0636dd7/02949150800-e1/02949150800-e1.jpg?ts=1764861591848&w=242',
      price: 899
    },
    {
      id: 5,
      img: 'https://static.zara.net/assets/public/a29c/8b8a/c77d470da81e/aa5ad1e18eb5/07545710507-e1/07545710507-e1.jpg?ts=1753352004424&w=242',
      price: 1799
    },
    {
      id: 6,
      img: 'https://static.zara.net/assets/public/ac0f/729a/77974523b991/9c93d7d10fa1/03166330251-e1/03166330251-e1.jpg?ts=1760975354553&w=242',
      price: 699
    },
    {
      id: 7,
      img: 'https://static.zara.net/assets/public/482c/0808/47974231b1b8/a445f3f1786d/05779512800-e1/05779512800-e1.jpg?ts=1757598973819&w=242',
      price: 1999
    }
  ];
  return (
    <div className=" mt-15">
      <p className="mb-6 text-sm font-light uppercase text-neutral-800">
        te puede interesar
      </p>
      <div className="grid grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div key={index}>
            <img className="rounded-sm" src={item.img} alt="" />
            <p className="pt-3 text-xs font-light text-neutral-800">
              ${' '}
              {new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }).format(item.price)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
