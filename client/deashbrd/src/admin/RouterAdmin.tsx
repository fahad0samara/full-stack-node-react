import {Routes, Route} from "react-router-dom";
import SideNavigate from "./SideNavigate";

import About from "./About";
import Dashboard from "./Dashboard";
import DoctorList from "./DoctorList";
import Eedit from "./Eedit";
import NotFound from "./NotFound";







const RouterPatient = () => {
  return (
    <div>
      <SideNavigate />

      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />

        <Route path="doctorList" element={<DoctorList />} />

        <Route path="*" element={<NotFound />} />

        <Route path="/Eedit/:id" element={<Eedit />} />
      </Routes>
    </div>
  );
};

export default RouterPatient;
