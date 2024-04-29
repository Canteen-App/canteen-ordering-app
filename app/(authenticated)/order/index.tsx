import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { getToPayOrders, getToRecieveOrders } from "@/services/order";

type CurrentView = "ToPayOrder" | "ToRecieveOrder";

const OrdersPage = () => {
  const [toPayOrders, setToPayOrders] = useState([]);
  const [toRecieveOrders, setToRecieveOrders] = useState([]);
  const [currentView, setCurrentView] = useState<CurrentView>("ToRecieveOrder");

  useEffect(() => {
    if (currentView == "ToPayOrder") {
      const getData = async () => {
        const fetchedToPayOrders = await getToPayOrders();
        if (fetchedToPayOrders) {
          setToPayOrders(fetchedToPayOrders);
        }
      };
      getData();
    }
    if (currentView == "ToRecieveOrder") {
      const getData = async () => {
        const fetchedToRecieveOrders = await getToRecieveOrders();
        if (fetchedToRecieveOrders) {
          setToRecieveOrders(fetchedToRecieveOrders);
        }
      };
      getData();
    }
  }, [currentView]);

  const showLocalTime = (timeStr: string) => {
    const datetime = new Date(timeStr);
    const hours = datetime.getHours();
    const minutes = datetime.getMinutes();

    if (hours > 12) {
      return `${hours - 12}:${minutes} pm`;
    }

    return `${hours}:${minutes} am`;
  };

  return (
    <View className="flex-1">
      <View className="flex p-2 flex-row items-center gap-4">
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="chevron-left" size={30} color="#744E15" />
        </TouchableOpacity>
        <Ionicons name="receipt-outline" size={35} color="#744E15" />
        <Text className="text-3xl font-black text-brown-dark">My Orders</Text>
      </View>
      <View className="flex flex-row items-center justify-between">
        <View className="w-1/2 px-2">
          <TouchableOpacity
            onPress={() => setCurrentView("ToRecieveOrder")}
            className="flex border-2  border-brown-dark rounded-lg p-2 flex-col justify-center items-center"
          >
            <Ionicons name="fast-food-outline" size={40} color="#744E15" />
            <Text className="text-brown-dark font-black">To Recieve</Text>
          </TouchableOpacity>
        </View>
        <View className="w-1/2 px-2">
          <TouchableOpacity
            onPress={() => setCurrentView("ToPayOrder")}
            className="flex border-2 border-brown-dark rounded-lg p-2 flex-col justify-center items-center"
          >
            <FontAwesome name="credit-card" size={40} color="#744E15" />
            <Text className="text-brown-dark font-black">To Pay</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity className="flex flex-row gap-2 mt-1 items-center justify-end mr-2">
        <Text className="text-right text-lg font-bold text-brown-dark">
          View Previous
        </Text>
        <FontAwesome name="chevron-right" size={15} color="#744E15" />
      </TouchableOpacity>
      <ScrollView className="p-2 mb-1">
        {currentView == "ToPayOrder" && (
          <>
            {toPayOrders &&
              toPayOrders.map((toPayOrder: any, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    router.push(`/(authenticated)/order/${toPayOrder.id}`)
                  }
                  className="w-full p-2 mb-2 rounded-lg border-2"
                >
                  <View className="flex flex-row justify-between">
                    <View>
                      <Text className="text-xs">{toPayOrder.id}</Text>
                      <Text className="text-red-700 font-bold">
                        Payment Pending
                      </Text>
                    </View>
                    <View>
                      <Text className="font-bold">
                        {new Date(toPayOrder.orderTime).toLocaleDateString()}
                      </Text>
                      <Text className="font-bold">
                        {showLocalTime(toPayOrder.orderTime)}
                      </Text>
                    </View>
                  </View>

                  <View className="flex mt-4 flex-row justify-between">
                    <Text className="text-lg font-bold">
                      Total Items: {toPayOrder?._count?.items}
                    </Text>
                    <Text className="text-lg font-bold">
                      Total Amount: Rs{" "}
                      {toPayOrder?.payment?.totalAmount?.toLocaleString()}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </>
        )}

        {currentView == "ToRecieveOrder" && (
          <>
            {toRecieveOrders &&
              toRecieveOrders.map((toRecieveOrder: any, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    router.push(`/(authenticated)/order/${toRecieveOrder.id}`)
                  }
                  className="w-full p-2 mb-2 rounded-lg border-2"
                >
                  <View className="flex flex-row justify-between">
                    <View>
                      <Text className="text-xs">{toRecieveOrder.id}</Text>
                      <Text className="text-green-700 font-bold">Paid</Text>
                    </View>
                    <View>
                      <Text className="font-bold">
                        {new Date(
                          toRecieveOrder.orderTime
                        ).toLocaleDateString()}
                      </Text>
                      <Text className="font-bold">
                        {showLocalTime(toRecieveOrder.orderTime)}
                      </Text>
                    </View>
                  </View>

                  <View className="flex mt-4 flex-row justify-between">
                    <Text className="text-lg font-bold">
                      Total Items: {toRecieveOrder?._count?.items}
                    </Text>
                    <Text className="text-lg font-bold">
                      Total Amount: Rs{" "}
                      {toRecieveOrder?.payment?.totalAmount?.toLocaleString()}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default OrdersPage;
