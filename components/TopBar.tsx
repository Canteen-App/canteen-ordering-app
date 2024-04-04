import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

const TopBar = () => {
  return (
    <View className="bg-brown-light p-4 pt-0">
      <View className="flex flex-row justify-between">
        <TouchableOpacity className="w-fit h-fit">
          <FontAwesome size={24} color="#744E15" name="bars" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/user-modal")} className="w-fit h-fit">
          <FontAwesome size={30} color="#744E15" name="user-circle" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopBar;
