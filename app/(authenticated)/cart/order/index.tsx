import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { getCartItems } from "@/services/cart";
import { router } from "expo-router";
import { StripeProvider } from "@stripe/stripe-react-native";

const PreOrder = () => {
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

  return (
    <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_KEY ?? ""}>
      <View className="flex-1">
        <View className="flex  p-2 flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.replace("/cart/")}>
            <FontAwesome name="chevron-left" size={30} color="#744E15" />
          </TouchableOpacity>
          <FontAwesome name="credit-card" size={35} color="#744E15" />
          <Text className="text-3xl font-black text-brown-dark">
            Order Payment
          </Text>
        </View>
        <View className="p-2 flex-grow">
          <View className="h-[250px] flex-grow">
            <ScrollView className="bg-brown-light px-4 py-2 rounded-2xl overflow-hidden">
              {items &&
                items.map((cartItem, index) => (
                  <View key={index}>
                    {cartItem && (
                      <View className="flex flex-row mb-4 justify-between items-end">
                        <View>
                          <Text>{cartItem.item.category.name}</Text>
                          <Text className="text-2xl font-black">
                            {cartItem.item.name}
                          </Text>
                        </View>
                        <View>
                          <View className="flex flex-row items-center gap-1">
                            <Text className="font-bold text-lg">
                              {cartItem.item.price}
                            </Text>
                            <FontAwesome name="times" />
                            <Text className="font-bold text-lg">
                              {cartItem.quantity}
                            </Text>
                          </View>
                          <View>
                            <Text className="text-xl font-black">
                              {cartItem.item.price * cartItem.quantity}
                            </Text>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                ))}
            </ScrollView>
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
          <TouchableOpacity className="bg-yellow py-3 rounded-lg">
            <Text className="text-black font-black text-center text-2xl">
              Payment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </StripeProvider>
  );
};

export default PreOrder;
