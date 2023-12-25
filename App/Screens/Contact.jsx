import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  Image,
  ImageBackground,
} from "react-native";
import React, { useCallback } from "react";
import * as Linking from "expo-linking";
import { FontAwesome5 } from "@expo/vector-icons";
import jnuLogo from "../../assets/jnu-logo-png.png"; // Import the image file
import Wave from "../../assets/waveHome.png";
import { useNavigation } from "@react-navigation/native";

const Contact = () => {
  const navigation = useNavigation();
  const handlePress = useCallback(async () => {
    console.log("Calling...");
    // Open the custom settings if the app has one
    await Linking.openURL(`tel:+880 1711-111111`);
  }, []);

  const handlePressEmail = useCallback(async () => {
    console.log("Email...");
    // Open the custom settings if the app has one
    await Linking.openURL(`mailto:contact@psy.jnu.ac.bd`);
  }, []);

  return (
    <ScrollView>
      <ImageBackground source={Wave} style={styles.image}>
        <View style={styles.header}>
          <FontAwesome5
            name="arrow-left"
            size={24}
            color="black"
            style={{ paddingLeft: 20 }}
            onPress={() => navigation.goBack()}
          />
        </View>
      </ImageBackground>
      <View style={styles.container}>
        <Image source={jnuLogo} style={styles.logo} />
        <View style={styles.logoView}>
          <Text style={styles.logoText}>
            জগন্নাথ বিশ্ববিদ্যালয় {"\n"} কাউন্সেলিং সেন্টার
          </Text>
        </View>
        {/* Add the image component */}
        <Text style={styles.title}>যোগাযোগ</Text>
        <View style={styles.contactSection}>
          <Text style={styles.label}>মোবাইল নং :</Text>
          <Text style={styles.contactInfo} onPress={handlePress}>
            +880 1711-111111
          </Text>
        </View>
        <View style={styles.contactSection}>
          <Text style={styles.label}>ই-মেইল :</Text>
          <Text style={styles.contactInfo} onPress={handlePressEmail}>
            contact@psy.jnu.ac.bd
          </Text>
        </View>
        {/* Add more contact sections for additional numbers/emails if needed */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
  },
  title: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: "HindiSiliBold",
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
  logo: {
    width: 200,
    height: 400,
    marginBottom: 10,
    marginTop: -80,
    alignSelf: "center",
  },
  logoText: {
    fontSize: 25,
    marginBottom: 15,
    marginTop: -100,
    fontFamily: "HindiSiliBold",
  },
  logoView: {
    marginBottom: 10,
  },
});

export default Contact;
