import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/login.css";
import MessageLogin from "../components/MessageLogin";
import { EmailForm, PasswordForm } from "../components/EmailAndPassword";
import { CheckEmailIsEmpty } from "../models/modelRegister";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { Nickname } from "../components/InputForm";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMessage, setIsMessage] = useState("");
  const [nickName, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [is_admin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    try {
      // Get access and refresh tokens
      const res = await api.post("/api/token/", {
        username: nickName,
        email,
        password,
      });
      localStorage.setItem("ACCESS_TOKEN", res.data.access);
      localStorage.setItem("REFRESH_TOKEN", res.data.refresh);

      // Check user role
      const roleRes = await api.post("/api/token/check-role/", {
        username: nickName,
        email,
      });
      const { is_admin, is_manager, id_department } = roleRes.data;

      // Set localStorage for role and department
      const role = is_admin ? "Admin" : is_manager ? "Manager" : "Developer";
      localStorage.setItem("ROLE", role);
      if (id_department) {
        localStorage.setItem("IDDepartment", id_department);
      }

      // Navigate based on role
      const navigatePath = role === "Admin" ? "/home" : "/projects/REQUESTGATE";
      navigate(navigatePath, {
        state: { notify: "Login successfully!" },
      });
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        if (status === 400) {
          if (data.detail) {
            setIsMessage(data.detail); // JWT default error message
          } else {
            // Handle other potential validation errors
            const errors = Object.entries(data)
              .map(([key, value]) => `${key}: ${value}`)
              .join(", ");
            setIsMessage(errors);
          }
        } else if (status === 401) {
          setIsMessage("Unauthorized access.");
        } else {
          setIsMessage("An error occurred. Please try again.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        setIsMessage("Network error. Please check your connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setIsMessage("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleForgotPassword = () => {
    let check = CheckEmailIsEmpty(email);
    if (!check) {
      setIsMessage("Invalid email and do you want to create new account?");
    } else {
      navigate("/forgotPassword", { state: { email } });
    }
  };

  const handleCreateNewAccount = () => {
    navigate("/register");
  };

  return (
    <div className="bodyLogin">
      <div className="login">
        <h1>Login to Request Gate</h1>
        <h3>
          New here?{" "}
          <a onClick={handleCreateNewAccount}>Create new an account</a>
        </h3>
        <form onSubmit={handleSubmit}>
          <Nickname nickname={nickName} setNickname={setNickname} />
          <EmailForm email={email} setEmail={setEmail} />
          <PasswordForm password={password} setPassword={setPassword} />
          <a onClick={handleForgotPassword}>Forgot Password ?</a>
          <button type="submit" name="login">
            Login
          </button>
        </form>
        {isMessage && (
          <MessageLogin message={isMessage} setIsMessage={setIsMessage} />
        )}
      </div>
    </div>
  );
};

export default Login;
