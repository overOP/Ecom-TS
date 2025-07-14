import React, { useEffect, useState } from "react";
import { useCart } from "@/Store/cartStore";
import CartItemCard from "@/Components/Home/Cart/CartItemCard";
import { SyncLoader } from "react-spinners";

const Cart: React.FC = () => {
  const cart = useCart((state) => state.cartItem);
  const removeFromCart = useCart((state) => state.removeFromCart);
  const increaseQuantity = useCart((state) => state.increaseQuantity);
  const decreaseQuantity = useCart((state) => state.decreaseQuantity);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); 

    return () => clearTimeout(timer);
  }, []);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (loading) {
    return (
      <main className="flex justify-center items-center min-h-screen p-4">
        <SyncLoader color="#d4492b" size={15} />
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold text-[#d4492b] mb-3 text-center">
          Your Cart ({totalItems})
        </h2>

        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-400 mt-2 text-sm">
              Your added items will appear here
            </p>
          </div>
        ) : (
          <>
            <ul className="space-y-4 mb-4">
              {cart.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </ul>
            <div className="text-right mt-4">
              <h3 className="text-lg font-semibold">
                Total Price: ₹{totalPrice.toFixed(2)}
              </h3>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Cart;
