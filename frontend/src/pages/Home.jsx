import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  GetDepartmentOfUser,
  GetIDUserFromEmail,
  GetNicknameUserFromEmail,
  GetNicknameUserFromID,
} from "../models/modelUser";
import {
  GetListRequestByStatus,
  GetListRequestByUser,
} from "../models/modelRequestGate";
import { format } from "date-fns";
import {
  GetContentCommentFromID,
  GetNameUserCommentFromID,
} from "../models/modelComment";
import { GetNameDepartmentFromID } from "../models/modelDepartment";
import NavbarContent from "../components/NavbarContent";
import "../styles/requestgate.css";

const DetailContentRequest = () => {
  let location = useLocation();
  let navigate = useNavigate();
  // let emailUser = location.state.email;
  const [listRequest, setListRequest] = useState([]);
  const [displayDropdown, setDisplayDropdown] = useState(false);
  let count = 0;
  let open = 0;
  let inProgress = 0;
  let resolved = 0;
  let closed = 0;
  // let name = GetNicknameUserFromEmail(emailUser);
  let percentClosed;

  // useEffect(() => {
  //   setListRequest(GetListRequestByUser(emailUser));
  // }, []);

  const handleAddIssue = () => {
    navigate("/add/REQUESTGATE");
  };

  const formatDate = (timestamp) => {
    return format(new Date(timestamp), "EEE MMM.dd, yyyy");
  };

  const handleViewIssue = (idRequest) => {
    // navigate("/view/REQUESTGATE", {
    //   state: { email: emailUser, idRequest },
    // });
  };

  // check name edit
  // if is user using => you
  const handleNickname = (idRequest) => {
    if (name === GetNicknameUserFromID(idRequest)) {
      return "You";
    } else {
      return GetNicknameUserFromID(idRequest);
    }
  };

  const handleDisplaySelectFilterRequest = () => {
    // setDisplayDropdown(!displayDropdown);
  };

  const handleListRequestByOption = (value) => {
    // setListRequest(
    //   GetListRequestByStatus(GetListRequestByUser(emailUser), value)
    // );
    // setOptionRequest(value);
  };

  //handle format time => Dec mon. dd/year
  const handleTimeNotify = (timestamp) => {
    // const now = new Date();
    // const timestampDate = new Date(timestamp);
    // const difference = now - timestampDate;
    // if (difference < 60000) {
    //   return "less than a minute ago";
    // } else if (difference < 3600000) {
    //   return `${Math.floor(difference / 60000)} minutes ago`;
    // } else if (difference < 86400000) {
    //   return `${Math.floor(difference / 3600000)} hours ago`;
    // } else if (difference < 172800000) {
    //   return "less than a day ago";
    // } else {
    //   return "less than days ago";
    // }
  };

  return (
    <div className="contentRequest">
      <NavbarContent topic={"Request Gate"} note={"(REQUESTGATE)"} />
      <div className="detailContentRequest">
        <div className="listRequest">
          <div className="option">
            <h1>Project Home</h1>
            <p>: Recent Updates</p>
            <img src="/images/wifi.png" alt="Loadding" width={15} />
            <div onClick={handleDisplaySelectFilterRequest}>
              <img src="/images/option.png" width={15} />
              <p>View Options</p>
              <div
                className="dropdown"
                style={{ display: displayDropdown ? "block" : "" }}
              >
                <a onClick={() => handleListRequestByOption("All")}>All</a>
                <a onClick={() => handleListRequestByOption("Open")}>Open</a>
                <a onClick={() => handleListRequestByOption("In Progress")}>
                  In Progress
                </a>
                <a onClick={() => handleListRequestByOption("Resolved")}>
                  Resolved
                </a>
                <a onClick={() => handleListRequestByOption("Closed")}>
                  Closed
                </a>
              </div>
            </div>
            <p>Filter: All</p>
          </div>
          {listRequest.length > 0 ? (
            ""
          ) : (
            <div className="addIssue">
              <div className="project">
                <img src="/images/project.png" alt="Loadding..." />
              </div>
              <div className="caption">
                <h3>No issues have been added to this project, yet.</h3>
                <div>
                  Use "<p style={{ color: "#46A48B" }}>Add Issue</p>" to start
                  managing this project
                </div>
                <p>
                  Once you add an issue, all project members will be notified
                </p>
                <button onClick={handleAddIssue}>Add Issue</button>
              </div>
            </div>
          )}
          {listRequest.length > 0 &&
            listRequest.map((request) => {
              count = count + 1;
              if (request.status === "Open") {
                open++;
              } else if (request.status === "In Progress") {
                inProgress++;
              } else if (request.status === "Resolved") {
                resolved++;
              } else if (request.status === "Closed") {
                closed++;
              }
              percentClosed = (
                (closed / (open + inProgress + resolved + closed)) *
                100
              ).toFixed(2);
              return (
                <div
                  className="inforRecent"
                  key={request.id}
                  onClick={() => handleViewIssue(request.id)}
                >
                  <div className="dateRecent">
                    <p style={{ float: "left" }}>{formatDate(request.date)}</p>
                    <p style={{ float: "right" }}>
                      {GetNameDepartmentFromID(
                        GetDepartmentOfUser(request.idSender)
                      )}
                    </p>
                  </div>
                  <div className="detailRecent">
                    <div className="memberEdit">
                      <img src="/images/user1.png" width={40} height={40} />
                      <h3>
                        {handleNickname(request.idSender)} edited the{" "}
                        <a>members</a> of this project
                      </h3>
                      <p>
                        {request.nearCommentTime !== "" &&
                        GetContentCommentFromID(request.nearCommentTime) !== ""
                          ? `${GetContentCommentFromID(
                              request.nearCommentTime
                            )}`
                          : handleTimeNotify(request.date)}
                      </p>
                    </div>
                    <div className="detailEdit">
                      <div>
                        <img src="/images/company.png" width={20} height={20} />
                        <h3>Request Gate (REQUESTGATE)</h3>
                        {request.nearCommentTime && (
                          <p>
                            - Comment by{" "}
                            {handleNickname(
                              GetNameUserCommentFromID(request.nearCommentTime)
                            )}
                          </p>
                        )}
                        {request.idUserEdit && (
                          <p>- Edit by {handleNickname(request.idUserEdit)}</p>
                        )}
                      </div>
                      <div>
                        <img src="/images/user1.png" width={20} height={20} />
                        <p>
                          {handleNickname(request.idReceiver)} has been added as
                          a project member.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          {count > 4 && (
            <style>
              {`
            .listRequest {
              overflow-y: scroll;
            }
          `}
            </style>
          )}
        </div>
        <div className="parameter">
          <div className="statusRequest">
            <h3>Status</h3>
            <div className="parameterStatus">
              <p>{percentClosed}% Closed</p>
              <div className="detailParameter">
                <div>
                  <p>Open</p>
                  <a style={{ backgroundColor: "#ED8077" }}>{open}</a>
                </div>
                <div>
                  <p>In Progress</p>
                  <a style={{ backgroundColor: "#4488C5" }}>{inProgress}</a>
                </div>
                <div>
                  <p>Resolved</p>
                  <a style={{ backgroundColor: "#5EB5A6" }}>{resolved}</a>
                </div>
                <div>
                  <p>Closed</p>
                  <a style={{ backgroundColor: "#A1AF2F" }}>{closed}</a>
                </div>
              </div>
            </div>
          </div>
          <div className="categoryRequest">
            <div>
              <h3>Category</h3>
              <div>
                <i className="bx bxs-pencil"></i>
              </div>
            </div>
            <div>
              <p>This project doesn't have any category yet.</p>
              <a>Edit Categories</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailContentRequest;
