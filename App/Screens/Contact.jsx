import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import React, { useCallback } from "react";
import * as Linking from "expo-linking";

const Contact = () => {
  const handlePress = useCallback(async () => {
    console.log("Calling...");
    // Open the custom settings if the app has one
    await Linking.openURL(`tel:+12345678910`);
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Contact Us</Text>
        <View style={styles.contactSection}>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.contactInfo} onPress={handlePress}>
            +12345678910
          </Text>
        </View>
        <View style={styles.contactSection}>
          <Text style={styles.label}>Email Address:</Text>
          <Text style={styles.contactInfo}>contact@yourapp.com</Text>
        </View>
        {/* Add more contact sections for additional numbers/emails if needed */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "HindiSili",
  },
  contactSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginRight: 10,
  },
  contactInfo: {
    fontSize: 16,
    color: "#0095b6",
  },
});

export default Contact;
