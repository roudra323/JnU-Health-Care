import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import Recorder from "../Components/Recorder/Recorder";
import Expand from "../Components/Recorder/Expand";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Wave from "../../assets/waveHome.png";

const Home = ({ navigation }) => {
  const [isListExpanded, setIsListExpanded] = useState(false);
  const toggleList = () => {
    setIsListExpanded(!isListExpanded);
  };

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
          <Text style={styles.headerText}>Hi John,</Text>
          <Text style={styles.subtext}>Welcome to JnU Counseling Center</Text>

          <View style={styles.boxContainer}>
            <TouchableOpacity>
              <View style={styles.box}>
                <MaterialCommunityIcons
                  name="book-clock"
                  size={40}
                  color="black"
                />
                <Text style={styles.boxText}>Book Appointment</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.box}>
                <Fontisto name="doctor" size={40} color="black" />
                <Text style={styles.boxText}>Doctor Information</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.boxContainer}>
            <TouchableOpacity>
              <View style={styles.box}>
                <MaterialIcons name="article" size={40} color="black" />
                <Text style={styles.boxText}>Articles</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.box}>
                <Feather name="phone-forwarded" size={40} color="black" />
                <Text style={styles.boxText}>Contact Us</Text>
              </View>
            </TouchableOpacity>
          </View>
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
    fontWeight: "bold",
    color: "#333",
    paddingLeft: 20,
  },
  subtext: {
    fontSize: 18,
    color: "#555",
    marginTop: 10,
    paddingLeft: 20,
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
  },
});

export default Home;

// const Home = ({ navigation }) => {
//   const handleButtonPress = () => {
//     // Add your logic for the button press action
//     console.log("Button pressed!");
//     navigation.navigate("Form");
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.imageContainer}>
//         <Image source={doctor} style={styles.doctorImage} resizeMode="cover" />
//       </View>

//       <View style={styles.greetingContainer}>
//         <Text style={styles.greetingText}>Hi John 👋</Text>
//         <Text style={styles.subtext}>
//           Your Mental Well-being Matters.{"\n"}Book Your{" "}
//           <Text style={{ fontWeight: "bold" }}>Counseling Session</Text> Now.
//         </Text>

//         {/* Button */}
//         <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
//           <Text style={styles.buttonText}>Book Now</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//   },
//   imageContainer: {
//     alignItems: "center",
//     marginTop: 20,
//   },
//   doctorImage: {
//     width: 300,
//     height: 500,
//   },
//   greetingContainer: {
//     alignItems: "center",
//     marginTop: 20,
//   },
//   greetingText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   subtext: {
//     fontSize: 18,
//     color: "#555",
//     marginTop: 10,
//     textAlign: "center",
//   },
//   button: {
//     marginTop: 20,
//     backgroundColor: "#3498db",
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
// });

// export default Home;
