import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import TopBar from "@/components/TopBar";

const Layout = () => {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        setUser(user);
        setLoading(false);
        console.log(user)
      } else {
        console.log("Logged Out")
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
      <>
        <TopBar />
        <Stack
          screenOptions={{
            statusBarColor: "#FFE9B1",
            headerShown: false,
          }}
        >
          <Stack.Screen name="user-modal" options={{ presentation: "modal" }} />
        </Stack>
      </>
    );
  }

  return <Redirect href="/" />;
};

export default Layout;
