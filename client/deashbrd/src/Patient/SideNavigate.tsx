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

const SideNavigate = (_props: any) => {
  const navigate = useNavigate();

  return (
    <SideNav
      onSelect={selected => {
        navigate(
          selected === "dashboard" ? "/patient/dashboard" : "/patient/about"
        );
      }}
      className="
      bg-cyan-300
      h-screen



   


      
      fixed
      top-0
      left-0
      overflow-y-auto
      overflow-x-hidden


      
      z-50

  




      




      
     
     

      "
    >
      <SideNav.Toggle />
      <SideNav.Nav
        defaultOpenKeys={["dashboard"]}
        className="

        "
        style={{
          color: "red",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
        defaultSelected="dashboard"
      >
        <NavItem eventKey="dashboard">
          <NavIcon>
            <RiDashboardFill
              style={{
                color: "red",
                fontSize: "1.9rem",
                fontWeight: "bold",
                marginLeft: "1rem",
                marginTop: "1rem",
              }}
            />
          </NavIcon>
          <NavText>dashboard</NavText>
        </NavItem>
        <NavItem eventKey="about">
          <NavIcon>
            <RiDashboardFill
              style={{
                color: "red",
                fontSize: "1.9rem",
                fontWeight: "bold",
                marginLeft: "1rem",
                marginTop: "1rem",
              }}
            />
          </NavIcon>
          <NavText>about</NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
};

export default SideNavigate;
