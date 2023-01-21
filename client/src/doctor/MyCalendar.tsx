import React, { useState, useEffect, useCallback } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";


import moment from "moment-timezone";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import jwtDecode from "jwt-decode";
import "./Calendar.css";
import { useLogIN } from "../../ContextLog";


const MyCalendar = () => {
  const {
    Doctor,
  } = useLogIN();

  const [availableDays, setAvailableDays] = useState([]);
  const [workingHours, setWorkingHours] = useState({
    start: "",
    end: "",
  });
  const [Loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Array<{ start: Date; end: Date; title: any }>>([]);
  const [holidays, setHolidays] = useState([{
    start: new Date("2023-1-21"),
    end: new Date("2023-1-22"),
    title: "Halloween",
    notes: "This is a holiday",
    



  }]);
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    // Fetch working hours
    const getWorkingHours = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/doctor/doctors/${Doctor._id}/working-hours`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("response", response.data);
        

        const workingHoursEvents = response.data.availableDays.map(day => {
          return {
            start: moment(`${day} ${response.data.workingHours.start}`, "dddd HH:mm").toDate(),
            end: moment(`${day} ${response.data.workingHours.end}`, "dddd HH:mm").toDate(),
            day: availableDays.indexOf(day) + 1,
            title: `
            ${response.data.workingHours.start} - ${response.data.workingHours.end}`




          };
        });

        // Fetch appointments
        const getAppointments = async () => {
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
            const appointmentEvents = appointments.map(appointment => {
              return {
                start: moment(`${appointment.appointmentDate} ${appointment.appointmentTime}`, "YYYY-MM-DD HH:mm").toDate(),
                end: moment(`${appointment.appointmentDate} ${appointment.appointmentTime}`, "YYYY-MM-DD HH:mm").add(1, "hours").toDate(),
                title: `Appointment with ${appointment.patient.name.firstName} ${appointment.patient.name.LastName}`,
              };
            });

            setEvents([...workingHoursEvents, ...appointmentEvents, ...holidays]);
          } catch (error) {
            console.log("Error while fetching appointments: ", error);
          }
        };

        getAppointments();
      } catch (error) {
        console.log("Error while fetching working hours: ", error);
      }
    };

    getWorkingHours();
  }, []);

  return (
    <div
    
    >
   

      <div
        className="
    ml-32 
      
      "
      >
        <Calendar
          className="calendar-container"
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: "100vh",
          }}
          timeslots={2}
          
          eventPropGetter={(event: any) => {
            let newStyle = {
              backgroundColor: "green",
              color: "white",
              borderRadius: "0px",
              border: "0px",
              display: "block",

             
            
            };

        

            if (event.day) {
              newStyle.backgroundColor = "lightgray";
            }



         


            if (event.title.includes("Appointment")) {
              newStyle.backgroundColor = "blue";
            }

            if (event.title.includes("Halloween")) {
              newStyle.backgroundColor = "red";
            }

      


            return {
              className: "",
              style: newStyle,
            };

       
            
          }}




          onSelectSlot={(slotInfo) => {
            // Create a new appointment or holiday
            const { start, end } = slotInfo;
            const newEvent = {
              start,
              end,
              title: "New event",


      
            }
            setEvents([...events, newEvent])
          }}


        
       
          popup
     
       
       
          selectable
     

          onSelectEvent={(event: any) => {
        
            if (event.title.includes("Appointment")) {
              alert(
                `Appointment with ${event.title.split("Appointment with ")[1]}`
              );
            } else if (event.title.includes("Halloween")) {
              alert("This is a holiday");
            } else {
              alert("This is a working day");
            }

          }}
          
        />
      </div>
    </div>
  );
};


export default MyCalendar;
