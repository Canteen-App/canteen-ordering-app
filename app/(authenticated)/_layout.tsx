import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import TabBar from "@/components/TabBar";
import { CartProvider } from "@/services/cart";
import { getCustomerAccount } from "@/services/customer";
import { StripeProvider } from "@stripe/stripe-react-native";

const Layout = () => {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        console.log(user)
        setUser(user);
        setLoading(false);
      } else {
        console.log("Logged Out");
        setUser(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!loading && user) {
    return (
      <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_KEY ?? ""}>
        <CartProvider>
          <Stack
            screenOptions={{
              statusBarColor: "#FFE9B1",
              headerShown: false,
            }}
          />
          <TabBar />
        </CartProvider>
      </StripeProvider>
    );
  }

  return <Redirect href="/" />;
};

export default Layout;
