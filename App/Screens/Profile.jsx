import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  ImageBackground,
  ScrollView,
} from "react-native";
import client from "../api/client";
import TestImg from "../../assets/wave1.jpg";
import DP from "../../assets/dp.png";
import Recorder from "../Components/Recorder/Recorder";
import Expand from "../Components/Recorder/Expand";
import Icon from "react-native-vector-icons/FontAwesome";

const Profile = ({ stuData }) => {
  let img;
  let f;
  const [userData, setUserData] = useState({});
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editedField, setEditedField] = useState("");
  const [editedValue, setEditedValue] = useState("");
  const [isListExpanded, setIsListExpanded] = useState(false);

  const editableFields = [
    "phone",
    "profilePicture",
    "password",
    "presentAddress",
  ];

  const customFieldNames = {
    batch: "ব্যাচ",
    bloodGroup: "রক্তের গ্রুপ",
    date: "যোগদানের তারিখ",
    dept: "বিভাগ",
    email: "ই-মেইল",
    name: "নাম",
    phone: "মোবাইল নং",
    password: "Password",
    presentAddress: "বর্তমান ঠিকানা",
    profilePicture: "Profile Picture",
  };

  const openEditModal = (field) => {
    setEditedField(field);
    setEditedValue(userData.user[field]);
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
    setEditedField("");
    setEditedValue("");
  };

  const saveEditedValue = async () => {
    try {
      // Only allow editing for specific fields
      if (!editableFields.includes(editedField)) {
        closeEditModal();
        return;
      }

      // Make the PUT request to update the user data
      await client.put(`/profile/${id}`, {
        [editedField]: editedValue,
      });

      // Update the local state with the edited value
      setUserData((prevUserData) => ({
        ...prevUserData,
        user: {
          ...prevUserData.user,
          [editedField]: editedValue,
        },
      }));

      closeEditModal();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const toggleList = () => {
    setIsListExpanded(!isListExpanded);
  };

  const formatRegistrationDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const checkField = (field, value) => {
    if (field === "password") {
      return "********";
    } else if (field === "date") {
      return formatRegistrationDate(value);
    } else {
      return value;
    }
  };

  useEffect(() => {
    const res = stuData;
    console.log("Profile data", res);
    setUserData(res);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.view}>
        <ImageBackground source={TestImg} style={styles.image}>
          <View style={styles.profileHeader}>
            <Image
              source={{
                uri:
                  "http://192.168.0.106:3000/image/" +
                  userData.user?.profilePicture,
              }}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{userData.user?.name}</Text>
            <Recorder toggleList={toggleList} />
          </View>
        </ImageBackground>

        {isListExpanded && <Expand />}

        <View style={styles.fieldContainer}>
          {userData.user &&
            Object.entries(userData.user)
              .filter(([field]) => field !== "__v" && field !== "_id")
              .map(([field, value]) => (
                <TouchableOpacity
                  key={field}
                  onPress={() =>
                    editableFields.includes(field) && openEditModal(field)
                  }
                >
                  <View style={styles.fieldItem}>
                    <Text style={styles.fieldLabel}>
                      {customFieldNames[field]}
                    </Text>
                    <Text style={styles.fieldValue}>
                      {checkField(field, value)}
                    </Text>
                    {editableFields.includes(field) && (
                      <Icon
                        name="pencil"
                        size={15}
                        color="#000"
                        style={styles.iconStyle}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
        </View>

        {/* Edit Modal */}
        <Modal
          visible={isEditModalVisible}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.modalInput}
              value={editedValue}
              onChangeText={(text) => setEditedValue(text)}
            />
            <View style={styles.buttonContainer}>
              <Button title="Save" onPress={saveEditedValue} />
              <Button title="Cancel" onPress={closeEditModal} />
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  view: {
    marginBottom: 100,
  },

  iconStyle: {
    position: "absolute",
    right: 0,
    // Adjust these as needed
    top: "90%",
    transform: [{ translateY: -15 }], // Half the icon size
  },

  profileHeader: {
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 50,
    borderColor: "rgb(44,84,196)",
    borderWidth: 2,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  profileName: {
    fontSize: 20,
    fontFamily: "HindiSiliBold",
    color: "#333",
    paddingTop: 10,
  },
  fieldContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
    zIndex: -1,
  },
  fieldItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  fieldLabel: {
    fontSize: 16,
    fontFamily: "HindiSiliBold",
    color: "#333",
    paddingBottom: 1,
  },
  fieldValue: {
    fontSize: 14,
    color: "#666",
    paddingBottom: 3,
  },
  modalContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2.5,
    borderRadius: 10,
    marginHorizontal: 30,
    marginVertical: 200,
    backgroundColor: "white",
  },
  modalInput: {
    width: 300,
    height: 50,
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    width: "40%",
  },
});

export default Profile;
