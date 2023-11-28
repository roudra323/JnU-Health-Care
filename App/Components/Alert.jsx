import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Alert = ({ type, message }) => {
  const getIconName = () => {
    return type === "success" ? "ios-checkmark-circle" : "ios-close-circle";
  };

  const getIconColor = () => {
    return type === "success" ? "#4CAF50" : "#FF5722";
  };

  return (
    <View
      style={[
        styles.container,
        type === "success" ? styles.success : styles.danger,
      ]}
    >
      <Ionicons name={getIconName()} size={30} color={getIconColor()} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    position: "absolute",
    top: 0, // Position at the top of the screen
    left: 50,
    right: 50,
    zIndex: 999, // Ensure it's above other components
  },
  success: {
    backgroundColor: "#DFF2BF", // Green background for success
  },
  danger: {
    backgroundColor: "#FFCDD2", // Red background for danger
  },
  message: {
    marginLeft: 10,
    color: "#333",
    fontWeight: "500",
    textAlign: "center", // Center the text horizontally
  },
});

export default Alert;
