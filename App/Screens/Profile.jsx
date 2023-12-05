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

import TestImg from "../../assets/wave1.jpg";
import DP from "../../assets/dp.png";
import Recorder from "../Components/Recorder/Recorder";
import Expand from "../Components/Recorder/Expand";

// Dummy user data
const dummyUserData = {
  name: "Roudra",
  phone: "123-456-7890",
  presentAddress: "123 Main St, City",
  dept: "Computer Science",
  batch: "20223",
  bloodGroup: "O+",
  email: "john.doe@example.com",
  password: "********",
};

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(dummyUserData);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editedField, setEditedField] = useState("");
  const [editedValue, setEditedValue] = useState("");
  const [isListExpanded, setIsListExpanded] = useState(false);

  const openEditModal = (field) => {
    setEditedField(field);
    setEditedValue(userData[field]);
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
    setEditedField("");
    setEditedValue("");
  };

  const saveEditedValue = () => {
    // Save the edited value to the user data
    setUserData((prevUserData) => ({
      ...prevUserData,
      [editedField]: editedValue,
    }));
    closeEditModal();
  };

  const toggleList = () => {
    setIsListExpanded(!isListExpanded);
  };

  useEffect(() => {
    // You can fetch user data from an API or database here
    // For demonstration purposes, we're using dummy data
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View>
        <ImageBackground source={TestImg} style={styles.image}>
          <View style={styles.profileHeader}>
            <Image source={DP} style={styles.profileImage} />
            <Text style={styles.profileName}>{userData.name}</Text>

            <Recorder toggleList={toggleList} />
          </View>
        </ImageBackground>

        {isListExpanded && <Expand />}
        {/* Add conditional rendering for the expanded list */}
        <View style={styles.fieldContainer}>
          {Object.keys(userData).map((field) => (
            <TouchableOpacity key={field} onPress={() => openEditModal(field)}>
              <View style={styles.fieldItem}>
                <Text style={styles.fieldLabel}>{field}</Text>
                <Text style={styles.fieldValue}>{userData[field]}</Text>
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
  profileHeader: {
    alignItems: "center",
    marginBottom: 10,
    flexDirection: "row", // Add this line to align items horizontally
    justifyContent: "space-between", // Add this line to push items to the right
  },
  iconContainer: {
    position: "absolute",
    top: 5, // Adjust the top value as needed
    right: 10, // Adjust the right value as needed
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#fff",
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
  expandedList: {
    position: "absolute",
    top: 70,
    right: 10,
    width: 200,
    height: 235,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    zIndex: 999,
  },

  expandedListContent: {
    justifyContent: "center", // Align items horizontally in the center
    alignItems: "center", // Align items vertically in the center
  },

  expandedListItem: {
    fontSize: 16,
    paddingVertical: 10,
  },
});
export default Profile;
