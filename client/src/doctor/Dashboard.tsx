import axios from "axios";

import { useEffect, useState } from "react";
import moment from "moment-timezone";
import MyCalendar from "./MyCalendar";
import { useLogIN } from "../../ContextLog";
const Dashboard = () => {
  const {
    Profile,

    Doctor,

    dark,
    setdark,
  } = useLogIN();



  const phrases0 = [
    "I hope you're having a great day, there are",
    "Starting off the day with a positive attitude, you have",
    "Here's to a productive day, you have",
    "Ready for a busy day ahead, you have",
    "It's going to be a great day, with",
    "Let's make today count, with",
    "Let's get to work, you have",
    "Time to tackle the day, with",
    "Bringing our A-game, with",
    "Let's knock it out of the park, you have",
    "Let's make the most of today, with",
    "Time to shine, with",
    "Bringing our best selves, with",
    "Ready for action, you have",
    "Let's make it a good one, with",
    "Let's make today count, with",
    "Let's get things done, you have",
    "Bringing our best foot forward, with",
    "Bringing our best selves, with",
    "Bringing our A-game, with",
    "Let's knock it out of the park, you have",
    "Let's make the most of today, with",
    "Time to shine, with",
    ,
    "Ready for action, you have",
    "Let's make it a good one, with",
    "Let's make today count, with",
    "Let's get things done, you have",
    "Bringing our best foot forward, with",
  ];
  let phraseIndex = 0;
  const [phrase, setPhrase] = useState(phrases0[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhrase(phrases0[phraseIndex]);
      phraseIndex++;
      if (phraseIndex === phrases0.length) phraseIndex = 0;
    }, 36000);
    return () => clearInterval(interval);
  }, []);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const date = new Date();

    const hour = date.getHours();

    if (hour >= 0 && hour < 12) {
      setMessage("Good Morning");
    } else if (hour >= 12 && hour < 17) {
      setMessage("Good Afternoon");
    } else if (hour >= 17 && hour < 24) {
      setMessage("Good Evening");
    }
  }, []);
  const [nextAppointment, setNextAppointment] = useState({});

  const getNextAppointment = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/doctor/appointments/${Doctor._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const appointments = response.data.appointments;

   
      
      // Sort appointments by date and time
      appointments.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
        return 0;
      });
      console.log('====================================');
      console.log(
        "appointments.sort((a, b) => {",
        appointments
        
      );
      console.log('====================================');


      // Get next appointment
      const nextAppointment = appointments.find((appointment) => {
        const date = new Date(appointment.date);
        const now = new Date();
        return date > now;
      });
      // Set next appointment
      setNextAppointment(nextAppointment);



    
      


      
      
     

      // Display next appointment to the doctor
      console.log("Next appointment: ",
        nextAppointment

      );
    } catch (error) {
      console.log("Error while fetching next appointment: ", error);
    }
  };

  useEffect(() => {
    getNextAppointment();
  }, []);




  return (
    <div
      style={{
        backgroundColor: dark ? "#000" : "#fff",
        color: dark ? "#fff" : "#000",
      }}

    >
      <div

        className="
        p-10
  
  mx-20
  
        "
      >
        <div
          className="flex
      flex-col
      my-10



      "
        >
          <h1 className="text-2xl font-bold">
            {message} ,
            <span
              className="text-cyan-300
            font-bold
          
            ml-1
            "
            >
              Dr.{Doctor && Doctor.name.firstName}
            </span>
          </h1>
          <h1
            className="text-lg text-gray-400
        "
          >
            {phrase}, 
            <span
              className="text-blue-500
    font-bold 
    ml-1
    "
            >
              {Doctor && Doctor.appointments && Doctor.appointments.length}
            </span>
            appointments today
          </h1>
        </div>
        <div className="grid grid-cols-3
        gap-9
        ">
          <div className="col-span-2
          
          ">
            <MyCalendar />
          </div>
          <div className="col-span-1">{/* Appointments */}
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">Appointments</h1>
            </div>
            {
              //nextAppointment
            }
            <div>
              <p>Next Appointment:</p>
              <ul>
                <li>
                  <p>
                    {
                      // Display next appointment to the doctor
                    }
                    {nextAppointment && nextAppointment.patient && (
                      <span>
                        {nextAppointment.patient.name.firstName}{" "}
                        {nextAppointment.patient.name.lastName}
                      </span>
                    )}

                  </p>
                </li>

               
              </ul>
            </div>
  






            







          
          </div>
          </div>
            

                  
             

               

                  


              

              

      
                      


                      

                  


                        



                      



                        




      </div>

    </div>
  );
};

export default Dashboard;
