import React from "react";
import { useCart } from "@/Store/cartStore";
import type { CartItem } from "@/Types/Types";

type ProductCardProps = {
  title: string;
  image: string;
  brand: string;
  price: number;
};

export const ProductCard: React.FC<ProductCardProps> = ({ title, image, brand, price }) => {
  const addToCart = useCart((state) => state.addToCart);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      id: Math.floor(Math.random() * 1000000), // unique id generator, better to use UUID in real apps
      name: title,
      img: image,
      price,
      quantity: 1,
    };
    addToCart(newItem);
  };

  return (
    <div className="bg-white p-4 rounded shadow text-center relative">
      <button
        onClick={handleAddToCart}
        className="absolute top-2 right-2 font-semibold text-gray-700 px-2 py-1 rounded-xl
       bg-[#e0e5ec] shadow-[inset_6px_6px_12px_#bebebe,_inset_-2px_-2px_4px_#ffffff]
       active:shadow-[inset_2px_2px_4px_#bebebe,_inset_-2px_-2px_4px_#ffffff]
       transition-all ease-in-out duration-300 cursor-pointer"
      >
        +
      </button>
      <img src={image} alt={title} className="h-32 mx-auto object-contain mb-2" />
      <h3 className="font-bold text-sm">{title}</h3>
      <p className="text-gray-500 text-xs">Brand: {brand}</p>
      <p className="text-blue-600 font-semibold">${price}</p>
    </div>
  );
};
