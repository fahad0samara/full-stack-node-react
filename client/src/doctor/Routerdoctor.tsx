
import {Routes, Route, useParams} from "react-router-dom";

import About from "./About";
import Dashboard from "./Dashboard";
import SideNavigate from "./SideNavigate";
import DoctorProfile from "./DoctorProfile";

const Routerdoctor = () => {

  return (
    <div>
      <SideNavigate />

      <Routes>
        <Route path="dashboard" element={<Dashboard  />} />
        <Route path="about" element={<About />} />
        <Route path="doctor/:id" element={<DoctorProfile  />} />
      </Routes>
    </div>
  );
};

export default Routerdoctor;