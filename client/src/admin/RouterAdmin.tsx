import {Routes, Route} from "react-router-dom";
import SideNavigate from "./SideNavigate";

import About from "./rgister_Edit/RegisterDr";
import Dashboard from "./Dashboard";
import DoctorList from "./List/DoctorList";
import Edit from "./rgister_Edit/Edit";
import NotFound from "./NotFound";
import View from "./View";
import RegisterDr from "./rgister_Edit/RegisterDr";
import PatientList from "./List/PatientList";








const RouterPatient = () => {
  return (
    <div>
      <SideNavigate />

      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="RegisterDr" element={<RegisterDr />} />
        <Route path="rg_patient" element={<Rg_patient />} />

        <Route path="doctorList" element={<DoctorList />} />
        <Route path="patientList" element={<PatientList />} />

        <Route path="*" element={<NotFound />} />

        <Route path="/Edit/:id" element={<Edit />} />
        <Route path="/View/:id" element={<View />} />
        <Route path="/RegisterDr/:id" element={<RegisterDr />} />
      </Routes>
    </div>
  );
};

export default RouterPatient;
