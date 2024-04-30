import AsyncStorage from "@react-native-async-storage/async-storage";
import { getItemDetails } from "./category";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext({
  cart: [] as any,
  addItemToCart: (itemId: string, quantity: number) => {},
  deleteCartItem: (itemId: string) => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<any[]>([]);

  const addItemToCart = async (itemId: string, quantity: number) => {
    try {
      const cart = await AsyncStorage.getItem("cart");
      if (cart) {
        const cartObject = JSON.parse(cart);
        if (cartObject[itemId]) {
          const newQuantity = (parseInt(cartObject[itemId]) ?? 0) + quantity;
          if (newQuantity >= 1 && newQuantity < 100) {
            cartObject[itemId] = newQuantity;
          }
        } else {
          cartObject[itemId] = quantity;
        }
        setCart(cartObject);
        await AsyncStorage.setItem("cart", JSON.stringify(cartObject));
      } else {
        const cartObject: any = {};
        cartObject[itemId] = quantity;
        setCart(cartObject);
        await AsyncStorage.setItem("cart", JSON.stringify(cartObject));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCartItem = async (itemId: string) => {
    try {
      const cart = await AsyncStorage.getItem("cart");
      if (cart) {
        const cartObject = JSON.parse(cart);
        delete cartObject[itemId];
        setCart(cartObject);
        await AsyncStorage.setItem("cart", JSON.stringify(cartObject));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem("cart");
      setCart([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const CartValues = {
    cart: cart,
    addItemToCart: addItemToCart,
    deleteCartItem: deleteCartItem,
    clearCart: clearCart,
  };

  return (
    <CartContext.Provider value={CartValues}>{children}</CartContext.Provider>
  );
};

export const getCartItems = async () => {
  try {
    const cart = await AsyncStorage.getItem("cart");
    if (cart) {
      const itemList = [] as any[];
      const cartObject = JSON.parse(cart);
      const itemIds = Object.keys(cartObject);
      for (var itemId of itemIds) {
        const fetchedItem = await getItemDetails(itemId);
        itemList.push({
          item: fetchedItem,
          quantity: parseInt(cartObject[itemId]),
        });
      }

      return itemList;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const getCartItemDetails = async (itemId: string) => {
  try {
    const cart = await AsyncStorage.getItem("cart");
    if (cart) {
      const cartObject = JSON.parse(cart);
      return cartObject[itemId];
    }
  } catch (error) {
    console.log(error);
  }
};

export const useCart = () => {
  return useContext(CartContext);
};
