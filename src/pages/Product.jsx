import React, { useEffect, useRef, useState } from 'react';
import { Header } from '../components/Header';
import { ProductTemplate } from '../components/ProductTemplate';
import { YouMightLike } from '../components/YouMightLike';
import { AddCart } from '../components/AddCart';

export const Product = ({ isToggleOpen, setIsToggleOpen }) => {
  const youMightLikeRef = useRef(null);
  const [showAddCart, setShowAddCart] = useState(true);
  const lastScrollY = useRef(0);
  const hasScrolled = useRef(false);

  useEffect(() => {
    const target = youMightLikeRef.current;

    if (!target) return;

    const getScrollParent = (node) => {
      let parent = node.parentElement;
      while (parent) {
        const style = window.getComputedStyle(parent);
        const overflowY = style.overflowY;
        if (overflowY === 'auto' || overflowY === 'scroll') return parent;
        parent = parent.parentElement;
      }
      return null;
    };

    const root = getScrollParent(target);

    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentScrollY = window.scrollY;

        // 👇 IGNORAR primer render (sin scroll)
        if (!hasScrolled.current && currentScrollY === 0) {
          lastScrollY.current = currentScrollY;
          return;
        }

        hasScrolled.current = true;

        const scrollingUp = currentScrollY < lastScrollY.current;

        if (entry.isIntersecting) {
          // Llegaste a YouMightLike → ocultar
          setShowAddCart(false);
        } else {
          // Ya no está visible
          if (scrollingUp) {
            setShowAddCart(true);
          }
        }

        lastScrollY.current = currentScrollY;
      },
      {
        root: root || null,
        threshold: 0,
        rootMargin: '-90px 0px -25% 0px'
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="p-6 mt-15 ">
      <div className="sticky top-0 z-50">
        <Header isToggleOpen={isToggleOpen} setIsToggleOpen={setIsToggleOpen} />
      </div>
      <div>
        <ProductTemplate />
      </div>
      <div
        className={`fixed bottom-0 left-0 p-6 right-0 z-50 bg-white
    transition-all duration-500 ease-out
    ${
      showAddCart && !isToggleOpen
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-full pointer-events-none'
    }`}
      >
        <AddCart />
      </div>
      <div ref={youMightLikeRef} className="h-1" />
      <YouMightLike />
      <p className="w-full text-xs font-light text-center uppercase text-neutral-500 pt-15">
        CREATE WITH SPAZYO
      </p>
    </div>
  );
};
