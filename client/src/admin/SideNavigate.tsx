import {useState} from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import {IconContext} from "react-icons/lib";
import {FaTimes} from "react-icons/fa";
import {AiOutlineClose} from "react-icons/ai";
import {AiOutlineMenu} from "react-icons/ai";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {AiOutlineCloseSquare} from "react-icons/ai";
import {useLogIN} from "../../ContextLog";
function SideNavigate() {
  const [showSidebar, setShowSidebar] = useState(true);
  const location = useLocation();
  const {
    logPatient,

    Profile,
    setProfile,

    setLoading,
    dark,
    setdark,
  } = useLogIN();

  return (
    <div
      style={{
        backgroundColor: dark ? "#000" : "white",
        color: dark ? "white" : "black",
        boxShadow: dark
          ? "0px 0px 10px 0px rgb(103 232 249)"
          : "0px 0px 10px 0px #ccc",
      }}
    >
      {showSidebar ? (
        <button
          className="
          fixed z-30 flex items-center cursor-pointer left-10 top-6 text-4xl font-semibold
          "
          onClick={() => setShowSidebar(!showSidebar)}
        >
          x
        </button>
      ) : (
        <AiOutlineMenu
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed 

             z-30 flex items-center cursor-pointer left-10 top-6"
        />
      )}

      <div
        style={{
          backgroundColor: dark ? "#000" : "white",
          color: dark ? "white" : "black",
          boxShadow: dark
            ? "0px 0px 10px 0px rgb(103 232 249)"
            : "0px 0px 10px 0px #ccc",
        }}
        className={`
        fixed  top-0 
        min-h-screen flex
        flex-col items-center justify-between
        left-0 h-screen w-48  transition-all duration-500 ease-in-out transform
        ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}
      >
        <nav
          className="flex flex-col items-center mt-36
          w-full h-full
          "
        >
          <ul>
            <li
              className="flex items-center justify-center
                text-2xl
                "
            >
              <NavLink
                to="/admin/dashboard"
                activeClassName={
                  location.pathname === "/admin/dashboard" ? "active" : ""
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/RegisterDr"
                activeClassName={
                  location.pathname === "/admin/RegisterDr" ? "active" : ""
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/doctorList"
                activeClassName={
                  location.pathname === "/admin/doctorList" ? "active" : ""
                }
              >
                Doctor List
              </NavLink>
            </li>
            <li></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default SideNavigate;
