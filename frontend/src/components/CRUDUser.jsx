import React, { useState, useEffect } from "react";
import "../styles/detailManagement.css";
import { GetDepartmentFromLocalStorage } from "../models/modelDepartment";
import {
  DepartmentSelect,
  Fullname,
  Nickname,
  Address,
  Phone,
  StatusUser,
  RoleEdit,
} from "./InputForm";
import { EmailForm, PasswordForm } from "./EmailAndPassword";
import { Message } from "./Message";
import { useLocation, useNavigate } from "react-router";
import NavbarContent from "./NavbarContent";
import api from "../api";

const CrudUser = () => {
  let location = useLocation();
  let navigate = useNavigate();
  let checkPassword = "";
  const [userProfile, setUserProfile] = useState([]);
  const [idDepartment, setIDDepartment] = useState(1);
  const [idRole, setIDRole] = useState(1);
  const [checkUpdate, setCheckUpdate] = useState(false);
  const [nickname, setNickname] = useState("");
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [emailUser, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isMessage, setIsMessage] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Active");
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [statuses, setStatus] = useState(["Active", "Deactive"]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.pathname === "/user") {
      setCheckUpdate(true);
    } else {
      setCheckUpdate(false);
    }
  }, []);

  useEffect(() => {
    async function fetchDepartmentsAndRoles() {
      try {
        const departmentsResponse = await api.get("/api/departments/");
        const rolesResponse = await api.get("/api/roles/");
        setDepartments(departmentsResponse.data);
        setRoles(rolesResponse.data);
      } catch (error) {
        console.error("Error fetching departments and roles:", error);
      }
    }
    fetchDepartmentsAndRoles();
  }, []);

  useEffect(() => {
    async function fetchUserProfiles() {
      try {
        const user = await api.get(`api/update/${location.state.username}/`);
        console.log(user);
        setUserProfile(user);
      } catch (error) {
        console.error(error.message);
      }
    }

    if (location.state && location.state.username) {
      fetchUserProfiles();
    }
  }, []);

  useEffect(() => {
    setNickname(userProfile.nickname);
    setFullname(userProfile.fullname);
    setAddress(userProfile.address);
    setPhone(userProfile.phone);
    setEmail(userProfile.email);
    setPassword(userProfile.password);
    setSelectedStatus(userProfile.status);
    setIDRole(userProfile.role);
    setIDDepartment(userProfile.department);
  }, [userProfile]);

  useEffect(() => {
    if (departments.length > 0) {
      setSelectedDepartment(departments[0].name);
    }
    if (roles.length > 0) {
      setSelectedRole(roles[0].role);
    }
  }, [departments.length, roles.length]);

  const handleDepartmentChange = (selectedDepartment) => {
    setSelectedDepartment(selectedDepartment);
  };

  const handleRoleChange = (selectedRole) => {
    setSelectedRole(selectedRole);
  };
  const handleStatusChange = (selectedStatus) => {
    setSelectedStatus(selectedStatus);
  };
  const isEmailValid = (email) => {
    // Biểu thức chính quy kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // check fields null
  const handleCheckNullInput = () => {
    if (nickname === "") {
      return "Nickname is null... Please try again!";
    } else if (fullname === "") {
      return "Fullname is null... Please try again!";
    } else if (address === "") {
      return "Address is null... Please try again!";
    } else if (phone === "") {
      return "Phone number is null... Please try again!";
    } else if (emailUser === "") {
      return "Email is null... Please try again!";
    } else if (!isEmailValid(emailUser)) {
      return "Email invalidate";
    } else {
      return "";
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      user: {
        username: fullname,
        password: password,
        email: emailUser,
      },
      nickname: nickname,
      fullname: fullname,
      address: address,
      email: emailUser,
      phone: phone,
      department: parseInt(idDepartment),
      role: parseInt(idRole),
      status: true,
    };

    const nullInputMessage = handleCheckNullInput();
    if (nullInputMessage !== "") {
      setIsMessage(nullInputMessage);
    } else {
      try {
        await api
          .post("/api/register/", data)
          .then((response) => {
            console.log(response.data);
            setIsMessage("User registered successfully!");
            setNickname("");
            setFullname("");
            setAddress("");
            setPhone("");
            setEmail("");
            setPassword("");
            setSelectedDepartment("Software Development");
            setSelectedRole("Developer");
            setSelectedStatus("Active");
            setCheckUpdate(false);
            setIDDepartment(0);
          })
          .catch((error) => {
            const errorMessage =
              error.response?.data?.detail ||
              "An error occurred during registration.";
            setIsMessage(errorMessage);
          });
      } catch (error) {
        setIsMessage(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      user: {
        username: fullname,
        email: emailUser,
      },
      nickname: nickname,
      fullname: fullname,
      address: address,
      email: emailUser,
      phone: phone,
      department: parseInt(idDepartment),
      role: parseInt(idRole),
      status: selectedStatus,
    };
    console.log(data);

    const nullInputMessage = handleCheckNullInput();
    if (nullInputMessage !== "") {
      setIsMessage(nullInputMessage);
    } else {
      try {
        await api
          .put(`/api/update/${fullname}/`, data)
          .then((response) => {
            console.log(response.data);
            setIsMessage("User updated successfully!");
            setNickname("");
            setFullname("");
            setAddress("");
            setPhone("");
            setEmail("");
            setPassword("");
            setSelectedDepartment("Software Development");
            setSelectedRole("Developer");
            setSelectedStatus("Active");
            setCheckUpdate(false);
            setIDDepartment(0);
          })
          .catch((error) => {
            const errorMessage =
              error.response?.data?.detail ||
              "An error occurred during registration.";
            setIsMessage(errorMessage);
          });
      } catch (error) {
        setIsMessage(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="detailContent">
      {checkUpdate === true ? (
        <NavbarContent topic={"User"} note={"(USERS)"} />
      ) : (
        <NavbarContent topic={"Add User"} note={"(ADD-USER)"} />
      )}
      <div className="detail">
        {isMessage && (
          <Message message={isMessage} setIsMessage={setIsMessage} />
        )}
        <form className="userForm">
          <div className="infor-container">
            <div className="avatar">
              <img src="/images/user2.png" alt="Loading..." />
            </div>
          </div>
          <div className="infor-container">
            <Nickname nickname={nickname} setNickname={setNickname} />
            <Fullname fullname={fullname} setFullName={setFullname} />
            <Address address={address} setAddress={setAddress} />
            <Phone phone={phone} setPhone={setPhone} />
            <EmailForm
              email={emailUser}
              setEmail={setEmail}
              checkPassword={checkPassword}
            />
            <PasswordForm
              password={password}
              setPassword={setPassword}
              checkPassword={checkPassword}
            />
            <DepartmentSelect
              departments={departments}
              selectedDepartment={selectedDepartment}
              onDepartmentChange={handleDepartmentChange}
              setIDDeparment={setIDDepartment}
              checkPassword={checkPassword}
            />
            <RoleEdit
              roles={roles}
              selectedRole={selectedRole}
              onRoleChange={handleRoleChange}
              checkPassword={checkPassword}
              setIDRole={setIDRole}
            />
            <StatusUser
              statuses={statuses}
              selectedStatus={selectedStatus}
              onStatusChange={handleStatusChange}
              checkPassword={checkPassword}
            />
            {checkUpdate === false ? (
              <button onClick={handleAddUser}>Add User</button>
            ) : (
              <button onClick={handleUpdateUser}>Update User</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrudUser;
