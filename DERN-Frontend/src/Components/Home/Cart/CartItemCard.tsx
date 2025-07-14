import React from "react";
import type { CartItem } from "@/Types/Types";

interface Props {
  item: CartItem;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

const CartItemCard: React.FC<Props> = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <li className="flex items-center gap-4 bg-[#fafafa] p-3 rounded-md">
      <img
        src={item.img}
        alt={item.name}
        className="w-14 h-14 object-cover rounded-md"
      />
      <div className="flex-1">
        <h4 className="font-medium text-sm">{item.name}</h4>
        <p className="text-gray-500 text-xs">₹{item.price} per item</p>
        <div className="flex items-center space-x-2 mt-1">
          <button
            onClick={() => onDecrease(item.id)}
            className="px-2 py-0.5 bg-gray-300 rounded text-sm hover:bg-gray-400"
          >
            -
          </button>
          <span className="text-sm">{item.quantity}</span>
          <button
            onClick={() => onIncrease(item.id)}
            className="px-2 py-0.5 bg-gray-300 rounded text-sm hover:bg-gray-400"
          >
            +
          </button>
        </div>
        <p className="text-sm mt-1 text-blue-600 font-semibold">
          Total: ₹{item.price * item.quantity}
        </p>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="text-red-500 font-semibold  px-2 py-1  rounded-xl
       bg-[#e0e5ec] shadow-[inset_6px_6px_12px_#bebebe,_inset_-2px_-2px_4px_#ffffff] 
       active:shadow-[inset_2px_2px_4px_#bebebe,_inset_-2px_-2px_4px_#ffffff] 
       transition-all ease-in-out duration-300 cursor-pointer"
      >
        Remove
      </button>
    </li>
  );
};

export default CartItemCard;
