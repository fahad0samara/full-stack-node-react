    import {Routes, Route} from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Hero from "./Home/Hero";
import Dashboard from "./Patient/Dashbord";
import P_Dashboard from "./Patient/P_Dashboard";


    
    const Router = () => {
        return (
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/P_Dashboard" element={<P_Dashboard />} />
            <Route path="/Dashboard" element={<Dashboard/>} />
          </Routes>
        );
    }
    
    export default Router