import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase";
import { createCustomerAccount } from "@/services/customer";

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async () => {
    if (name.length > 0 && email.length > 0 && password.length > 0) {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await createCustomerAccount(userCred.user.uid, name);
    }
  };

  return (
    <View className="flex-1 gap-2 items-center justify-center">
      {isLogin ? (
        <>
          <Text className="text-3xl font-black text-brown-dark">Sign In</Text>
          <KeyboardAvoidingView className="flex gap-y-5 w-4/5">
            <TextInput
              value={email}
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
              className="p-2 text-lg border-2 border-brown-dark rounded-lg"
            />
            <TextInput
              secureTextEntry={true}
              value={password}
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              className="p-2 text-lg border-2 border-brown-dark rounded-lg"
            />
            <TouchableOpacity
              className="w-full bg-brown-dark py-3 rounded-lg"
              onPress={signIn}
            >
              <Text className="text-2xl font-black text-white text-center">
                Login
              </Text>
            </TouchableOpacity>
            <View>
              <Text className="text-center mb-1 text-lg">
                Don't have an account
              </Text>
              <TouchableOpacity
                className="w-full border-2 border-brown-dark py-3 rounded-lg"
                onPress={() => setIsLogin(false)}
              >
                <Text className="text-2xl font-black text-brown-dark text-center">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </>
      ) : (
        <>
          <Text className="text-3xl font-black text-brown-dark">Sign Up</Text>
          <KeyboardAvoidingView className="flex gap-y-5 w-4/5">
            <TextInput
              value={name}
              autoCapitalize="none"
              onChangeText={(text) => setName(text)}
              placeholder="Name"
              className="p-2 text-lg border-2 border-brown-dark rounded-lg"
            />
            <TextInput
              value={email}
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
              className="p-2 text-lg border-2 border-brown-dark rounded-lg"
            />
            <TextInput
              secureTextEntry={true}
              value={password}
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              className="p-2 text-lg border-2 border-brown-dark rounded-lg"
            />
            <TouchableOpacity
              className="w-full bg-brown-dark py-3 rounded-lg"
              onPress={signUp}
            >
              <Text className="text-2xl font-black text-white text-center">
                Sign Up
              </Text>
            </TouchableOpacity>
            <View>
              <Text className="text-center mb-1 text-lg">
                Already have an account
              </Text>
              <TouchableOpacity
                className="w-full border-2 border-brown-dark py-3 rounded-lg"
                onPress={() => setIsLogin(true)}
              >
                <Text className="text-2xl font-black text-brown-dark text-center">
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </>
      )}
    </View>
  );
};

export default SignIn;
