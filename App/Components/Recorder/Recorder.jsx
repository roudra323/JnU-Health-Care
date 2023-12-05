import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";

const Recorder = ({ toggleList }) => {
  const [rotateValue] = useState(new Animated.Value(0));

  const rotateIcon = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  const onPressRecorder = () => {
    // Call the toggleList function passed as a prop
    toggleList();

    // Animate the icon rotation
    Animated.timing(rotateValue, {
      toValue: rotateValue._value === 0 ? 1 : 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  return (
    <TouchableOpacity style={styles.iconContainer} onPress={onPressRecorder}>
      <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
        <Ionicons name="reorder-three" size={40} color="black" />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    top: 15, // Adjust the top value as needed
    right: 10, // Adjust the right value as needed
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#fff",
  },
});

export default Recorder;
