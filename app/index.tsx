import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <View className="flex-1 gap-2 items-center justify-center">
      <Text className="text-3xl font-black text-brown-dark">SignIn</Text>
      <KeyboardAvoidingView className="flex gap-y-5 w-4/5">
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          className="p-2 text-lg border-2 border-brown-dark rounded-lg"
        />
        <TextInput
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          className="p-2 text-lg border-2 border-brown-dark rounded-lg"
        />
        <TouchableOpacity className="w-full bg-brown-dark py-3 rounded-lg" onPress={signIn}>
          <Text className="text-2xl font-black text-white text-center">Login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignIn;
