// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCt_5LXKaDsJNmtbAM6xLoF2wmHIxszG2s",
  authDomain: "canteen-ordering-app.firebaseapp.com",
  projectId: "canteen-ordering-app",
  storageBucket: "canteen-ordering-app.appspot.com",
  messagingSenderId: "41114026092",
  appId: "1:41114026092:web:7c0125a1cb371eb6d29849",
  measurementId: "G-BG3XGX7HV3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
