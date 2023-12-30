import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import DoctorCard from "../Components/DoctorCard";
import Recorder from "../Components/Recorder/Recorder";
import Expand from "../Components/Recorder/Expand";
import { FontAwesome5 } from "@expo/vector-icons";
import Wave from "../../assets/waveHome.png";
import client from "../api/client";

const Appointment = ({ navigation }) => {
  // console.log("Appointment data", updateD);
  const { user, appointmentArr, setAppointmentArr, data } = useGlobalContext();
  const stuID = user.user._id;
  // const [update, setUpdate] = useState(false);

  const [isListExpanded, setIsListExpanded] = useState(false);
  const toggleList = () => {
    setIsListExpanded(!isListExpanded);
  };

  const pendingAppointments = appointmentArr
    ? appointmentArr.filter((appointment) => appointment.status === "pending")
    : [];

  const completedAppointments = appointmentArr
    ? appointmentArr.filter((appointment) => appointment.status === "completed")
    : [];

  console.log(appointmentArr);

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

        {/* Map through the pending appointments and render DoctorCard components */}
        {pendingAppointments.map((appointment) => (
          <TouchableOpacity
            key={appointment._id}
            onPress={() =>
              navigation.navigate("AppointmentDetails", {
                appointmentDetails: appointment,
                isDlt: true,
              })
            }
          >
            <DoctorCard
              key={appointment._id}
              doctorInfo={appointment.counselingType.join(" / ")}
              subText={appointment.counselingDay.join(" / ")}
              doctorImage={require("../../assets/doctor.jpg")}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ marginBottom: 50 }}>
        <Text style={styles.subtext}>সম্পন্ন অ্যাপয়েন্টমেন্ট</Text>

        {/* Map through the completed appointments and render DoctorCard components */}
        {completedAppointments.map((appointment) => (
          <TouchableOpacity
            key={appointment._id}
            onPress={() =>
              navigation.navigate("AppointmentDetails", {
                appointmentDetails: appointment,
                isDlt: false,
              })
            }
          >
            <DoctorCard
              key={appointment._id}
              doctorInfo={appointment.counselingType.join(" / ")}
              subText={appointment.counselingDay.join(" / ")}
              doctorImage={require("../../assets/doctor.jpg")}
            />
          </TouchableOpacity>
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
