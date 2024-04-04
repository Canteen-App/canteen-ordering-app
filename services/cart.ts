import AsyncStorage from "@react-native-async-storage/async-storage";
import { getItemDetails } from "./category";

export const addItemToCart = async (itemId: string, quantity: number) => {
  try {
    const cart = await AsyncStorage.getItem("cart");
    if (cart) {
      const cartObject = JSON.parse(cart);
      if (cartObject[itemId]) {
        cartObject[itemId] = (parseInt(cartObject[itemId]) ?? 0) + quantity;
      } else {
        cartObject[itemId] = quantity;
      }
      await AsyncStorage.setItem("cart", JSON.stringify(cartObject));
    } else {
      const cartObject: any = {};
      cartObject[itemId] = quantity;
      await AsyncStorage.setItem("cart", JSON.stringify(cartObject));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCartItems = async () => {
  try {
    const cart = await AsyncStorage.getItem("cart");
    if (cart) {
      const itemList = [];
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
