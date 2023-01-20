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
    logPatient,

    Profile,
    setProfile,
    Doctor,
    dark,
    setdark,
  } = useLogIN();



  const [availableDays, setAvailableDays] = useState([]);

  const [workingHours, setWorkingHours] = useState({
    start: "",
    end: "",
  });

  const [Loading, setLoading] = useState(false);
  const [events, setEvents] = useState<
    Array<{ start: Date; end: Date; title: any }>
    >([]);

        


  const localizer = momentLocalizer(moment);


  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const day = e.target.value;
    if (e.target.checked) {
      setAvailableDays([...availableDays, day]);


   
    } else {
      setAvailableDays(availableDays.filter(d => d !== day));
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkingHours({
      ...workingHours,
      [e.target.name]: e.target.value,
    });

    console.log("workingHours", workingHours);
  };







  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found in local storage");
      return;
    }


    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:3000/doctor/doctors/${Doctor._id}/working-hours`,
        {
          availableDays,
          startTime: workingHours.start,
          endTime: workingHours.end,
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );


      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }

  };
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
    
        const workingHoursEvents = availableDays.map(day => {
          return {
            start: moment(`${day} ${response.data.workingHours
.start}`, "dddd HH:mm").toDate(),
            end: moment(`${day} ${response.data.workingHours.end}`, "dddd HH:mm").toDate(),
            day: availableDays.indexOf(day) + 1,

           
            
            title: "Working hours",
          };
        });

        setEvents([...events, workingHoursEvents]);
         


        
   


        console.log("events", events);
      } catch (error) {
        console.log("Error while fetching working hours: ", error);
      }
    };

    getWorkingHours();


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
        const events = appointments.map(appointment => {
          return {
            start: moment(`${appointment.appointmentDate} ${appointment.appointmentTime}`, "YYYY-MM-DD HH:mm").toDate(),
            end: moment(`${appointment.appointmentDate} ${appointment.appointmentTime}`, "YYYY-MM-DD HH:mm").add(1, "hours").toDate(),
            title: `Appointment with ${appointment.patient.name.firstName} ${appointment.patient.name.LastName}`,
          };
        });



        setEvents([...events, appointments]);
      } catch (error) {
        console.log("Error while fetching appointments: ", error);
      }
    };

    getAppointments();









   }, []);

 

  const handleSelect = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt("New Event name");
    if (title)
      setEvents([
        ...events,
        {
          start,
          end,
          title,
        },
      ]);
  };

  const handleSelectEvent = (event: any) => {
    alert(event.title);
  };

  const handleDoubleClickEvent = (event: any) => {
    alert(event.title);
  };



  const handleDragStart = (event: any) => {
    alert(event.title);
  };

  const handleDragEnd = (event: any) => {
    alert(event.title);
  };










  const customSlotPropGetter = (date) => {
    if (date.getDate() === 7 || date.getDate() === 15)
      return {
        className: "bg-red-500",

      }
    else return {}
  }
  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event name')
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }])
      }
    },
    [setEvents]
  )

  return (
    <div
      className="
      flex
      flex-col
      items-center
      justify-center
      w-full
      h-full
      bg-gray-100

      "
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Available Days:</label>
          <div>
            <input
              type="checkbox"
              value="Monday"
              onChange={handleDayChange}
            />
            Monday
          </div>
          <div>
            <input
              type="checkbox"
              value="Tuesday"
              onChange={handleDayChange}
            />
            Tuesday
          </div>
          <div>
            <input
              type="checkbox"
              value="Wednesday"
              onChange={handleDayChange}
            />
            Wednesday
          </div>
          <div>
            <input
              type="checkbox"
              value="Thursday"
              onChange={handleDayChange}
            />
            Thursday
          </div>
          <div>
            <input
              type="checkbox"
              value="Friday"
              onChange={handleDayChange}
            />
            Friday
          </div>
          <div>
            <input
              type="checkbox"
              value="Saturday"
              onChange={handleDayChange}
            />
            Saturday
          </div>
          <div>
            <input
              type="checkbox"
              value="Sunday"
              onChange={handleDayChange}
            />
            Sunday
          </div>
        </div>
        <div className="form-group">
          <label>Start Time:</label>
          <input
            type="time"
            name="start"
            onChange={handleTimeChange}
            value={workingHours.start}
          />
        </div>
        <div className="form-group">
          <label>End Time:</label>
          <input
            type="time"
            name="end"
            onChange={handleTimeChange}
            value={workingHours.end}
          />
        </div>
        <button type="submit">Save</button>
      </form>

      <div
        className="
      calendar-container 
      "
      >
        <Calendar
          localizer={localizer}
          events={[
            
            

            ...events,

            
          
        
          ]}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          popup
        
          slotPropGetter={customSlotPropGetter}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          onDoubleClickEvent={handleDoubleClickEvent}
       
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          defaultView={Views.WEEK}

          
        />
      </div>
    </div>
  );
};


export default MyCalendar;
