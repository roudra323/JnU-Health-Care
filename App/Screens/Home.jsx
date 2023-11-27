import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../Components/Home/Header";
import doctor from "../../assets/doctor.jpg";
import * as Svg from "react-native-svg";

const Home = ({ navigation }) => {
  const handleButtonPress = () => {
    // Add your logic for the button press action
    console.log("Button pressed!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={doctor} style={styles.doctorImage} resizeMode="cover" />
      </View>

      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Hi John 👋</Text>
        <Text style={styles.subtext}>
          Your Mental Well-being Matters.{"\n"}Book Your{" "}
          <Text style={{ fontWeight: "bold" }}>Counseling Session</Text> Now.
        </Text>

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  doctorImage: {
    width: 300,
    height: 500,
  },
  greetingContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtext: {
    fontSize: 18,
    color: "#555",
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Home;
