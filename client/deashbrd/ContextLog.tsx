import React, {useContext, useState, createContext} from "react";

import axios from "axios";

const ContextLog = createContext(
  {} as {
    logPatient: boolean;
    setlogPatient: React.Dispatch<React.SetStateAction<boolean>>;
    logAdmin: boolean;
    setlogAdmin: React.Dispatch<React.SetStateAction<boolean>>;
    Profile: any;
    setProfile: React.Dispatch<React.SetStateAction<any>>;
    loading: boolean;
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
  const [loading, setLoading] = useState(false);
  const [dark, setdark] = useState(
    localStorage.getItem("dark") === "true" ? true : false
  );
  

  const APPloader = () => {
    return (
      <div
      
        role="status" className=" absolute 
      top-0 left-0 w-full h-full flex items-center justify-center  bg-opacity-50 z-50

      ">
        <svg
          aria-hidden="true"
          className="mr-2 w-8 h-8 text-gray-400 animate-spin  fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="
        text-gray-200 text-xl font-semibold
        ">Loading...</span>
      </div>
    );
  };


  const checkLog = async () => {
    setLoading(true);

      if (!navigator.onLine) {
        window.alert("No internet connection");
        setLoading(false);
        return;

    }
     const tokenPatient = localStorage.getItem("tokenPatient");
     if (tokenPatient !== null) {
       try {
         const response = await axios.get(
           "http://localhost:3000/user/userpatients",
           {
             headers: {
               Authorization: `JWT ${tokenPatient}`,
             },
           }
         );
         console.log(response.data.user);
         
         // check for admin
         if (
           response.data.success &&
           response.data.user.user.role === "admin"
         ) {
           setLoading(false);
           setlogAdmin(true);
           setProfile(response.data.user);
         } else if (
           response.data.success &&
           response.data.user.user.role === "Basic"
         ) {
           setLoading(false);
           setlogPatient(true);
           setProfile(response.data.user);
         } else {
           setProfile(null);
           setLoading(false);
         }
       } catch (error) {
         console.log(error);
       }
     } else {
       setLoading(false);
     }
  };


       
     


    






   



      React.useEffect(() => {
        checkLog();
      }, [])
    
      
      
     

        

    
      
          
   
        
   

  

    
  


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
        loading,
        setLoading,
        dark,
        setdark,


      }}
    >
      {loading ? <APPloader /> : children}
    </ContextLog.Provider>
  );
};

export const useLogIN = () => useContext(ContextLog);

export default LogCheck;
