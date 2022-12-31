import {Routes, Route} from "react-router-dom";
import SideNavigate from "./SideNavigate";

import About from "./About";
import Dashboard from "./Dashboard";
import DoctorList from "./DoctorList";



const RouterPatient = () => {
  return (
    <div>
      <SideNavigate />

      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />
        <Route path="doctorList" element={<DoctorList />} />

      </Routes>
    </div>
  );
};

export default RouterPatient;
