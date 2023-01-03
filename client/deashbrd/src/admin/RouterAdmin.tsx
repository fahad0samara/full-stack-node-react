import {Routes, Route} from "react-router-dom";
import SideNavigate from "./SideNavigate";

import About from "./Register";
import Dashboard from "./Dashboard";
import DoctorList from "./List/DoctorList";
import Edit from "./rgister_Edit/Edit";
import NotFound from "./NotFound";
import View from "./View";







const RouterPatient = () => {
  return (
    <div>
      <SideNavigate />

      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />

        <Route path="doctorList" element={<DoctorList />} />

        <Route path="*" element={<NotFound />} />

        <Route path="/Edit/:id" element={<Edit />} />
        <Route path="/View/:id" element={<View />} />
      </Routes>
    </div>
  );
};

export default RouterPatient;
