import {Routes, Route} from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Hero from "./Home/Hero";
import RouterPatient from "./patient/RouterPatient";
import { useLogIN } from "../ContextLog";
import RouterAdmin from "./admin/RouterAdmin";
import RegisterAdmin from "./auth/RegisterAdmin"
import LoginAdmin from "./auth/LoginAdmin";

const Router = () => {
  const {logPatient, logAdmin} = useLogIN();

  return (
    <Routes>
      {logPatient ? (
        <Route path="/patient/*" element={<RouterPatient />} />
      ) : null}
      {logAdmin ? <Route path="/admin/*" element={<RouterAdmin />} /> : null}

      <Route path="/" element={<Hero />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/RegisterAdmin" element={<RegisterAdmin />} />
      <Route path="/LoginAdmin" element={<LoginAdmin />} />
    </Routes>
  );
};

export default Router;
