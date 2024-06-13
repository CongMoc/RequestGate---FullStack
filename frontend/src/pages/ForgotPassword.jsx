import React, { useState, useEffect } from "react";
import {
  GetPhoneFromEmailOfUser,
  UpdatePassword,
} from "../models/modelUser";
import {
  BackLogin,
  ConfirmPassword,
  EmailForm,
  PasswordForm,
} from "../components/EmailAndPassword";
import "../styles/forgot.css";
import  MessageLogin from "../components/MessageLogin";
import { useLocation, useNavigate } from "react-router";
import { CheckEmailIsEmpty } from "../models/modelRegister";
import {
  BackHomeFromLogin,
  Phone,
} from "../components/InputForm";
import { CheckRole } from "../models/modelLogin";

const ForgotPassswordUser = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isMessage, setIsMessage] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  let notify = "";
  let nameURL = location.pathname;
  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
    nameURL = location.pathname;
  }, [location.state]);

  const handleBackHome = () => {
    let check = CheckRole(email);
    if (check !== 0) {
      navigate("/projects/REQUESTGATE", { state: { notify, email } });
    } else {
      navigate("/home", { state: { notify, email } });
    }
  };

  const handleCheckNull = () => {
    let checkEmail = CheckEmailIsEmpty(email);
    if (password === password2 && password !== "" && password2 !== "") {
      if (!checkEmail) {
        return "Invalid Email !!!";
      }
    } else {
      return "Password and confirmation password is not same!!!";
    }
  };

  const handleUpdatePassword = (event) => {
    event.preventDefault();
    let check = handleCheckNull();
    if (check !== "" && check !== undefined) {
      setIsMessage(check);
    } else {
      notify = "Change Password Successfully!!!";
      if (nameURL === "/forgotPassword") {
        if (phone !== "" && phone === GetPhoneFromEmailOfUser(email)) {
          navigate("/login", { state: { notify } });
          UpdatePassword(email, password);
        } else {
          setIsMessage("Invalid Phone... Please try again!");
        }
      } else {
        handleBackHome();
        UpdatePassword(email, password);
      }
    }
  };

  return (
    <div className="bodyLogin">
      <div className="forgot">
        {nameURL === "/forgotPassword" ? (
          <h1>Forgot Password</h1>
        ) : (
          <h1>Reset Password</h1>
        )}
        <form onSubmit={handleUpdatePassword}>
          <EmailForm email={email} setEmail={setEmail} />
          {nameURL === "/forgotPassword" ? (
            <Phone phone={phone} setPhone={setPhone} />
          ) : (
            ""
          )}
          <PasswordForm password={password} setPassword={setPassword} />
          <ConfirmPassword
            confirmPassword={password2}
            setconfirmPassword={setPassword2}
          />
          <button type="submit">Change Password</button>
        </form>
        {nameURL === "/forgotPassword" ? (
          <BackLogin />
        ) : (
          <BackHomeFromLogin handleBackHome={handleBackHome} />
        )}
        {isMessage && (
          <MessageLogin message={isMessage} setIsMessage={setIsMessage} />
        )}
      </div>
    </div>
  );
};

export default ForgotPassswordUser;