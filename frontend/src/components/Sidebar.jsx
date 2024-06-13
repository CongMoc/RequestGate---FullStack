import React, { useEffect, useState } from "react";
import "../styles/sidebar.css";
import { useLocation, useNavigate } from "react-router";
import { CheckRole } from "../models/modelLogin";
import api from "../api";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState(0);

  const getRoleUser = () => {
    const checkRole = localStorage.getItem("ROLE");
    if (checkRole === "Admin") {
      setRole(1);
    } else {
      setRole(2);
    }
  };

  useEffect(() => {
    getRoleUser();
  }, [])

  const handleBackHomeAdmin = () => {
    navigate("/home");
  };

  const handleAddIssue = () => {
    navigate("/add/REQUESTGATE");
  };

  const handleBackHome = () => {
    navigate("/projects/REQUESTGATE");
  };

  const handleViewIssue = () => {
    navigate("/list/REQUESTGATE");
  };

  const handleAddUser = () => {
    navigate("/addUser");
  };

  const handleListUser = () => {
    navigate("/listUser");
  };

  const handleDepartment = () => {
    navigate("/department");
  };

  return (
    <ul className="sidebar">
      <li>
        <img src="/images/menusidebar.png" width={20} height={20} />
      </li>
      <li
        className={
          location.pathname === "/projects/REQUESTGATE" ? "active" : ""
        }
        onClick={handleBackHome}
      >
        <i className="bx bx-home"></i>
        <a>Home</a>
      </li>
      <li
        className={location.pathname === "/add/REQUESTGATE" ? "active" : ""}
        onClick={handleAddIssue}
      >
        <i className="bx bx-plus-medical"></i>
        <a>Add Issue</a>
      </li>
      <li
        className={location.pathname === "/list/REQUESTGATE" ? "active" : ""}
        onClick={handleViewIssue}
      >
        <i className="bx bx-spreadsheet"></i>
        <a>Issue</a>
      </li>
      {role === 1 ? (
        <li
          onClick={handleAddUser}
          className={location.pathname === "/addUser" ? "active" : ""}
        >
          <i className="bx bx-plus-medical"></i>
          <a>Add User</a>
        </li>
      ) : (
        ""
      )}
      {role !== 3 ? (
        <li
          onClick={handleListUser}
          className={location.pathname === "/listUser" ? "active" : ""}
        >
          <i className="bx bx-user"></i>
          <a>List User</a>
        </li>
      ) : (
        ""
      )}
      {role === 1 ? (
        <li
          onClick={handleDepartment}
          className={location.pathname === "/department" ? "active" : ""}
        >
          <i className="bx bx-bar-chart-square"></i>
          <a>Department</a>
        </li>
      ) : (
        ""
      )}
      {role === 1 ? (
        <li onClick={handleBackHomeAdmin}>
          <i className="bx bx-arrow-back"></i>
          <a>Back</a>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};

export default Sidebar;
