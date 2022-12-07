import {Routes, Route} from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Hero from "./Home/Hero";
import RouterPatient from "./patient/RouterPatient";
import {useLogIN} from "../ContextLog";

const Router = () => {
  const {log} = useLogIN();

  return (
    <Routes>
      {log ? <Route path="/patient/*" element={<RouterPatient />} /> : null}
      <Route path="/" element={<Hero />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
  );
};

export default Router;
