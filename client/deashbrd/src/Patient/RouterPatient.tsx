import { Routes, Route } from "react-router-dom";
import SideNavigate from "./SideNavigate";
import Dashboard from "./Dashbord";
import About from "./About";






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