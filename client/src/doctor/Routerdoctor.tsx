
import {Routes, Route, useParams} from "react-router-dom";
import jwtDecode from "jwt-decode";

import Dashboard from "./Dashboard";
import SideNav from "./SideNavigate";
import DoctorProfile from "./DoctorProfile";
import MyCalendar from "./MyCalendar";

const Routerdoctor = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found in local storage");
      return;
    }
const decoded = jwtDecode(token);
console.log("decoded", decoded);
const userId = decoded.doctorId;

  return (
    <div>
      <SideNav />

      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route
          path="MyCalendar"

          element={<MyCalendar />} />
        {
          // pass the actual id value here
          //http://localhost:3000/doctor/doctors/63af46e39b3184d62a652f4e
        }
        <Route path="/doctor/:id" element={<DoctorProfile />} />
      </Routes>


      
    </div>
  );
};

export default Routerdoctor;