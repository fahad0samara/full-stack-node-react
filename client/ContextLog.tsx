import React, {useContext, useState, createContext} from "react";

import axios from "axios";
import Loder from "./src/tools/Loder";


const ContextLog = createContext(
  {} as {
    logPatient: boolean;
    setlogPatient: React.Dispatch<React.SetStateAction<boolean>>;
    logAdmin: boolean;
    setlogAdmin: React.Dispatch<React.SetStateAction<boolean>>;
    Profile: any;
    setProfile: React.Dispatch<React.SetStateAction<any>>;
    Loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    dark: boolean;
    setdark: React.Dispatch<React.SetStateAction<boolean>>;
    logDr: boolean;
    setlogDr: React.Dispatch<React.SetStateAction<boolean>>;
  }
);
const LogCheck = ({children}: any) => {
  const [logPatient, setlogPatient] = useState(false);
  const [logAdmin, setlogAdmin] = useState(false);
  const [logDr, setlogDr] = useState(false);

  const [Profile, setProfile] = useState();
  const [Loading, setLoading] = useState(false);
  const [dark, setdark] = useState(
    localStorage.getItem("dark") === "true" ? true : false
  );

  // const checkLog = async () => {
  //   setLoading(true);

  //   if (!navigator.onLine) {
  //     window.alert("No internet connection");
  //     setLoading(false);
  //     return;
  //   }
  //   const tokenPatient = localStorage.getItem("tokenPatient");
  //   if (tokenPatient !== null) {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:3000/user/userpatients",
  //         {
  //           headers: {
  //             Authorization: `JWT ${tokenPatient}`,
  //           },
  //         }
  //       );
  //       console.log(response.data.user);

  //       // check for admin
  //       if (response.data.success && response.data.user.user.role === "admin") {
  //         setLoading(false);
  //         setlogAdmin(true);
  //         setProfile(response.data.user);
  //       } else if (
  //         response.data.success &&
  //         response.data.user.user.role === "Basic"
  //       ) {
  //         setLoading(false);
  //         setlogPatient(true);
  //         setProfile(response.data.user);
  //       } else {
  //         setProfile(null);
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     setLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   checkLog();
  // }, []);

  //   const checkLog = async () => {
  //     setLoading(true);
  //     const token = await AsyncStorage.getItem("token");
  //     if (token !== null) {
  //       try {
  //         const response = await axios.get(
  //           "https://firstauth.azurewebsites.net/auth/profile",
  //           {
  //             headers: {
  //               Authorization: `JWT ${token}`,
  //             },
  //           }
  //         );
  //         if (response.data.success) {
  //           setLoading(false);
  //           setLog(true);
  //           setProfile(response.data.mango);
  //         } else {
  //           setProfile({});
  //           setLoading(false);
  //         }
  //       } catch (error) {
  //         console.log(error);
  //         console.log(error.response);
  //         setLog(false);
  //         setLoading(false);
  //       }
  //     } else {
  //       setLoading(false);
  //     }
  //   };

  //   React.useEffect(() => {
  //     checkLog();
  //   }, []);

  return (
    <ContextLog.Provider
      value={{
        logDr,
        setlogDr,
        logPatient,
        setlogPatient,
        logAdmin,
        setlogAdmin,
        Profile,
        setProfile,
        Loading,
        setLoading,
        dark,
        setdark,
      }}
    >
      {Loading ? <Loder /> : children}
    </ContextLog.Provider>
  );
};

export const useLogIN = () => useContext(ContextLog);

export default LogCheck;
