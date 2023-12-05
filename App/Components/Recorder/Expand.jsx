import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Home from "../../Screens/Home";

const Expand = () => {
  const navigation = useNavigation();
  return (
    <ScrollView
      style={styles.expandedList}
      contentContainerStyle={styles.expandedListContent}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.expandedListItem}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Appointment")}>
        <Text style={styles.expandedListItem}>Appointment</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Article")}>
        <Text style={styles.expandedListItem}>Articles</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Doctors")}>
        <Text style={styles.expandedListItem}>Phycatrists</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.expandedListItem}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  expandedList: {
    position: "absolute",
    top: 70,
    right: 10,
    width: 200,
    height: 235,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    zIndex: 999,
  },

  expandedListContent: {
    justifyContent: "center", // Align items horizontally in the center
    alignItems: "center", // Align items vertically in the center
  },

  expandedListItem: {
    fontSize: 16,
    paddingVertical: 10,
  },
});

export default Expand;
