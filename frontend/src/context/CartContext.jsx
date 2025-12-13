import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  CART_STORAGE_KEY,
  CART_UPDATED_EVENT,
  clearSplitMealSchedule,
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

  // ---------------- REFRESH ITEMS FROM LOCAL STORAGE ----------------
  const refreshItems = useCallback(() => {
    const stored = getCartItems();
    setItems(stored);
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

  // ---------------- ADD ITEM ----------------
  const addToCart = useCallback(
    (payload) => {
      const updated = addItemToCart(payload);

      // Save to localStorage
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));

      setItems(updated);
    },
    [setItems]
  );

  // ---------------- REMOVE ITEM ----------------
  const removeFromCart = useCallback(
    (key) => {
      const updated = removeCartItem(key);

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));

      setItems(updated);
    },
    [setItems]
  );

  // ---------------- UPDATE QUANTITY ----------------
  const updateQuantity = useCallback(
    (key, newQuantity) => {
      const updated = updateItemQuantity(key, newQuantity);

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));

      setItems(updated);
    },
    [setItems]
  );

  // ---------------- CLEAR CART ----------------
  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
    clearSplitMealSchedule();
    setItems([]);
  }, []);

  // ---------------- CART COUNT & TOTAL ----------------
  const cartCount = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.quantity), 0),
    [items]
  );

  const total = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0
      ),
    [items]
  );

  // ---------------- SCROLL TO CART SECTION ----------------
  const scrollToCart = useCallback(() => {
    if (cartSectionRef.current) {
      cartSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  // ---------------- CONTEXT VALUE ----------------
  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      total,
      cartSectionRef,
      scrollToCart,
    }),
    [
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      total,
      scrollToCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};

// ---------------- CUSTOM HOOK ----------------
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
