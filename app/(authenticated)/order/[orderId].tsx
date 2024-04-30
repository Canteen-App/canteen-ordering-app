import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  checkPaymentMade,
  getOrderDetails,
  getPaymentIntent,
  showLocalTime,
} from "@/services/order";
import { ImageBackground } from "expo-image";
import {
  PaymentSheet,
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import { auth } from "@/firebase";
import { getCustomerAccount } from "@/services/customer";
import { onAuthStateChanged } from "firebase/auth";

const OrderDetails = () => {
  const [order, setOrder] = useState<any>();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        const customer = await getCustomerAccount(user.uid);
        setUser({ ...customer, ...user });
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const getData = async () => {
    if (orderId) {
      const orderDetails = await getOrderDetails(orderId);
      setOrder(orderDetails);
    }
  };

  useEffect(() => {
    getData();
  }, [orderId]);

  if (!order) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const makePendingPayment = async () => {
    if (order) {
      const paymentIntentResponse = await getPaymentIntent(order.id);

      await initPaymentSheet({
        merchantDisplayName: "Canteen Pvt Ltd",
        paymentIntentClientSecret: paymentIntentResponse.paymentIntent,
        billingDetailsCollectionConfiguration: {
          email: user.email,
          name: user.name,
          address: PaymentSheet.AddressCollectionMode.NEVER,
        },
        customerId: user.id,
      });

      await presentPaymentSheet();

      await checkPaymentMade(order.id);

      getData();
    }
  };

  return (
    <View className="flex-1">
      <View className="flex p-2 flex-row items-center gap-4">
        <TouchableOpacity
          onPress={() => router.replace("/(authenticated)/order")}
        >
          <FontAwesome name="chevron-left" size={30} color="#744E15" />
        </TouchableOpacity>
        <Ionicons name="receipt-outline" size={35} color="#744E15" />
        <Text className="text-3xl font-black text-brown-dark">
          Order Details
        </Text>
      </View>

      <View className="px-4">
        <Text className="font-bold text-brown-dark">Order Id: {order.id}</Text>
        <Text className="">
          Placed on {new Date(order.orderTime).toDateString()}{" "}
          {showLocalTime(order.orderTime)}
        </Text>
      </View>

      {order.status == "PENDING_COLLECTION" && (
        <View className="flex flex-row px-4 items-center">
          <View className="flex flex-row items-center gap-2 pr-2">
            <Text>
              <FontAwesome name="check" size={25} color="green" />
            </Text>
            <Text className="font-black text-xl text-green-700 ">Paid</Text>
          </View>
          <Text className="font-bold text-lg pl-2 border-l-2">
            Pending Collection
          </Text>
        </View>
      )}

      {order.status == "PENDING_PAYMENT" && (
        <View className="flex flex-row px-4 items-center">
          <View className="flex flex-row items-center gap-2 pr-2">
            <Text>
              <FontAwesome name="credit-card" size={25} color="#C90E0E" />
            </Text>
            <Text className="font-black text-xl text-red-dark ">To Pay</Text>
          </View>
          <Text className="font-bold text-lg pl-2 border-l-2">
            Pending Payment
          </Text>
        </View>
      )}

      <ScrollView className="bg-brown-light-2 px-4 py-2 flex-grow rounded-2xl overflow-hidden">
        {order.items &&
          order.items.map(
            (orderItem: any, index: number) =>
              orderItem && (
                <View key={index} className="bg-brown-mid mb-2 rounded-xl">
                  <ImageBackground
                    className="rounded-xl overflow-hidden"
                    source={{ uri: orderItem.item.imageURL }}
                  >
                    <View className="w-full absolute h-full bg-brown-dark opacity-80" />
                    <View className="flex flex-row mb-4 justify-between items-end p-2">
                      <View>
                        <Text className="text-white">
                          {orderItem.item.category.name}
                        </Text>
                        <Text className="text-2xl font-black text-white">
                          {orderItem.item.name}
                        </Text>
                      </View>
                      <View>
                        <View className="flex flex-row items-center gap-1">
                          <Text className="font-bold text-white text-lg">
                            {orderItem.item.price}
                          </Text>
                          <FontAwesome name="times" color="white" />
                          <Text className="font-bold text-white text-lg">
                            {orderItem.quantity}
                          </Text>
                        </View>
                        <View>
                          <Text className="text-xl text-white font-black">
                            Rs {orderItem.item.price * orderItem.quantity}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                  {order.status == "PENDING_COLLECTION" && (
                    <View className="flex px-2 rounded-b-xl flex-row justify-between items-center bg-brown-mid">
                      {orderItem.quantity - orderItem.quantityCollected <= 0 ? (
                        <Text className="text-lg font-bold">
                          Fully Collected
                        </Text>
                      ) : (
                        <>
                          <Text className="text-lg">
                            Remaining Collectable Quantity
                          </Text>
                          <Text className="text-lg font-bold">
                            {orderItem.quantity - orderItem.quantityCollected}
                          </Text>
                        </>
                      )}
                    </View>
                  )}
                </View>
              )
          )}
      </ScrollView>

      <View className="bg-brown-light px-5 py-2 rounded-t-3xl">
        <View className="py-2 flex flex-row justify-between">
          <Text className="text-brown-dark font-black text-2xl">
            Total Amount
          </Text>
          <Text className="text-brown-dark font-black text-2xl">
            Rs {order.payment.totalAmount.toLocaleString()}
          </Text>
        </View>
        {order.status == "PENDING_PAYMENT" && (
          <TouchableOpacity
            onPress={makePendingPayment}
            className="bg-yellow p-3 rounded-lg flex flex-row items-center justify-between"
          >
            <FontAwesome name="credit-card" size={35} color="black" />
            <Text className="text-black font-black text-center text-2xl">
              Make Pending Payment
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default OrderDetails;
