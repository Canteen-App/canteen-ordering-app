import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { getCartItems, useCart } from "@/services/cart";
import CartItem from "@/components/Cart/CartItem";

const Cart = () => {
  const [items, setItems] = useState<
    { item: any; quantity: number }[] | null | undefined
  >(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const { cart, clearCart } = useCart();

  useEffect(() => {
    const getData = async () => {
      const cartItems = await getCartItems();
      setItems(cartItems);

      if (cartItems) {
        let total = 0;
        for (let cartItem of cartItems) {
          total += parseInt(cartItem.item.price) * cartItem.quantity;
        }
        setTotalAmount(total);
      } else {
        setTotalAmount(0);
      }
    };

    getData();
  }, [cart]);

  useEffect(() => {
    const updateTotal = () => {
      if (items) {
        let total = 0;
        for (let cartItem of items) {
          if (cartItem) {
            total += parseInt(cartItem.item.price) * cartItem.quantity;
          }
        }
        setTotalAmount(total);
      }
    };

    updateTotal();
  }, [items]);

  let rowRefs = new Map();

  return (
    <View className="flex-1">
      <View className="flex  p-2 flex-row items-center gap-4">
        <TouchableOpacity onPress={() => router.dismiss()}>
          <FontAwesome name="chevron-left" size={30} color="#744E15" />
        </TouchableOpacity>
        <AntDesign name="shoppingcart" size={35} color="#744E15" />
        <Text className="text-3xl font-black text-brown-dark">Cart</Text>
        <View className="flex-grow" />
        <TouchableOpacity
          onPress={clearCart}
          className="bg-red-500 p-2 rounded-lg"
        >
          <Text className="text-2xl font-black text-white">Clear Cart</Text>
        </TouchableOpacity>
      </View>
      <View className="p-2 flex-grow">
        <ScrollView className="bg-brown-light h-[200px] px-1 py-2 rounded-lg">
          {items &&
            items.map((cartItem, index) => (
              <View key={index}>
                {cartItem && (
                  <CartItem
                    rowRefs={rowRefs}
                    cartItem={cartItem}
                    items={items}
                    setItems={setItems}
                  />
                )}
              </View>
            ))}
        </ScrollView>
      </View>
      <View className="bg-brown-light px-5 py-2 rounded-t-3xl">
        {items && items?.length > 0 ? (
          <View>
            <View className="py-2 flex flex-row justify-between">
              <Text className="text-brown-dark font-black text-2xl">
                Total Amount
              </Text>
              <Text className="text-brown-dark font-black text-2xl">
                Rs {totalAmount.toLocaleString()}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.replace("/cart/pre-order/")}
              className="border-2 border-brown-dark py-3 rounded-lg"
            >
              <Text className="text-black font-black text-center text-2xl">
                Pre-Order
              </Text>
            </TouchableOpacity>
            <View className="flex flex-row items-center">
              <View className="h-[2px] flex-grow bg-black" />
              <Text className="text-xl p-2 font-black">OR</Text>
              <View className="h-[2px] flex-grow bg-black" />
            </View>
            <TouchableOpacity
              onPress={() => router.replace("/cart/order/")}
              className="bg-yellow py-3 rounded-lg"
            >
              <Text className="text-black font-black text-center text-2xl">
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex flex-row w-full items-center gap-3">
            <Text className="text-2xl font-black text-red-700">Cart Empty</Text>
            <TouchableOpacity
              onPress={() => router.replace("/(authenticated)/")}
              className="bg-yellow py-3 rounded-lg flex-grow"
            >
              <Text className="text-black font-black text-center text-2xl">
                View Items
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default Cart;
