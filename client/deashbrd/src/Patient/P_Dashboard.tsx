import {Link, Outlet, useNavigate} from "react-router-dom";
import {useState} from "react";

const P_Dashboard = props => {
  const navigate = useNavigate();
  const logout = async () => {
    const res = await fetch("/logout");
    props.settoastCondition({
      status: "success",
      message: "Logged out Successfully!!!",
    });
    props.setToastShow(true);
  };
  const [Toggle, setToggle] = useState("Dashboard");

  return (
    <div className="h-screen overflow-y-hidden w-screen grid grid-cols-12">
      <div className="side_bar bg-white shadow col-span-2">
        <div className="flex m-2 mt-4  ">
          <div className="logo m-2  "></div>
          <div className="heading font-poppins font-bold text-xl  ">
            <a>
              <h1>Public health Record System</h1>
            </a>
          </div>
        </div>
        <nav>
          <Link
            to="/Dashboard"
            onClick={() => setToggle("Dashboard")}
            className={
              Toggle === "Dashboard" ? "text-gray-900" : "text-gray-400"
            }
          >
            <div className="flex m-2 mt-8 ">
              <div className="w-6 ml-4  "></div>
              <div className="font-poppins font-bold ml-4">
                <h1>Dashboard</h1>
              </div>
            </div>
          </Link>

          <a
            onClick={() => setToggle("Reports")}
            className={Toggle === "Reports" ? "text-gray-900" : "text-gray-400"}
          >
            <div className="flex m-2 mt-6  ">
              <div className="w-6 ml-4  "></div>
              <div className="font-poppins font-bold ml-4">
                <h1>Reports</h1>
              </div>
            </div>
          </a>

          <div className="p-4">
            <h1 className="font-poppins font-bold text-xl mt-4">Main menu</h1>
            <div className="grid grid-rows-2 gap-4 font-bold font-poppins mt-4">
              <a
                onClick={() => setToggle("Patient_history")}
                className={
                  Toggle === "Patient_history"
                    ? "text-gray-900 "
                    : "text-gray-400"
                }
              >
                <div className="flex p-2">
                  <h1 className="ml-4">Patient History</h1>
                </div>
              </a>
              <a
                onClick={() => setToggle("Patient_profile")}
                className={
                  Toggle === "Patient_profile"
                    ? "text-gray-900"
                    : "text-gray-400"
                }
              >
                <div className="flex p-2">
                  <h1 className="ml-4">Patient Profile</h1>
                </div>
              </a>
            </div>
          </div>
        </nav>

        <div className=" mx-auto mt-56 py-1    bg-primary  rounded font-semibold font-poppins shadow-sm hover:bg-bgsecondary w-2/5  ">
          <button className="font-bold  flex items-center" onClick={logout}>
            logout
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default P_Dashboard;
