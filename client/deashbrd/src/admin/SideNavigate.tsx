import {Link, Outlet, useNavigate} from "react-router-dom";
import {useState} from "react";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";

import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import {RiDashboardFill} from "react-icons/ri";
import {useLogIN} from "../../ContextLog";

const SideNavigate = (_props: any) => {
  const { Profile, setProfile, loading, setLoading, dark, setdark} =
    useLogIN();
  const navigate = useNavigate();

  return (
    <SideNav
      /*  . */
      style={{
        backgroundColor: dark ? "#000" : "rgb(103 232 249)",

        boxShadow: dark
          ? "0px 0px 10px 0px rgb(103 232 249)  "
          : "0px 0px 10px 0px #000",
      }}
      onSelect={function (selected: string): void {
        // Add your code here
        if (selected === "dashboard") {
          navigate("dashboard");
        } else if (selected === "about") {
          navigate("about");
        } else if (selected === "doctorList") {
          navigate("doctorList");
        }

        // console.log(selected);
      }}
      


 
      
    
  
       
     

      
          
           

   

    >
      <SideNav.Toggle
        style={{
          color: dark ? "red" : "black",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      />
      <SideNav.Nav
        defaultOpenKeys={["dashboard"]}
        className="

        "
        style={{
          color: dark ? "white" : "black",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
        defaultSelected="dashboard"
      >
        <NavItem eventKey="dashboard">
          <NavIcon>
            <RiDashboardFill
              style={{
                color: dark ? "rgb(103 232 249)" : "black",
                fontSize: "1.8rem",
                fontWeight: "bold",
                marginLeft: "1rem",
                marginTop: "1rem",
              }}
            />
          </NavIcon>
          <NavText
            style={{
              color: dark ? "rgb(103 232 249)" : "black",
              fontSize: "0.9rem",
              fontWeight: "bold",
              marginLeft: "1rem",
              marginTop: "1rem",
            }}
          >
            dashboard
          </NavText>
        </NavItem>
        <NavItem eventKey="about">
          <NavIcon>
            <RiDashboardFill
              style={{
                color: dark ? "rgb(103 232 249)" : "black",
                fontSize: "1.8rem",
                fontWeight: "bold",
                marginLeft: "1rem",
                marginTop: "1rem",
              }}
            />
          </NavIcon>
          <NavText
            style={{
              color: dark ? "rgb(103 232 249)" : "black",
              fontSize: "0.9rem",
              fontWeight: "bold",
              marginLeft: "1rem",
              marginTop: "1rem",
            }}
          >
            about
          </NavText>
        </NavItem>

        <NavItem eventKey="doctorList">
          <NavIcon>
            <RiDashboardFill
              style={{
                color: dark ? "rgb(103 232 249)" : "black",
                fontSize: "1.8rem",
                fontWeight: "bold",
                marginLeft: "1rem",
                marginTop: "1rem",

              }}
            />
          </NavIcon>
          <NavText
            style={{
              color: dark ? "rgb(103 232 249)" : "black",
              fontSize: "0.9rem",
              fontWeight: "bold",
              marginLeft: "1rem",
              marginTop: "1rem",
            }}
          >
            doctorList
          </NavText>
        </NavItem>
        {/* <NavItem eventKey="patientList">
          <NavIcon>
            <RiDashboardFill
              style={{
                color: dark ? "rgb(103 232 249)" : "black",
                fontSize: "1.8rem",
                fontWeight: "bold",
                marginLeft: "1rem",
                marginTop: "1rem",
              }}
            />
          </NavIcon>
          <NavText
            style={{
              color: dark ? "rgb(103 232 249)" : "black",
              fontSize: "0.9rem",
              fontWeight: "bold",
              marginLeft: "1rem",
              marginTop: "1rem",
            }}
          >
            patientList
          </NavText>
        </NavItem> */}

      </SideNav.Nav>
    </SideNav>
  );
};

export default SideNavigate;
