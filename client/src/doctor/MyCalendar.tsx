import React, {useState, useEffect} from "react";
import {Calendar, momentLocalizer} from "react-big-calendar";

import moment from "moment";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import jwtDecode from "jwt-decode";
import "./Calendar.css";

// const MyCalendar = () => {
//   const [workingHours, setWorkingHours] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.log("Token not found in local storage");
//       return;
//     }
//     const decoded = jwtDecode(token);
//     console.log("decoded", decoded);
//     const userId = decoded.doctorId;
//     console.log("userId", userId);
//     const getWorkingHours = async () => {
//       const response = await axios.get(
//         `http://localhost:3000/doctors/${userId}/working-hours`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       console.log("response", response.data);
//       setWorkingHours(response.data);
//     };
//     getWorkingHours();
//   }, []);

//   const events = workingHours.map(workingHour => {
//     return {
//       start: moment(workingHour.startTime, "HH:mm").toDate(),
//       end: moment(workingHour.endTime, "HH:mm").toDate(),
//       title: workingHour.day,
//     };
//   });

//   return (
//     <div>
//       <Calendar
//         localizer={momentLocalizer(moment)}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//       />
//     </div>

//   );
// };

// export default MyCalendar;

const MyCalendar = () => {
  const [availableDays, setAvailableDays] = useState([]);

  const [workingHours, setWorkingHours] = useState({
    start: "",
    end: "",
  });

  const [Loading, setLoading] = useState(false);
const [events, setEvents] = useState<
  Array<{start: Date; end: Date; title: any}>
>([]);




 useEffect(() => {
   const token = localStorage.getItem("token");
   if (!token) {
     console.log("Token not found in local storage");
     return;
   }
   const decoded = jwtDecode(token);
   console.log("decoded", decoded);
   const userId = decoded.doctorId;
   console.log("userId", userId);

   const getWorkingHours = async () => {
     try {
       const response = await axios.get(
         `http://localhost:3000/doctor/doctors/${userId}/working-hours`,
         {
           headers: {
             Authorization: `Bearer ${localStorage.getItem("token")}`,
           },
         }
       );
       console.log("response", response.data);
       response.data.availableDays.forEach(day => {
         events.push({
           start: moment(
             `${day} ${response.data.workingHours.start}`,
             "dddd HH:mm"
           ).toDate(),
           end: moment(
             `${day} ${response.data.workingHours.end}`,
             "dddd HH:mm"
           ).toDate(),
           title: "Working hours",
         });
       });
       setEvents(events);
       console.log("events", events);
       
     } catch (error) {
       console.log("Error while fetching working hours: ", error);
     }
   };
   getWorkingHours();
 }, []);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found in local storage");
      return;
    }
    const decoded = jwtDecode(token);
    console.log("decoded", decoded);
    const userId = decoded.doctorId;
    console.log("userId", userId);

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:3000/doctor/doctors/${userId}/working-hours`,
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
      console.log(
        "response",
        response.data,
        availableDays,
        workingHours




      );
      
    
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }



  };





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
        <label htmlFor="availableDays">Available Days</label>
        <select
          name="availableDays"
          id="availableDays"
          value={availableDays}
          onChange={e => {
            setAvailableDays(
              Array.from(e.target.selectedOptions, option => option.value)
            );
          }}
        >
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
        </select>

        <label htmlFor="workingHoursStart">Working Hours Start</label>
        <input
          type="time"
          name="workingHoursStart"
          id="workingHoursStart"
          value={workingHours.start}
          onChange={e => {
            setWorkingHours({
              ...workingHours,
              start: e.target.value,
            });
          }}
        />

        <label htmlFor="workingHoursEnd">Working Hours End</label>
        <input
          type="time"
          name="workingHoursEnd"
          id="workingHoursEnd"
          value={workingHours.end}
          onChange={e => {
            setWorkingHours({
              ...workingHours,
              end: e.target.value,
            });
          }}
        />

        <button type="submit">Submit</button>
      </form>

      <div
        className="
      calendar-container 
      "
      >
        <Calendar
          className="calendar"
          localizer={momentLocalizer(moment)}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{fontSize: "12px", border: "1px solid #ccc"}}
          eventPropGetter={myEventsList => {
            let newStyle = {
              backgroundColor: "#007bff",
              color: "white",
              borderRadius: "4px",
              padding: "4px 8px",
            };
            return {
              className: "rbc-event",
              style: newStyle,
              
            };

          
          }}
        />
      </div>
    </div>
  );
};


export default MyCalendar;
