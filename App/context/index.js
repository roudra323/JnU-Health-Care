import React, { createContext, useContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //set type to success or error
  //set message to display
  const [data, setData] = useState(0); // [ {type: "success", message: "Appointment created successfully"}
  const [alert, setAlert] = useState({ on: false, type: "", message: "" });
  const [appointmentArr, setAppointmentArr] = useState([]);
  console.log("Alert:", alert);

  const showAlert = (type, message) => {
    console.log("Alert:", type, message);
    if (alert.on) {
      Toast.show({
        type: type,
        text1: type === "success" ? "Success" : "Error",
        text2: message,
      });
    }
  };

  useEffect(() => {
    showAlert(alert.type, alert.message);
  }, [alert]);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        setAlert,
        setAppointmentArr,
        appointmentArr,
        data,
        setData,
      }}
    >
      {console.log("Loaded")}
      {console.log("From context Appoinrment data", data)}
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
