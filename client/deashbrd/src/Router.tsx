import {Routes, Route} from "react-router-dom";
import Login from "./patient/auth/Login";
import Register from "./patient/auth/Register";
import Hero from "./Home/Hero";
import RouterPatient from "./patient/RouterPatient";
import {useLogIN} from "../ContextLog";
import RouterAdmin from "./admin/RouterAdmin";
import RegisterAdmin from "./admin/RegisterAdmin";
import LoginAdmin from "./admin/LoginAdmin";

const Router = () => {
  const {logPatient, logAdmin, setlogAdmin, setlogPatient} = useLogIN();

  return (
    <Routes>
      {
        logPatient && (
          <Route path="/patient/*" element={<RouterPatient />} />
        )

      }
      {
        logAdmin && (
          <Route path="/admin/*" element={<RouterAdmin />} />
        )
      }

      

      


      <Route path="/" element={<Hero />} />
      <Route path="/patient/*" element={<RouterPatient />} />
      <Route path="/admin/*" element={<RouterAdmin />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/registerAdmin" element={<RegisterAdmin />} />
      <Route path="/loginAdmin" element={<LoginAdmin />} />
      
    </Routes>
  );
};

export default Router;
