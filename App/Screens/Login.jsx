import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Colours } from "../../assets/Shared";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Font from "expo-font";
import CustomButton from "../Components/CustomButton";
import InputField from "../Components/InputField";
import LoginSVG from "../../assets/login.svg";
import TestImg from "../../assets/login.jpg";
import client from "../api/client";

import Toast from "react-native-toast-message";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRegex = /^([\w.]+)@([\w.]+)\.jnu\.ac\.bd$/;

  const isEmailValid = (text) => {
    return emailRegex.test(text);
  };

  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    console.log("Alert:", type, message);

    Toast.show({
      type: type,
      text1: type === "success" ? "Success" : "Error",
      text2: message,
    });
  };

  const loginData = async () => {
    try {
      // Validate email and password
      if (!email || !password) {
        showAlert("error", "Please enter both email and password");
        return;
      }
      if (!isEmailValid(email)) {
        alert("Enter Varsity Email ID");
        return;
      }

      // Make the POST request
      const res = await client.post("/auth/login", {
        email: email,
        password: password,
      });

      // Check the response status or data for successful login
      if (res.status === 200) {
        console.log("Login successful");
        showAlert("success", "Login successful");
        setTimeout(() => {
          navigation.navigate("Tab");
        }, 500); // Add a small delay before navigation
      } else {
        console.log("Login failed. Please check your credentials.");
        showAlert("error", "Login failed. Please check your credentials.");
      }
    } catch (error) {
      showAlert("error", error.response.data.error);
      // Handle specific error cases
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(
          "Server responded with an error:",
          error.response.data.error
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error during login request:", error.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center", paddingBottom: 60 }}>
          <Image source={TestImg} style={{ width: 350, height: 200 }} />
          <Text
            style={{
              fontFamily: "HindiSili",
              fontSize: 28,
              fontWeight: "500",
              color: "#333",
              marginBottom: 30,
              paddingTop: 50,
            }}
          >
            লগইন
          </Text>
        </View>

        <InputField
          label={"ইমেইল"}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />

        <InputField
          label={"পাসওয়ার্ড"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          fieldButtonLabel={"ভুলে গিয়েছেন?"}
          fieldButtonFunction={() => {}}
          value={password}
          onChangeText={(password) => setPassword(password)}
        />

        <CustomButton label={"লগইন"} onPress={loginData} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>আপনি কি নতুন ব্যবহারকারী?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Regi")}>
            <Text style={{ color: "#2955c6", fontWeight: "700" }}>
              {" "}
              রেজিস্ট্রেশন করুন
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
