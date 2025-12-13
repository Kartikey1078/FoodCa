export const CART_STORAGE_KEY = "foodapp_cart";
export const CART_UPDATED_EVENT = "cartUpdated";
export const SPLIT_MEAL_STORAGE_KEY = "foodapp_split_schedule";

const safeParse = (raw) => {
  try {
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn("Failed to parse cart items from storage:", err);
    return [];
  }
};

export const getCartItems = () => {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(CART_STORAGE_KEY);
  return safeParse(raw);
};

export const setCartItems = (items) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
};

export const addItemToCart = (incomingItem) => {
  const items = getCartItems();

  const key =
    incomingItem.identifier ||
    `${incomingItem.mealId ?? incomingItem.title}-${incomingItem.option ?? "standard"}`;

  const existingIndex = items.findIndex((entry) => entry.key === key);

  if (existingIndex > -1) {
    items[existingIndex].quantity += incomingItem.quantity;
    items[existingIndex].note = incomingItem.note ?? items[existingIndex].note;
  } else {
    items.push({
      key,
      ...incomingItem,
    });
  }

  setCartItems(items);
  return items;
};

export const removeCartItem = (key) => {
  const items = getCartItems().filter((item) => item.key !== key);
  setCartItems(items);
  return items;
};

export const updateItemQuantity = (key, newQuantity) => {
  const items = getCartItems();
  const itemIndex = items.findIndex((item) => item.key === key);
  
  if (itemIndex > -1) {
    if (newQuantity <= 0) {
      // Remove item if quantity is 0 or less
      return removeCartItem(key);
    }
    items[itemIndex].quantity = newQuantity;
    setCartItems(items);
  }
  
  return items;
};

// ---------------- SPLIT MEAL SCHEDULE ----------------
export const getSplitMealSchedule = () => {
  if (typeof window === "undefined") return { sunday: 0, wednesday: 0 };
  const raw = window.localStorage.getItem(SPLIT_MEAL_STORAGE_KEY);
  const parsed = safeParse(raw);

  if (parsed && typeof parsed === "object") {
    return {
      sunday: Number(parsed.sunday) || 0,
      wednesday: Number(parsed.wednesday) || 0,
    };
  }

  return { sunday: 0, wednesday: 0 };
};

export const saveSplitMealSchedule = (schedule) => {
  if (typeof window === "undefined") return;
  const sanitized = {
    sunday: Math.max(0, Number(schedule?.sunday) || 0),
    wednesday: Math.max(0, Number(schedule?.wednesday) || 0),
  };

  window.localStorage.setItem(
    SPLIT_MEAL_STORAGE_KEY,
    JSON.stringify(sanitized)
  );
};

export const clearSplitMealSchedule = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SPLIT_MEAL_STORAGE_KEY);
};

