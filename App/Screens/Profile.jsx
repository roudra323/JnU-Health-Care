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
import * as ImagePicker from "expo-image-picker";
import client from "../api/client";
import { useGlobalContext } from "../context";
import TestImg from "../../assets/wave1.jpg";
import Recorder from "../Components/Recorder/Recorder";
import Expand from "../Components/Recorder/Expand";
import Icon from "react-native-vector-icons/FontAwesome";

const Profile = () => {
  const { user, setUser, setAlert } = useGlobalContext();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
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
    password: "পাসওয়ার্ড",
    presentAddress: "বর্তমান ঠিকানা",
    dob: "জন্ম তারিখ",
    profilePicture: "Profile Picture",
  };

  const openEditModal = (field) => {
    setEditedField(field);
    setEditedValue(user.user[field]);
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

      console.log("Edited field:", editedField);
      console.log("Edited value:", editedValue);
      console.log("User ID:", user.user?._id);

      // Make the PUT request to update the user data
      const request = await client.post(
        `/profile//updateProfile/${user.user?._id}`,
        {
          [editedField]: editedValue,
        }
      );

      console.log("Request:", request.data.message);
      setAlert({
        on: true,
        type: "success",
        message: `${editedField} changed Successfully`,
      });

      // Update the local state with the edited value
      setUser((prevUserData) => ({
        ...prevUserData,
        user: {
          ...prevUserData.user,
          [editedField]: editedValue,
        },
      }));
      setUser(user);

      // console.log("Updated profile successfully", user);

      closeEditModal();
    } catch (error) {
      setAlert({
        on: true,
        type: "error",
        message: `Error updating profile`,
      });
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
  const changePass = async () => {
    try {
      if (!oldPassword || !newPassword) {
        alert("Please fill all the fields");
        return;
      }
      const request = await client.post(
        `/profile/updatePassword/${user.user?._id}`,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        }
      );
      setAlert({
        on: true,
        type: "success",
        message: `Password changed Successfully`,
      });
      closeEditModal();
    } catch (error) {
      setAlert({
        on: true,
        type: "error",
        message: `${error}`,
      });
      console.error("Error updating profile:", error);
    }
  };

  const updateProfilePicture = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });

      if (!result.canceled) {
        const data = new FormData();
        data.append("profilePicture", {
          name: "profilePicture.jpg",
          type: "image/jpeg",
          uri: result.assets[0].uri, // Access the URI of the first image
        });
        console.log("Result:", result);
        console.log("URI:", result.assets[0].uri);

        const res = await client.post(
          `/profile/changeProfilePicture/${user.user?._id}`,
          data,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setAlert({
          on: true,
          type: "success",
          message: `Profile Picture changed Successfully`,
        });

        setUser((prevUserData) => ({
          ...prevUserData,
          user: {
            ...prevUserData.user,
            profilePicture: res.data.req,
          },
        }));
        setUser(user);
      }
    } catch (error) {
      setAlert({
        on: true,
        type: "error",
        message: `An error occurred while updating the profile picture`,
      });
      console.error(
        "An error occurred while updating the profile picture:",
        error
      );
    }
  };

  useEffect(() => {
    const res = user;
    console.log("Profile data", res);
    setUser(res);
  }, [user]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.view}>
        <ImageBackground source={TestImg} style={styles.image}>
          <View style={styles.profileHeader}>
            <TouchableOpacity
              style={styles.profileImageContainer}
              onPress={updateProfilePicture}
            >
              <Image
                source={{
                  uri: `http://192.168.0.106:3000/image/${user.user?.profilePicture}`,
                }}
                style={styles.profileImage}
              />

              <View style={styles.penBOX}>
                <Icon
                  name="pencil"
                  size={15}
                  color="black"
                  style={styles.penIcon}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.profileName}>{user.user?.name}</Text>
            <Recorder toggleList={toggleList} />
          </View>
        </ImageBackground>

        {isListExpanded && <Expand />}

        <View style={styles.fieldContainer}>
          {user.user &&
            Object.entries(user.user)
              .filter(
                ([field]) =>
                  field !== "__v" &&
                  field !== "_id" &&
                  field !== "profilePicture" &&
                  field !== "verified"
              )
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
                        color="black"
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
            {editedField === "password" ? (
              <>
                <TextInput
                  style={styles.modalInput}
                  value={oldPassword}
                  onChangeText={(text) => setOldPassword(text)}
                  placeholder="Old Password"
                />
                <TextInput
                  style={styles.modalInput}
                  value={newPassword}
                  onChangeText={(text) => setNewPassword(text)}
                  placeholder="New Password"
                />
              </>
            ) : (
              <TextInput
                style={styles.modalInput}
                value={editedValue}
                onChangeText={(text) => setEditedValue(text)}
              />
            )}
            <View style={styles.buttonContainer}>
              {editedField === "password" ? (
                <>
                  <Button title="Save" onPress={changePass} />
                  <Button
                    color={"red"}
                    title="Cancel"
                    onPress={closeEditModal}
                  />
                </>
              ) : (
                <>
                  <Button title="Save" onPress={saveEditedValue} />
                  <Button
                    color={"red"}
                    title="Cancel"
                    onPress={closeEditModal}
                  />
                </>
              )}
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
  profileImageContainer: {
    position: "relative",
  },
  penIcon: {
    position: "absolute",
    right: 2,
    bottom: 0,
  },
  penBOX: {
    position: "absolute",
    right: 9,
    bottom: 5,
    width: 20, // Set a fixed width
    height: 20, // Set a fixed height
    borderColor: "#fff",
    borderWidth: 2,
    backgroundColor: "#fff",
    borderRadius: 12.5, // Half of width/height
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
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
    marginTop: 100,
    marginBottom: 200,
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
