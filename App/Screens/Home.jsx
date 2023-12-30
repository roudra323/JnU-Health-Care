import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";
import Recorder from "../Components/Recorder/Recorder";
import Expand from "../Components/Recorder/Expand";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Wave from "../../assets/waveHome.png";
import DoctorCard from "../Components/DoctorCard";
import { useNavigation } from "@react-navigation/native";
import { useGlobalContext } from "../context";
import client from "../api/client";

const Home = ({ stuData }) => {
  const { user, appointmentArr, setAppointmentArr, data } = useGlobalContext();
  const stuID = user.user._id;
  const navigation = useNavigation();
  console.log("Home data", stuData);
  const [isListExpanded, setIsListExpanded] = useState(false);
  const toggleList = () => {
    setIsListExpanded(!isListExpanded);
  };

  const fetchAppointment = async () => {
    // console.log("Appointment data", stuID);
    await client
      .get(`/appointment/${stuID}`)
      .then((res) => {
        console.log("Appointment data", res.data);
        setAppointmentArr(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAppointment();
  }, [data]);

  const pendingAppointments = appointmentArr
    ? appointmentArr.filter((appointment) => appointment.status === "pending")
    : [];

  return (
    <ScrollView style={styles.container}>
      <View>
        <ImageBackground source={Wave} style={styles.image}>
          <View style={styles.header}>
            <Recorder toggleList={toggleList} />
          </View>
        </ImageBackground>
        {isListExpanded && <Expand />}
        <View style={{ paddingTop: 20 }}>
          <Text style={styles.headerText}>শুভ সকাল☀️</Text>
          <Text style={styles.subtext}>
            জবি কাউন্সিলিং সেন্টার এ আপনাকে স্বাগতম
          </Text>

          <View style={styles.boxContainer}>
            <View
              style={styles.box}
              onStartShouldSetResponder={() =>
                navigation.navigate("Form", { stuData: stuID })
              }
            >
              <MaterialCommunityIcons
                name="book-clock"
                size={40}
                color="black"
              />
              <Text style={styles.boxText}>এপয়েন্টমেন্ট বুক</Text>
            </View>

            <View
              style={styles.box}
              onStartShouldSetResponder={() =>
                navigation.navigate("DoctorList")
              }
            >
              <Fontisto name="doctor" size={40} color="black" />
              <Text style={styles.boxText}>বিশেষজ্ঞদের তথ্য</Text>
            </View>
          </View>

          <View style={styles.boxContainer}>
            <View
              style={styles.box}
              onStartShouldSetResponder={() => navigation.navigate("Article")}
            >
              <MaterialIcons name="article" size={40} color="black" />
              <Text style={styles.boxText}>আর্টিকেলস</Text>
            </View>

            <View
              style={styles.box}
              onStartShouldSetResponder={() => navigation.navigate("Contact")}
            >
              <Feather name="phone-forwarded" size={40} color="black" />
              <Text style={styles.boxText}>যোগাযোগ</Text>
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 50 }}>
          <Text style={styles.subtext}>আসন্ন অ্যাপয়েন্টমেন্ট</Text>

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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    alignItems: "center",
    marginBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  headerText: {
    marginTop: 10,
    fontSize: 40,
    color: "#333",
    paddingLeft: 20,
    fontFamily: "HindiSiliBold",
  },
  subtext: {
    fontSize: 20,
    color: "#555",
    marginTop: 10,
    paddingLeft: 20,
    fontFamily: "HindiSiliBold",
  },

  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  box: {
    width: "45%",
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5, // Add elevation for shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  boxText: {
    paddingTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "HindiSili",
  },
});

export default Home;
