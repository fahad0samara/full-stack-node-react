import {useState} from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import {IconContext} from "react-icons/lib";
import { FaTimes } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineCloseSquare } from "react-icons/ai";
import {useLogIN} from "../../ContextLog";
function SideNavigate() {
  const [showSidebar, setShowSidebar] = useState(true);
  const location = useLocation();
    const {
      logPatient,

      Profile,
      setProfile,
      loading,
      setLoading,
      dark,
      setdark,
    } = useLogIN()

  return (
    <>
      {showSidebar ? (
        <button
          className="
          fixed z-30 flex items-center cursor-pointer left-10 top-6 text-4xl font-semibold text-white
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
        className={`
        fixed  top-0 
        min-h-screen flex
        flex-col items-center justify-between
        left-0 h-screen w-48 bg-blue-500 transition-all duration-500 ease-in-out transform
        ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}
      >
      
       
          <aside
            className="
            font-bold
            text-white
            text-2xl

            flex
            flex-col
            items-center
            justify-center
            mt-24
      
            
            "
         
          >
              <nav>
                <ul>
                  <li>
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
                      to="/admin/about"
                      activeClassName={
                        location.pathname === "/admin/about" ? "active" : ""
                      }
                    >
                      About
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/doctorList"
                      activeClassName={
                        location.pathname === "/admin/doctorList"
                          ? "active"
                          : ""
                      }
                    >
                      Doctor List
                    </NavLink>
             
                  </li>
                  <li>
                    <NavLink
                      to="/admin/Eedit"
                      activeClassName={
                        location.pathname === "/admin/Eedit" ? "active" : ""
                      }
                    >
                      Employee Edit
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </aside>

         
        
      </div>
    </>
  );
}

export default SideNavigate;
