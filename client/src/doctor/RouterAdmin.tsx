import {Routes, Route} from "react-router-dom";
import SideNavigate from "./SideNavigate";

import About from "./About";
import Dashboard from "./Dashboard";

const RouterPatient = () => {
  return (
    <div>
      <SideNavigate />

      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
};

export default RouterPatient;
