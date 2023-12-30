import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Login, Registration, Form } from "./App/Screens/index";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import TabNavigation from "./App/Navigations/TabNavigation";
import Articles from "./App/Screens/Articles";
import DoctorsScreen from "./App/Screens/Doctors";
import Contact from "./App/Screens/Contact";
import { GlobalProvider } from "./App/context";
import AppointmentDetails from "./App/Screens/AppointmentDetails";
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    RMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    HindiSili: require("./assets/fonts/HindSiliguri-Regular.ttf"),
    HindiSiliBold: require("./assets/fonts/HindSiliguri-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.preventAutoHideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    console.log("Not Loaded");
    return null;
  }

  return (
    <GlobalProvider>
      <NavigationContainer onLayout={onLayoutRootView}>
        <StatusBar hidden />
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTitle: "",
              headerStyle: { backgroundColor: "#fff" },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="Regi"
            component={Registration}
            options={{
              headerTitle: "Back to Login",
              headerStyle: { backgroundColor: "#fff" },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="Tab"
            component={TabNavigation}
            options={{
              headerStyle: { backgroundColor: "#fff" },
              headerShadowVisible: false,
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Form"
            component={Form}
            options={{
              headerStyle: { backgroundColor: "#fff" },
              headerShadowVisible: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Article"
            component={Articles}
            options={{
              headerStyle: { backgroundColor: "#fff" },
              headerShadowVisible: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DoctorList"
            component={DoctorsScreen}
            options={{
              headerStyle: { backgroundColor: "#fff" },
              headerShadowVisible: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Contact"
            component={Contact}
            options={{
              headerStyle: { backgroundColor: "#fff" },
              headerShadowVisible: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AppointmentDetails"
            component={AppointmentDetails}
            options={{
              headerStyle: { backgroundColor: "#fff" },
              headerShadowVisible: false,
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
