// DoctorCard.js

import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const DoctorCard = ({ doctorInfo, subText, doctorImage }) => {
  return (
    <View style={styles.container}>
      <Image source={doctorImage} style={styles.doctorImage} />
      <View style={styles.textContainer}>
        <Text style={styles.doctorName}>{doctorInfo}</Text>
        <Text style={styles.subText}>{subText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    marginTop: 20,
    marginEnd: 20,
    marginStart: 20,
    borderTopEndRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 15,
    paddingHorizontal: 20,
    height: 100,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  subText: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
});

export default DoctorCard;
