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

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRegex = /^([\w.]+)@([\w.]+)\.jnu\.ac\.bd$/;

  const isEmailValid = (text) => {
    return emailRegex.test(text);
  };

  const loginData = async () => {
    try {
      // Validate email and password
      if (!email || !password) {
        console.log("Please enter both email and password");
        return;
      }
  
      // Make the POST request
      const res = await client.post('/auth/login', {
        email: email,
        password: password,
      });
  
      // Check the response status or data for successful login
      if (res.status === 200) {
        console.log("Login successful");
        navigation.navigate("Tab");
      } else {
        console.log("Login failed. Please check your credentials.");
      }
    } catch (error) {
      // Handle specific error cases
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Server responded with an error:", error.response.data.error);
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
          <Image
            source={TestImg} // Replace 'YourImage' with the variable name you used in the import statement
            style={{ width: 350, height: 200 }} // You can adjust the width and height as needed
          />
          <Text
            style={{
              fontFamily: "RMedium",
              fontSize: 28,
              fontWeight: "500",
              color: "#333",
              marginBottom: 30,
              paddingTop: 50,
            }}
          >
            Login
          </Text>
        </View>

        <InputField
          label={"Email ID"}
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
          label={"Password"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => { }}
          value={password}
          onChangeText={(password) => setPassword(password)}
        />

        <CustomButton
          label={"Login"}
          onPress={loginData}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Regi")}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
              {" "}
              Register
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
