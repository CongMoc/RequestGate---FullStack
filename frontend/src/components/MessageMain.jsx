import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/message.css";

const Message1 = ({ message, onComplete }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onComplete();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return <h3>{message}</h3>;
};

const Maintenance = ({ handleDelete }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // update after 1 second

    // Clear interval khi component unmount
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="maintenance">
      <a href="#">Maintenance</a>
      <p>
        Backog will undergo scheduled system maintenance on{" "}
        {currentTime.toLocaleTimeString()}. UTC for approximately 1 hour. During
        this time, some features will not be available. We apologize for any
        inconvenience.
      </p>
      <img src="/images/page.png" width={20} height={20} />
      <a href="#">NEW</a>
      <img
        src="/images/delete.png"
        width={25}
        height={25}
        onClick={handleDelete}
      />
    </div>
  );
};

const Release = () => {
  return (
    <div className="release">
      <a href="#">Release</a>
      <p>
        Better search for pull requests and wikis, and new filters for dashboard
        and notifications. Learn more about these and all Backlog updates in our
      </p>
      <p>lastest release notes.</p>
      <img src="/images/page.png" width={20} height={20} />
      <a href="#">NEW</a>
    </div>
  );
};

const Message2 = ({ handleDelete }) => {
  return (
    <>
      <Maintenance handleDelete={handleDelete} />
      <Release />
    </>
  );
};

const MessageMain = () => {
  const [isMessage1, setIsMessage1] = useState("");
  const [isMessage2, setIsMessage2] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.notify !== "") {
      setIsMessage1(location.state.notify);
    }
    setTimeout(() => {
      setIsMessage2(true);
    }, 2000);
  }, [location.state]);

  const handleCompleteMessage1 = () => {
    setIsMessage2(true);
  };

  const handleDelete = () => {
    setShowMessage(!showMessage);
  };

  return (
    showMessage && (
      <>
        <div className="notifyMain">
          {isMessage2 ? (
            <Message2 message="Message 2" handleDelete={handleDelete} />
          ) : (
            <Message1
              message={isMessage1}
              onComplete={handleCompleteMessage1}
            />
          )}
        </div>
        <img
          src="/images/monkey.png"
          alt="Loading Monkey..."
          id="monkey"
          width={100}
        />
      </>
    )
  );
};

export default MessageMain;
