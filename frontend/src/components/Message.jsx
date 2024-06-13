import React, { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";

const Message = ({ message, setIsMessage }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsMessage("");
    }, 5000);

    // Clear timeout khi component unmount
    return () => clearTimeout(timeoutId);
  }, [message, setIsMessage]);

  return <div className="message">{message}</div>;
};

const MessageUser = () => {
  const location = useLocation();
  const [isMessage, setIsMessage] = useState("");

  useEffect(() => {
    let timeoutId;
    if (location.state && location.state.notify) {
      setIsMessage(location.state.notify);
      timeoutId = setTimeout(() => {
        setIsMessage("");
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [location.state]);

  return isMessage && <div className="message">{isMessage}</div>;
};

export { Message, MessageUser };
