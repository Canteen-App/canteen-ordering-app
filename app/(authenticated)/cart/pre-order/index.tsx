import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { getCartItems, useCart } from "@/services/cart";
import { router } from "expo-router";
import CartItem from "@/components/Cart/CartItem";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

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

  const [days, setDays] = useState<any>();
  const [selectedDay, setSelectedDay] = useState<any>();

  useEffect(() => {
    const getDays = () => {
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const today = new Date();
      const next7Days = [];

      for (let i = 1; i <= 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const dayOfWeek = daysOfWeek[date.getDay()];
        const dayOfMonth = date.getDate();

        next7Days.push({
          day: dayOfWeek,
          date: dayOfMonth,
          dateStr: date.toDateString(),
        });
      }

      setDays(next7Days);
    };

    getDays();
  }, []);

  let rowRefs = new Map();

  return (
    <View className="flex-1">
      <View className="flex  p-2 flex-row items-center gap-4">
        <TouchableOpacity onPress={() => router.replace("/cart/")}>
          <FontAwesome name="chevron-left" size={30} color="#744E15" />
        </TouchableOpacity>
        <FontAwesome name="clock-o" size={35} color="#744E15" />
        <Text className="text-3xl font-black text-brown-dark">Pre Order</Text>
      </View>
      <View className="p-1 flex-grow">
        <View className="h-[250px] flex-grow">
          <ScrollView className="bg-brown-light px-1 py-2 rounded-2xl overflow-hidden">
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
        <View className="py-4 mt-4 bg-brown-light px-2 rounded-lg">
          <View>
            <Text className="font-black text-2xl text-brown-dark">
              Select Day
            </Text>
            <View className="flex mt-2 flex-row w-full justify-between">
              {days &&
                days.map((day: any, index: number) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedDay(day)}
                    className={`${
                      selectedDay?.date == day?.date
                        ? "bg-yellow border-2 border-yellow"
                        : "border-2 border-brown-dark"
                    } rounded-lg px-2`}
                  >
                    <Text className="text-light text-base text-brown-dark text-center">
                      {day.day}
                    </Text>
                    <Text className="text-2xl text-brown-dark font-black text-center">
                      {day.date}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
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
        <TouchableOpacity
          disabled={selectedDay == null}
          onPress={() =>
            router.push({
              pathname: "/(authenticated)/cart/pre-order/payment",
              params: { date: selectedDay.dateStr },
            })
          }
          className={`bg-yellow py-3 rounded-lg ${
            selectedDay == null ? "opacity-50" : ""
          }`}
        >
          <Text className="text-black font-black text-center text-2xl">
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PreOrder;
