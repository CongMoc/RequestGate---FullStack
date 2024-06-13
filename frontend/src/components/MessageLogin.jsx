import React, { useState, useEffect } from "react";
import "../styles/message.css";

const MessageLogin = ({ message, setIsMessage }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsMessage("");
    }, 3000);

    // Clear timeout khi component unmount
    return () => clearTimeout(timeoutId);
  }, [message, setIsMessage]);
  return (
    <div className="messageLogin">
      <div className="valueMessage">{message}</div>
      <img src="/images/monkey.png" alt="Loading Monkey..." />
    </div>
  );
};

export default MessageLogin;
 