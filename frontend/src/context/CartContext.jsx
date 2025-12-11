import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  CART_STORAGE_KEY,
  CART_UPDATED_EVENT,
  addItemToCart,
  getCartItems,
  removeCartItem,
  setCartItems,
  updateItemQuantity,
} from "../utils/cartStorage";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const cartSectionRef = useRef(null);

  const refreshItems = useCallback(() => {
    setItems(getCartItems());
  }, []);

  useEffect(() => {
    refreshItems();

    const handleStorage = (event) => {
      if (!event.key || event.key === CART_STORAGE_KEY) {
        refreshItems();
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(CART_UPDATED_EVENT, refreshItems);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(CART_UPDATED_EVENT, refreshItems);
    };
  }, [refreshItems]);

  const addToCart = useCallback(
    (payload) => {
      const updated = addItemToCart(payload);
      setItems(updated);
    },
    [setItems]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
    setItems([]);
  }, []);

  const removeFromCart = useCallback((key) => {
    const updated = removeCartItem(key);
    setItems(updated);
  }, []);

  const updateQuantity = useCallback((key, newQuantity) => {
    const updated = updateItemQuantity(key, newQuantity);
    setItems(updated);
  }, []);

  const cartCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  const scrollToCart = useCallback(() => {
    if (cartSectionRef.current) {
      cartSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const value = useMemo(
    () => ({
      items,
      addToCart,
      clearCart,
      removeFromCart,
      updateQuantity,
      total,
      cartCount,
      cartSectionRef,
      scrollToCart,
    }),
    [items, addToCart, clearCart, removeFromCart, updateQuantity, total, cartCount, scrollToCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

