// DoctorsScreen.js
import React from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import DoctorCard from "../Components/DoctorCard";

const DoctorsScreen = ({ navigation }) => {
  const dummyDoctorData = [
    {
      id: 1,
      name: "Dr. John Doe",
      subText: "Psychiatrist",
      doctorImage: require("../../assets/doctor.jpg"),
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      subText: "Cardiologist",
      doctorImage: require("../../assets/doctor.jpg"),
    },
    {
      id: 3,
      name: "Dr. Mark Johnson",
      subText: "Neurologist",
      doctorImage: require("../../assets/doctor.jpg"),
    },
    {
      id: 4,
      name: "Dr. Emily White",
      subText: "Dermatologist",
      doctorImage: require("../../assets/doctor.jpg"),
    },
    {
      id: 5,
      name: "Dr. Alex Brown",
      subText: "Pediatrician",
      doctorImage: require("../../assets/doctor.jpg"),
    },
    {
      id: 6,
      name: "Dr. Olivia Davis",
      subText: "Ophthalmologist",
      doctorImage: require("../../assets/doctor.jpg"),
    },
    {
      id: 7,
      name: "Dr. William Wilson",
      subText: "Orthopedic Surgeon",
      doctorImage: require("../../assets/doctor.jpg"),
    },
    {
      id: 8,
      name: "Dr. Sophia Miller",
      subText: "Gynecologist",
      doctorImage: require("../../assets/doctor.jpg"),
    },
    {
      id: 9,
      name: "Dr. Ethan Evans",
      subText: "Endocrinologist",
      doctorImage: require("../../assets/doctor.jpg"),
    },
    {
      id: 10,
      name: "Dr. Ava Taylor",
      subText: "Allergist",
      doctorImage: require("../../assets/doctor.jpg"),
    },
  ];

  return (
    <ScrollView style={styles.container}>
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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export default DoctorsScreen;
