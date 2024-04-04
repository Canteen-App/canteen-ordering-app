import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { getCartItems } from "@/services/cart";

const Cart = () => {
  const [items, setItems] = useState<
    { item: any; quantity: number }[] | null | undefined
  >(null);
  const [totalAmount, setTotalAmount] = useState(0);

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
      }
    };

    getData();
  }, []);

  return (
    <View className="flex-1">
      <View className="flex p-2 flex-row items-center gap-4">
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="chevron-left" size={30} color="#744E15" />
        </TouchableOpacity>
        <FontAwesome name="shopping-cart" size={35} color="#744E15" />
        <Text className="text-3xl font-black text-brown-dark">Cart</Text>
      </View>
      <View className="p-4 flex-grow">
        <View className="bg-brown-light px-4 py-2 rounded-lg">
          {items &&
            items.map((cartItem) => (
              <View className="flex py-2 flex-row w-full justify-between">
                <View>
                  <Text className="text-2xl font-bold text-brown-dark">
                    {cartItem.item.name}
                  </Text>
                  <Text className="text-xl font-light text-brown-dark">
                    Rs {cartItem.item.price}
                  </Text>
                </View>
                <View>
                  <View className="flex items-center flex-row">
                    <TouchableOpacity className="flex justify-center items-center rounded-full bg-yellow text-brown-dark p-1">
                      <AntDesign color="#744E15" size={20} name="minus" />
                    </TouchableOpacity>
                    <Text className="font-black px-4 text-3xl text-brown-dark">
                      {cartItem.quantity}
                    </Text>
                    <TouchableOpacity className="flex justify-center items-center rounded-full bg-brown-dark text-yellow p-1">
                      <AntDesign color="#FFB906" size={20} name="plus" />
                    </TouchableOpacity>
                  </View>
                  <Text className="text-2xl py-1 text-right font-black text-brown-dark">
                    Rs{" "}
                    {(
                      parseInt(cartItem.item.price) * cartItem.quantity
                    ).toLocaleString()}
                  </Text>
                </View>
              </View>
            ))}
        </View>
      </View>
      <View className="bg-brown-light px-5 py-2 rounded-t-3xl">
        <View className="py-2 flex flex-row justify-between">
          <Text className="text-brown-dark font-black text-2xl">
            Total Amount
          </Text>
          <Text className="text-brown-dark font-black text-2xl">
            Rs {totalAmount.toLocaleString()}
          </Text>
        </View>
        <TouchableOpacity className="border-2 border-brown-dark py-3 rounded-lg">
          <Text className="text-black font-black text-center text-2xl">
            Pre-Order
          </Text>
        </TouchableOpacity>
        <View className="flex flex-row items-center">
          <View className="h-[2px] flex-grow bg-black" />
          <Text className="text-xl p-2 font-black">OR</Text>
          <View className="h-[2px] flex-grow bg-black" />
        </View>
        <TouchableOpacity className="bg-yellow py-3 rounded-lg">
          <Text className="text-black font-black text-center text-2xl">
            Order Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;
