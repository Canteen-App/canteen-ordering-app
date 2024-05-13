import React, { createContext, useContext, useEffect, useState } from "react";
import EventSource from "react-native-sse";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";
import { router } from "expo-router";

interface ItemCollectedNotificationContextType {
  itemCollectedNotification: any;
  clearNotification: () => void;
}

const ItemCollectedNotificationContext =
  createContext<ItemCollectedNotificationContextType>({
    itemCollectedNotification: null,
    clearNotification: () => {},
  });

export const useItemCollectedNotification =
  (): ItemCollectedNotificationContextType =>
    useContext(ItemCollectedNotificationContext);

export const ItemCollectedNotificationProvider = ({ children }: any) => {
  const [itemCollectedNotification, setItemCollectedNotification] =
    useState<any>(null);

  useEffect(() => {
    const es = new EventSource(
      `${process.env.EXPO_PUBLIC_API_URL}/events/check-items-collected`
    );
    es.addEventListener("open", (event) => {
      console.log("Open SSE connection.");
    });

    es.addEventListener("message", (event: any) => {
      console.log(event.data);
      setItemCollectedNotification(event.data);
      Alert.alert(
        "Order Items Collected",
        `Items were collected from your order ${event?.data?.orderId}`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "View Order",
            onPress: () =>
              router.push(`/(authenticated)/order/${event?.data?.orderId}`),
          },
        ]
      );
    });

    es.addEventListener("error", (event) => {
      console.log(event);
    });

    es.addEventListener("close", (event) => {
      console.log("Close SSE connection.");
    });

    return () => {
      es.close();
    };
  }, []);

  const clearNotification = () => {
    setItemCollectedNotification(null);
  };

  const contextValue: ItemCollectedNotificationContextType = {
    itemCollectedNotification,
    clearNotification,
  };

  return (
    <ItemCollectedNotificationContext.Provider value={contextValue}>
      {children}
    </ItemCollectedNotificationContext.Provider>
  );
};
