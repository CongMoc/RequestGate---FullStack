import React from "react";
import { useNavigate } from "react-router";

const EmailForm = ({ email, setEmail, checkPassword }) => {
  let check = false;
  if (checkPassword) {
    check = checkPassword;
  }
  return (
    <div className="input-container">
      <input
        type="email"
        name="email"
        value={email}
        placeholder="Email"
        autoComplete="email"
        onChange={(event) => setEmail(event.target.value)}
        disabled={check ? true : false}
        key={check ? "disabled" : "enabled"}
      />
    </div>
  );
};

const PasswordForm = ({ password, setPassword, checkPassword }) => {
  let check = false;
  if (checkPassword) {
    check = checkPassword;
  }
  return (
    <div className="input-container">
      <input
        type="password"
        name="password"
        value={password}
        placeholder="Password"
        autoComplete="current-password"
        onChange={(event) => setPassword(event.target.value)}
        disabled={check ? true : false}
        key={check ? "disabled" : "enabled"} 
      />
    </div>
  );
};

const ConfirmPassword = ({ confirmPassword, setconfirmPassword }) => {
  return (
    <div className="input-container">
      <input
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        placeholder="Confirm Password"
        onChange={(event) => setconfirmPassword(event.target.value)}
      />
    </div>
  );
};

const BackLogin = () => {
  const navigate = useNavigate();
  const handleBackLogin = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  return (
    <div className="back" onClick={handleBackLogin}>
      <img src="/images/prev.png" height={15} />
    </div>
  );
};

export { EmailForm, PasswordForm, ConfirmPassword, BackLogin };
