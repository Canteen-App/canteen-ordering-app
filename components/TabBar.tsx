import { View, TouchableOpacity } from "react-native";
import React from "react";
import {
  AntDesign,
  FontAwesome,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import { router, usePathname } from "expo-router";

const TabBar = () => {
  const path = usePathname();

  const openUserModal = () => {
    if (path == "/user-modal") {
      router.replace("/user-modal");
    } else {
      router.push("/user-modal");
    }
  };

  const openCart = () => {
    if (path == "/cart/" || path == "/cart/pre-order/") {
      router.replace("/cart/");
    } else {
      router.push("/cart/");
    }
  };

  const openOrders = () => {
    if (path == "/order/") {
      router.replace("/order/");
    } else {
      router.push("/order/");
    }
  };

  return (
    <View className="bg-brown-mid p-4 overflow-visible">
      <View className="flex flex-row items-center justify-between">
        <TouchableOpacity
          className=""
          onPress={() => router.push("/(authenticated)")}
        >
          <AntDesign name="home" size={40} color="#744E15" />
        </TouchableOpacity>

        <TouchableOpacity onPress={openCart}>
          <AntDesign name="shoppingcart" size={35} color="#744E15" />
        </TouchableOpacity>
        <TouchableOpacity onPress={openOrders}>
          <Ionicons name="receipt-outline" size={35} color="#744E15" />
        </TouchableOpacity>
        <TouchableOpacity onPress={openUserModal} className="w-fit h-fit">
          <FontAwesome size={30} color="#744E15" name="user-o" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TabBar;
