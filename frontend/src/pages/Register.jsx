// Register.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "..//styles/register.css";
import { CheckEmailIsEmpty } from "../models/modelRegister";
import MessageLogin from "../components/MessageLogin";
import { SaveNewUserToLocalStorage } from "../models/modelUser";
import {
  Nickname,
  Fullname,
  DepartmentSelect,
  Phone,
} from "../components/InputForm";
import {
  EmailForm,
  PasswordForm,
  ConfirmPassword,
  BackLogin,
} from "../components/EmailAndPassword";
import api from "../api";
import axios from "axios";

const Register = () => {
  const [department, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [idDepartment, setIDDepartment] = useState(1);
  const [nickName, setNickName] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [isMessage, setIsMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
    if (department.length > 0) {
      setSelectedDepartment(department[0].name);
    }
  }, [department]);

  const handleDepartmentChange = (selectedDepartment) => {
    setSelectedDepartment(selectedDepartment);
  };

  // handle event for email
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // check fields null
  const handleCheckNullInput = () => {
    if (nickName === "") {
      return "Nickname is null... Please try again!";
    } else if (fullname === "") {
      return "Fullname is null... Please try again!";
    } else if (email === "") {
      return "Email is null... Please try again!";
    } else if (!isEmailValid(email)) {
      return "Email invalidate";
    } else {
      return "";
    }
  };

  // handle register user if
  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
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
      setLoading(false);
    } else {
      if (password === confirmpassword) {
        try {
          await api
            .post("/api/register/", data)
            .then((response) => {
              console.log(response.data);
              setIsMessage("User registered successfully!");
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
    }
  };

  return (
    <div className="bodyLogin">
      <div className="register">
        {isMessage !== "" && (
          <MessageLogin message={isMessage} setIsMessage={setIsMessage} />
        )}
        <h1>Register for Request Gate</h1>
        <form onSubmit={handleRegisterSubmit}>
          <Nickname nickname={nickName} setNickname={setNickName} />
          <Fullname fullname={fullname} setFullName={setFullname} />
          <Phone phone={phone} setPhone={setPhone} />
          <EmailForm email={email} setEmail={setEmail} />
          <PasswordForm password={password} setPassword={setPassword} />
          <ConfirmPassword
            confirmPassword={confirmpassword}
            setconfirmPassword={setconfirmPassword}
          />
          <DepartmentSelect
            departments={department}
            selectedDepartment={selectedDepartment}
            onDepartmentChange={handleDepartmentChange}
            setIDDeparment={setIDDepartment}
            checkPassword={false}
          />
          <button type="submit">Register</button>
        </form>
        <BackLogin />
      </div>
    </div>
  );
};

export default Register;
