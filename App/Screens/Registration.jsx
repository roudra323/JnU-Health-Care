import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Fontisto } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";
import InputField from "../Components/InputField";
import CustomButton from "../Components/CustomButton";
import TestImg from "../../assets/login.jpg";
import client from "../api/client";
import Toast from "react-native-toast-message";

export default function Registration({ navigation }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [presentAddress, setPresentAddress] = useState("");
  const [dept, setDept] = useState("");
  const [batch, setBatch] = useState("");
  const [blood, setBlood] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRegex = /^([\w.]+)@([\w.]+)\.jnu\.ac\.bd$/;

  const isEmailValid = (text) => {
    return emailRegex.test(text);
  };

  const showAlert = (type, message) => {
    console.log("Alert:", type, message);

    Toast.show({
      type: type,
      text1: type === "success" ? "Success" : "Error",
      text2: message,
    });
  };

  const signUp = async function () {
    // Additional checks for empty fields
    if (
      !name ||
      !phone ||
      !presentAddress ||
      !dept ||
      !batch ||
      !blood ||
      !email ||
      !password
    ) {
      showAlert("error", "Please fill in all the fields");
      return;
    }

    if (!isEmailValid(email)) {
      showAlert("error", "Enter Varsity Email ID");
      return;
    }
    try {
      console.log("Registration button pressed");
      const res = await client.post("/auth/signup", {
        name,
        phone,
        dob,
        presentAddress,
        dept,
        batch,
        bloodGroup: blood,
        email,
        password,
      });

      if (res.status === 200) {
        showAlert(
          "success",
          "আপনার ইমেইলে একটি লিঙ্ক পাঠানো হয়েছে। লিঙ্কে ক্লিক করে আপনার ইমেইল ভেরিফাই করুন।"
        );
        navigation.navigate("Login");
      } else {
        showAlert("error", "Registration failed. Please try again.");
      }
    } catch (error) {
      showAlert("error", "Registration failed. Please try again.");
      console.error("Error during registration:", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ paddingHorizontal: 25 }}>
          <View style={{ alignItems: "center", paddingBottom: 60 }}>
            <Image
              source={TestImg} // Replace 'YourImage' with the variable name you used in the import statement
              style={{ width: 350, height: 200 }} // You can adjust the width and height as needed
            />
            <Text
              style={{
                fontFamily: "HindiSiliBold",
                fontSize: 28,
                fontWeight: "500",
                color: "#333",
                marginBottom: 30,
                paddingTop: 50,
              }}
            >
              রেজিস্ট্রেশন
            </Text>
          </View>

          <InputField
            label={"নাম"}
            icon={
              <MaterialIcons
                name="edit"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="name-phone-pad"
            value={name}
            onChangeText={(name) => setName(name)}
            required={true}
          />

          <InputField
            label={"মোবাইল নাম্বার"}
            icon={
              <MaterialIcons
                name="phone"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="number-pad"
            value={phone}
            onChangeText={(phone) => setPhone(phone)}
            required={true}
          />

          <InputField
            label={"জন্ম তারিখ (DD-MM-YYYY)"}
            icon={
              <AntDesign
                name="calendar"
                size={20}
                color="black"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="number-pad"
            value={dob}
            onChangeText={(dob) => setDob(dob)}
            required={true}
          />

          <InputField
            label={"বর্তমান ঠিকানা"}
            icon={
              <MaterialIcons
                name="home"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="name-phone-pad"
            value={presentAddress}
            onChangeText={(presentAddress) => setPresentAddress(presentAddress)}
            required={true}
          />

          <InputField
            label={"বিভাগ"}
            icon={
              <MaterialIcons
                name="school"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="name-phone-pad"
            value={dept}
            onChangeText={(dept) => setDept(dept)}
            required={true}
          />

          <InputField
            label={"ব্যাচ"}
            icon={
              <MaterialIcons
                name="school"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="name-phone-pad"
            value={batch}
            onChangeText={(batch) => setBatch(batch)}
            required={true}
          />
          <InputField
            label={"রক্তের গ্রুপ"}
            icon={
              <Fontisto
                name="blood-drop"
                size={20}
                color="black"
                style={{ marginRight: 7 }}
              />
            }
            keyboardType="name-phone-pad"
            value={blood}
            onChangeText={(blood) => setBlood(blood)}
            required={true}
          />
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
            required={true}
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
            fieldButtonFunction={() => {}}
            value={password}
            onChangeText={(password) => setPassword(password)}
            required={true}
          />

          <CustomButton label={"রেজিস্টার"} onPress={signUp} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContainer: {
    flexGrow: 1, // Make sure the content can grow and be scrollable
    alignItems: "center",
    justifyContent: "center",
  },
  // ... (other styles)
});
