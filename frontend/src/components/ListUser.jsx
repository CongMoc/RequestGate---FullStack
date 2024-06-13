import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  ListManager,
  DeleteUser,
  ListStatusUserActive,
  ListStatusUserDeactive,
} from "../models/modelUser";
import NavbarContent from "./NavbarContent";
import { Message } from "./Message";
import { CheckRole } from "../models/modelLogin";
import api from "../api";

const ListUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [listUser, setListUser] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isMessage, setIsMessage] = useState("");
  const [isRole, setIsRole] = useState(0);
  const [id_department, setIDDepartment] = useState(0);
  const { total, active, deactive } = 0;

  const CheckDepartmentIsAuthenticated = (e) => {
    const id_department = localStorage.getItem("IDDepartment");
    if (id_department) {
      setIDDepartment(id_department);
    }
  };

  const getRoleUser = () => {
    const checkRole = localStorage.getItem("ROLE");
    if (checkRole === "Admin") {
      setIsRole(1);
    } else {
      setIsRole(2);
    }
  };

  const getUserProfile = async (e) => {
    try {
      await api
        .get("/api/users/")
        .then((res) => {
          setListUser(res.data);
        })
        .catch((err) => {
          setIsMessage(err.message);
        });
    } catch (error) {
      setIsMessage(error.message);
    }
  };

  useEffect(() => {
    getUserProfile();
    getRoleUser();
    CheckDepartmentIsAuthenticated();
    getDepartments();
  }, []);
  const handleDisplayInformationUser = (username) => {
    if (username) {
      navigate("/user", { state: { username } });
    }
  };

  const handleDeleteUser = ({ user }) => {
    let check = window.confirm("Do you want to delete this use?");
    if (check) {
      DeleteUser(user.id);
      setIsMessage("Deleted User Successfully!");
    }
  };

  const handleActiveUser = () => {};
  const handleDeactiveUser = () => {};
  const handleAllUser = () => {};

  const getRoleTitle = (role) => {
    switch (role) {
      case 1:
        return <h1 style={{ color: "#76A6CF" }}>Admin</h1>;
      case 2:
        return <h1 style={{ color: "#FFC071" }}>Manager</h1>;
      default:
        return <h1 style={{ color: "#FFC071" }}>Developer</h1>;
    }
  };

  const getDepartments = async () => {
    try {
      const departmentsResponse = await api.get("/api/departments/");
      setDepartments(departmentsResponse.data);
    } catch (error) {
      alert(error.message);
    }
  };

  const getNameDepartments = (id) => {
    if (departments.length > 0) {
      const modelAfterDelete = departments.filter((department) => {
        return department.id === id;
      });

      if (modelAfterDelete) {
        return modelAfterDelete[0].name;
      }
    }
  };

  return (
    <div className="detailContent">
      {isMessage && <Message message={isMessage} setIsMessage={setIsMessage} />}
      <NavbarContent topic={"List User"} note={"(LIST-USER)"} />
      <div className="userList">
        <div className="parameterUser">
          <div className="eventUser">
            <a onClick={handleAllUser}>All</a>
            <a onClick={handleActiveUser}>Active</a>
            <a onClick={handleDeactiveUser}>Deactive</a>
          </div>
          <div className="numberUser">
            <p>Total User:</p>
            <h1>{total}</h1>
          </div>
          <div className="numberUser">
            <p>Total User Active:</p>
            <h1>{active}</h1>
          </div>
          <div className="numberUser">
            <p>Total User Deactive:</p>
            <h1>{deactive}</h1>
          </div>
        </div>
        <div className="listUser">
          {listUser.map((user) => {
            return (
              <div key={user.id} className="detailListUser">
                <img src="/images/user.png" alt="Loading..." />
                <h1>{user.nickname}</h1>
                <h1>{user.email}</h1>
                <h1>{getNameDepartments(user.department)}</h1>
                {getRoleTitle(user.role)}
                <h1>{user.phone}</h1>
                {user.status === "Active" ? (
                  <h1 style={{ color: "#2c9a7a" }}>{user.status}</h1>
                ) : (
                  <h1 style={{ color: "red" }}>{user.status}</h1>
                )}
                {isRole === 1 ? (
                  <>
                    <i
                      className="bx bx-edit-alt"
                      onClick={() =>
                        handleDisplayInformationUser(user.fullname)
                      }
                    ></i>
                    <i
                      className="bx bx-trash"
                      onClick={() => handleDeleteUser({ user })}
                    ></i>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListUser;
