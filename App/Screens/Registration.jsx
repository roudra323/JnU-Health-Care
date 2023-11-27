import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Colours } from "../../assets/Shared";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Fontisto } from "@expo/vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Font from "expo-font";
import CustomButton from "../Components/CustomButton";
import InputField from "../Components/InputField";
import LoginSVG from "../../assets/login.svg";
import TestImg from "../../assets/login.jpg";

export default function Registration({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [presentAddress, setPresentAddress] = useState("");
  const [dept, setDept] = useState("");
  const [batch, setBatch] = useState("");
  const [blood, setBlood] = useState("");
  const [dob, setdob] = useState("");
  const [id, setId] = useState("");

  const emailRegex = /^([\w.]+)@([\w.]+)\.jnu\.ac\.bd$/;

  const isEmailValid = (text) => {
    return emailRegex.test(text);
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
                fontFamily: "RMedium",
                fontSize: 28,
                fontWeight: "500",
                color: "#333",
                marginBottom: 30,
                paddingTop: 50,
              }}
            >
              Registration
            </Text>
          </View>

          <InputField
            label={"Name"}
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
            label={"Phone Number"}
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
            label={"Present Address"}
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
            label={"Department"}
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
            label={"Batch"}
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
            label={"Blood Group"}
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
            required={true}
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
            fieldButtonFunction={() => {}}
            value={password}
            onChangeText={(password) => setPassword(password)}
            required={true}
          />

          <CustomButton
            label={"Register"}
            onPress={() => {
              if (!isEmailValid(email)) {
                alert("Enter Varsity Email ID");
                return;
              }
              console.log("Registration button pressed");
              console.log("Email: " + email);
              console.log("Password: " + password);
              navigation.navigate("Login");
            }}
          />
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
