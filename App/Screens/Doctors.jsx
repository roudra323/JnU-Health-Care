// DoctorsScreen.js
import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ImageBackground,
} from "react-native";
import Wave from "../../assets/waveHome.png";
import { FontAwesome5 } from "@expo/vector-icons";
import DoctorCard from "../Components/DoctorCard";

const DoctorsScreen = ({ navigation }) => {
  const dummyDoctorData = [
    {
      id: 1,
      name: "Md. Rakibul Islam",
      subText: "M.Sc. 2nd Year, 1 Year Experience",
      doctorImage: require("../../assets/doctor.jpg"),
    },
    {
      id: 2,
      name: "Md. Ziku Islam",
      subText: "BSc 3rd Year, 2 Years Experience",
      doctorImage: require("../../assets/doctor.jpg"),
    },
    {
      id: 3,
      name: "Md. Tareq Islam",
      subText: "B.SC. 4th Year, 3 Years Experience",
      doctorImage: require("../../assets/doctor.jpg"),
    },
    {
      id: 4,
      name: "Md. Rashed Islam",
      subText: "M.Sc. 1st Year",
      doctorImage: require("../../assets/doctor.jpg"),
    },
  ];

  return (
    <ScrollView style={styles.container}>
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
      <Text style={styles.headerText}>বিশেষজ্ঞদের তালিকা</Text>
      <View style={styles.doctorsContainer}>
        {dummyDoctorData.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctorInfo={doctor.name}
            subText={doctor.subText}
            doctorImage={doctor.doctorImage}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  doctorsContainer: {
    paddingHorizontal: 10,
    paddingTop: 16,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  header: {
    alignItems: "center",
    marginBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
  },
  headerText: {
    fontFamily: "HindiSiliBold",
    fontSize: 30,
    paddingLeft: 15,
    marginBottom: 20,
  },
});

export default DoctorsScreen;
