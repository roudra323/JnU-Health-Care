import React, { createContext, useContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //set type to success or error
  //set message to display
  const [alert, setAlert] = useState({ on: false, type: "", message: "" });
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
      }}
    >
      {console.log("Loaded")}
      {console.log("From context", user)}
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
