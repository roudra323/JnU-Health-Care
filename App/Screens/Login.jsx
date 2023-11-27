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

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRegex = /^([\w.]+)@([\w.]+)\.jnu\.ac\.bd$/;

  const isEmailValid = (text) => {
    return emailRegex.test(text);
  };

  //   useEffect(() => {
  //     console.log("Email: ", email);
  //     console.log("Password: ", password);
  //   }, [email, password]);

  //   useEffect(() => {
  //     (async () =>
  //       await Font.loadAsync({
  //         Roboto_Medium: require("E:/Study Materials/3.2/Android Project/doctor-appointment/Styles/fonts/Roboto-Medium.ttf"),
  //       }))();
  //   }, []);

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
          fieldButtonFunction={() => {}}
          value={password}
          onChangeText={(password) => setPassword(password)}
        />

        <CustomButton
          label={"Login"}
          onPress={() => {
            if (!isEmailValid(email)) {
              alert("Enter Varsity Email ID");
              return;
            }
            console.log("Login button pressed");
            console.log("Email: " + email);
            console.log("Password: " + password);
          }}
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
