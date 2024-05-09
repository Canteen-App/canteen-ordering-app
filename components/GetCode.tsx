import {
  View,
  Text,
  TouchableOpacity,
  Button,
  TouchableHighlight,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { generateOrderCode } from "@/services/order";
import { useFocusEffect } from "expo-router";

const GetCode = ({ setGetCode, orderId }: any) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  useFocusEffect(
    useCallback(() => {
      const getCode = async () => {
        setLoading(true);
        console.log("Getting code..");
        const code = await generateOrderCode(orderId);
        const codeStr = code.verifyOrderCode.toString();
        setCode(codeStr.slice(0, 3) + "-" + codeStr.slice(3));
        console.log(code);
        setLoading(false);
      };
      getCode();
    }, [])
  );

  return (
    <View className="absolute top-0 h-full w-full">
      <View className="relative h-full w-full flex items-center justify-center">
        <View className="w-full absolute h-full bg-brown-dark opacity-50" />
        <View className="p-4 relative bg-white rounded-xl">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-2xl font-black">Order Code</Text>
            <TouchableOpacity
              onPress={() => setGetCode(false)}
              className="w-10 h-10 relative flex justify-center items-center rounded-full bg-red-dark"
            >
              <FontAwesome name="times" size={30} color="white" />
            </TouchableOpacity>
          </View>
          {loading && (
            <View className="flex flex-row items-center justify-center">
              <FontAwesome className="animate-spin" name="spinner" size={20} />
              <Text className="p-4 text-2xl">Loadding...</Text>
            </View>
          )}
          {code && (
            <View>
              <Text className="text-center py-4 text-5xl font-bold">
                {code}
              </Text>
              <Text className="text-center pt-2 pb-5">
                This code is only valid for 5 minutes
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default GetCode;
