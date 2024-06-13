import React, { useEffect, useState } from "react";
import NavbarContent from "./NavbarContent";
import { useLocation, useNavigate } from "react-router";
import {
  DeleteRequest,
  GetListRequestByStatus,
  GetListRequestByUser,
  QuantityStatusRequest,
} from "../models/modelRequestGate";
import {
  GetNicknameUserFromEmail,
  GetNicknameUserFromID,
} from "../models/modelUser";
import "../styles/listRequest.css";

const ContentListRequest = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const [listRequest, setListRequest] = useState([]);
  const [open, setOpen] = useState(0);
  const [closed, setClosed] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [resolved, setResolved] = useState(0);
  let name = "";

  // useEffect(() => {
  //   const {
  //     openQuantity,
  //     inProgressQuantity,
  //     resolvedQuantity,
  //     closedQuantity,
  //   } = QuantityStatusRequest(email);
  //   setOpen(openQuantity);
  //   setInProgress(inProgressQuantity);
  //   setResolved(resolvedQuantity);
  //   setClosed(closedQuantity);
  // }, [listRequest]);

  const handleWatchRequest = (idRequest) => {
    navigate("/view/REQUESTGATE", { state: { email, idRequest } });
  };

  const handleColorStatus = (status) => {
    if (status === "Open" || status === "Feedback" || status === "Tasks") {
      return "#ED8077";
    } else if (
      status === "In Progress" ||
      status === "Report" ||
      status === "Bugs"
    ) {
      return "#4488C5";
    } else if (
      status === "Resolved" ||
      status === "Feature Request" ||
      status === "Request"
    ) {
      return "#5EB5A6";
    } else {
      return "#A1AF2F";
    }
  };

  const handleDeleteRequest = ({ request }) => {
    let check = window.confirm("Do you want to delete this request?");
    if (check) {
      DeleteRequest(request.id);
      setIsMessage("Deleted Request Successfully!");
    }
    setListRequest(GetListRequestByUser(email));
  };

  const handleNickname = (idRequest) => {
    if (name === GetNicknameUserFromID(idRequest)) {
      return "You";
    } else {
      return GetNicknameUserFromID(idRequest);
    }
  };

  const handleListRequestByStatus = (event) => {
    setListRequest(
      GetListRequestByStatus(GetListRequestByUser(email), event.target.value)
    );
  };

  return (
    <div className="listRequest">
      <NavbarContent topic={"Request Gate"} note={"(REQUESTGATE)"} />
      <div className="contentListRequest">
        <div className="header">
          <select onChange={handleListRequestByStatus}>
            <option>All</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
          <div className="header-totalStatus">
            <div>
              <p>Open:</p>
              <h5>{open}</h5>
            </div>
            <div>
              <p>In Progress:</p>
              <h5>{inProgress}</h5>
            </div>
            <div>
              <p>Resolved:</p>
              <h5>{resolved}</h5>
            </div>
            <div>
              <p>Closed:</p>
              <h5>{closed}</h5>
            </div>
          </div>
        </div>
        <div className="listRequest-content">
          {listRequest &&
            listRequest.map((request) => (
              <div className="detailRequest" key={request.id}>
                <img src="/images/user.png" alt="Loading..." />
                <h3 style={{ color: "#37BBFC" }}>
                  {handleNickname(request.idSender)}
                </h3>
                <h3>{request.subject}</h3>
                <h3 style={{ color: handleColorStatus(request.type) }}>
                  {request.type}
                </h3>
                <h3 style={{ color: handleColorStatus(request.category) }}>
                  {request.category}
                </h3>
                <h3 style={{ color: "#FFC071" }}>
                  {handleNickname(request.idReceiver)}
                </h3>
                <h3 style={{ color: handleColorStatus(request.status) }}>
                  {request.status}
                </h3>
                <img
                  src="/images/eye.png"
                  alt="Loading..."
                  onClick={() => handleWatchRequest(request.id)}
                />
                {request.status === "Open" && (
                  <i
                    className="bx bx-trash"
                    onClick={() => handleDeleteRequest({ request })}
                  ></i>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ContentListRequest;
