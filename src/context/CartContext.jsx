import { createContext, useCallback, useMemo, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addCart = useCallback((product) => {
    setCart((prev) => [...prev, product]);
    console.log("add");
  }, []);

  const removeCart = useCallback((id) => {
    setCart((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index !== -1) {
        const updated = [...prev];
        updated.splice(index, 1); 
        return updated;
      }
      return prev;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price, 0);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addCart, removeCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}
