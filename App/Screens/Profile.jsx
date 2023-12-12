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

const Profile = ({ id }) => {
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
    batch: "Batch",
    bloodGroup: "Blood Group",
    date: "Registration Date",
    dept: "Department",
    email: "Email",
    name: "Full Name",
    phone: "Phone Number",
    password: "Password",
    presentAddress: "Present Address",
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the GET request to fetch user data
        const res = await client.get(`/profile/${id}`);
        setUserData(res.data);
        img = res.data.user.profilePicture;
        f = `http://192.168.0.123:3000/image/` + img;
        console.log(img);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.view}>
        <ImageBackground source={TestImg} style={styles.image}>
          <View style={styles.profileHeader}>
            <Image source={DP} style={styles.profileImage} />
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
                      {field === "date" ? formatRegistrationDate(value) : value}
                    </Text>
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
    fontWeight: "bold",
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
    fontWeight: "bold",
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalInput: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
  },
});

export default Profile;
