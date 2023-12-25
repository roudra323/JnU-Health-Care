import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import DoctorCard from "../Components/DoctorCard";
import Recorder from "../Components/Recorder/Recorder";
import Expand from "../Components/Recorder/Expand";
import { FontAwesome5 } from "@expo/vector-icons";
import Wave from "../../assets/waveHome.png";
const Appointment = ({ navigation }) => {
  const [isListExpanded, setIsListExpanded] = useState(false);
  const toggleList = () => {
    setIsListExpanded(!isListExpanded);
  };
  const dummyDoctorData = [
    {
      id: 1,
      doctorInfo: "Dr. Smith",
      subText: "December 10, 2023",
      doctorImage: require("../../assets/doctor.jpg"),
    },
    {
      id: 2,
      doctorInfo: "Dr. Johnson",
      subText: "December 15, 2023",
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
          <Recorder toggleList={toggleList} />
        </View>
      </ImageBackground>
      {isListExpanded && <Expand />}
      <View style={{ marginBottom: 50 }}>
        <Text style={styles.subtext}>আসন্ন অ্যাপয়েন্টমেন্ট</Text>

        {/* Map through the dummy doctor data and render DoctorCard components */}
        {dummyDoctorData.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctorInfo={doctor.doctorInfo}
            subText={doctor.subText}
            doctorImage={doctor.doctorImage}
          />
        ))}
      </View>
      <View style={{ marginBottom: 50 }}>
        <Text style={styles.subtext}>সম্পন্ন অ্যাপয়েন্টমেন্ট</Text>

        {/* Map through the dummy doctor data and render DoctorCard components */}
        {dummyDoctorData.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctorInfo={doctor.doctorInfo}
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
  subtext: {
    fontSize: 20,
    color: "#555",
    marginTop: 10,
    paddingLeft: 20,
    fontFamily: "HindiSiliBold",
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
});

export default Appointment;
