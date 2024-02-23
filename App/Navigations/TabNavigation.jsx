import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Appointment, Profile } from "../Screens";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const TabNavigation = ({ navigation, route }) => {
  const { stuData } = route.params;
  console.log("TabNavigation", stuData);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingTop: 7,
          borderBlockColor: "#000",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderLeftWidth: 0.7,
          borderRightWidth: 0.7,
          borderTopWidth: 0.7,
          position: "absolute",
          overflow: "hidden",
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="হোম"
        children={() => <Home stuData={stuData} />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="অ্যাপয়েন্টমেন্ট"
        component={Appointment}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="stethoscope" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="প্রোফাইল"
        children={() => <Profile stuData={stuData} />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
