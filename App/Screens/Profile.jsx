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
} from "react-native";
// import { MaterialIcons, Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { MaterialIcons } from "@expo/vector-icons";

// Dummy user data
const dummyUserData = {
  name: "John Doe",
  phone: "123-456-7890",
  presentAddress: "123 Main St, City",
  dept: "Computer Science",
  batch: "2022",
  bloodGroup: "O+",
  email: "john.doe@example.com",
  password: "********",
};

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(dummyUserData);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editedField, setEditedField] = useState("");
  const [editedValue, setEditedValue] = useState("");

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

  useEffect(() => {
    // You can fetch user data from an API or database here
    // For demonstration purposes, we're using dummy data
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        {/* <Image
          source={require("../../assets/profile-picture.jpg")}
          style={styles.profileImage}
        /> */}
        <MaterialIcons
          name="face"
          size={100}
          color="black"
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{userData.name}</Text>
      </View>

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
          <Button title="Save" onPress={saveEditedValue} />
          <Button title="Cancel" onPress={closeEditModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  fieldContainer: {
    marginBottom: 20,
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
  },
  fieldValue: {
    fontSize: 14,
    color: "#666",
  },
  modalContainer: {
    flex: 1,
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
  },
});
export default Profile;
