import { View, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
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

  return (
    <View className="bg-brown-mid p-4 overflow-visible">
      <View className="flex flex-row items-center justify-between">
        <TouchableOpacity onPress={openUserModal} className="w-fit h-fit">
          <FontAwesome size={30} color="#744E15" name="user-o" />
        </TouchableOpacity>
        <TouchableOpacity
          className=""
          onPress={() => router.push("/(authenticated)")}
        >
          <AntDesign name="home" size={40} color="#744E15" />
        </TouchableOpacity>
        <TouchableOpacity onPress={openCart}>
          <AntDesign name="shoppingcart" size={35} color="#744E15" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TabBar;
