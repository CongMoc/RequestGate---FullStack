import React, { useState, useEffect } from "react";
import MessageMain from "../components/MessageMain";
import "../styles/contentAdmin.css";
import { useLocation, useNavigate } from "react-router";
import {
  GetListRequestAssigneeByAdmin,
  GetListRequestAssigneeToAdmin,
  GetListRequestByStatus,
  GetListRequestByUser,
  GetListRequestFromDueDateOfAdmin,
  SumDuedateAssigneeToAdmin,
  SumRequestAssigneeToAdmin,
} from "../models/modelRequestGate";
import {
  GetDepartmentOfUser,
  GetNicknameUserFromEmail,
  GetNicknameUserFromID,
} from "../models/modelUser";
import { format } from "date-fns";
import { GetNameDepartmentFromID } from "../models/modelDepartment";
import {
  GetContentCommentFromID,
  GetNameUserCommentFromID,
} from "../models/modelComment";

const ContentAdmin = () => {
  const [addUser, setAddUser] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrollProject, setScrollProject] = useState(false);
  // let email = location.state.email;
  const [scrollIssue, setScrollIssue] = useState(false);
  const [selected, setSelected] = useState(0);
  const [selectDue, setSelectDue] = useState(2);
  const [requestAdmin, setRequestAdmin] = useState();
  // GetListRequestAssigneeToAdmin(email)
  const [newRequest, setNewRequest] = useState();
  // GetListRequestAssigneeToAdmin(email)
  let count = 0;
  const { assignToMe, createdByMe } = 0;
  const [days, setDays] = useState(0);
  const [today, setToday] = useState(0);
  const [overdue, setOverdue] = useState(0);
  const [scrollBacklog, setScrollBacklog] = useState(false);

  const [listRequest, setListRequest] = useState([]);
  const [optionRequest, setOptionRequest] = useState("All");
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [displayRecent, setDisplayRecent] = useState(false);
  // let name = GetNicknameUserFromEmail(email);

  const handleScrollBacklog = () => {
    setScrollBacklog(!scrollBacklog);
  };

  useEffect(() => {
    // const [daysCount, todayCount, overdueCount] = 0;
    setDays(0);
    setToday(0);
    setOverdue(0);
  }, [selected]);

  // useEffect(() => {
  //   setListRequest(GetListRequestByUser(email));
  // }, [location.state]);

  const handleScrollIssueOfAdmin = () => {
    setScrollIssue(!scrollIssue);
  };

  const handleAssigneeToAdmin = () => {
    // setRequestAdmin(GetListRequestAssigneeToAdmin(email));
    // setNewRequest(GetListRequestAssigneeToAdmin(email));
    // setSelected(0);
    // setSelectDue(2);
  };

  const handleAssigneeByAdmin = () => {
    // setRequestAdmin(GetListRequestAssigneeByAdmin(email));
    // setNewRequest(GetListRequestAssigneeByAdmin(email));
    // setSelected(1);
    // setSelectDue(2);
  };

  const handleAllRequest = () => {
    setRequestAdmin(newRequest);
    setSelectDue(2);
  };

  const handleGetListRequestThan4Days = () => {
    const request = GetListRequestFromDueDateOfAdmin(newRequest, 4);
    setRequestAdmin(request);
    setSelectDue(4);
  };

  const handleGetListRequestToday = () => {
    const request = GetListRequestFromDueDateOfAdmin(newRequest, 0);
    setRequestAdmin(request);
    setSelectDue(0);
  };

  const handleGetListRequestOverdue = () => {
    const request = GetListRequestFromDueDateOfAdmin(newRequest, 1);
    setRequestAdmin(request);
    setSelectDue(1);
  };

  const handleTimeNotifyMyIssue = (timestamp) => {
    const now = new Date();
    const timestampDate = new Date(timestamp);
    const difference = timestampDate - now;
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const differenceInDays = difference / oneDayInMilliseconds;
    if (differenceInDays < 1 && timestampDate.getDate() === now.getDate()) {
      return "Today";
    } else if (differenceInDays < 0) {
      return "Overdue";
    } else if (differenceInDays > 4) {
      return "More than 4 days ago";
    } else {
      return "Less than 4 days ago";
    }
  };

  const handleComeToHomeRequest = () => {
    // navigate("/projects/REQUESTGATE", { state: { email } });
  };

  const handleScrollProject = () => {
    setScrollProject(!scrollProject);
  };

  const handleViewIssue = (idRequest) => {
    // navigate("/view/REQUESTGATE", {
    //   state: { email: email, idRequest },
    // });
  };

  const formatDate = (timestamp) => {
    return format(new Date(timestamp), "EEE MMM.dd, yyyy");
  };

  const handleNickname = (idRequest) => {
    // if (name === GetNicknameUserFromID(idRequest)) {
    //   return "You";
    // } else {
    //   return GetNicknameUserFromID(idRequest);
    // }
  };

  const handleTimeNotify = (timestamp) => {
    const now = new Date();
    const timestampDate = new Date(timestamp);
    const difference = now - timestampDate;
    if (difference < 60000) {
      return "less than a minute ago";
    } else if (difference < 3600000) {
      return `${Math.floor(difference / 60000)} minutes ago`;
    } else if (difference < 86400000) {
      return `${Math.floor(difference / 3600000)} hours ago`;
    } else if (difference < 172800000) {
      return "less than a day ago";
    } else {
      return "less than days ago";
    }
  };

  const handleDisplaySelectFilterRequest = () => {
    setDisplayDropdown(!displayDropdown);
  };

  const handleDisplayRecentRequest = () => {
    setDisplayRecent(!displayRecent);
  };

  const handleListRequestByOption = (value) => {
    // setListRequest(GetListRequestByStatus(GetListRequestByUser(email), value));
    // setOptionRequest(value);
  };

  const handleClickAddUser = () => {
    navigate("/addUser");
  };

  const handleMoveToRequestGate = () => {
    navigate("/add/REQUESTGATE");
  };

  return (
    <>
      <MessageMain />
      <div className="contentAdmin">
        <div className="areaAdmin">
          <div className="company">
            <img
              src="/images/company.png"
              alt="Loading..."
              width={20}
              height={20}
            />
          </div>
          <div className="area menu">NA</div>
          <img
            src="/images/setting.png"
            alt="Loading..."
            width={30}
            height={30}
          />
        </div>
        <h3>Get started with your new Backlog Space!</h3>
        <div className="functionAdmin">
          <div className="functionDetail">
            <div className="project">
              <img src="/images/project.png" alt="Loadding..." />
            </div>
            <div className="caption">
              <h3>
                Add Project{" "}
                <img src="/images/checkbox.png" width={15} height={15} />
              </h3>
              <p>First, add a project that you would like to work on.</p>
            </div>
          </div>
          <div className="add functionDetail">
            <div className="user project">
              <img src="/images/user2.png" alt="Loadding..." />
            </div>
            <div className="caption">
              <h3>Add User</h3>
              <p>
                Invite members to this Space to work on your projects with you.
              </p>
              <a onClick={handleClickAddUser}>Add</a>
            </div>
          </div>
          <div className="add functionDetail">
            <div className="user project">
              <img src="/images/issue.png" alt="Loadding..." />
            </div>
            <div className="caption">
              <h3>Add Issue</h3>
              <p>Finally, add issues that you would like to work on.</p>
              <a onClick={handleMoveToRequestGate}>Add</a>
            </div>
          </div>
        </div>
        <div className="grid-content">
          <div>
            <div className="option">
              {scrollProject === true ? (
                <i
                  className="bx bx-chevron-down"
                  onClick={handleScrollProject}
                ></i>
              ) : (
                <i
                  className="bx bx-chevron-up"
                  onClick={handleScrollProject}
                ></i>
              )}
              <h1>Projects</h1>
              <div className="button">
                <img src="/images/search.png" />
              </div>
              <div className="button">
                <i className="bx bx-plus"></i>
              </div>
            </div>
            <div
              className="optionBar"
              onClick={handleComeToHomeRequest}
              style={{ height: scrollProject ? "0%" : "" }}
            >
              <div className="company">
                <img
                  src="/images/company.png"
                  alt="Loading..."
                  width={20}
                  height={20}
                />
              </div>
              <div>
                <h1>Request Gate</h1>
                <p>REQUESTGATE</p>
              </div>
            </div>
            <div className="option">
              {scrollIssue === true ? (
                <i
                  className="bx bx-chevron-down"
                  onClick={handleScrollIssueOfAdmin}
                ></i>
              ) : (
                <i
                  className="bx bx-chevron-up"
                  onClick={handleScrollIssueOfAdmin}
                ></i>
              )}
              <h1>My Issues</h1>
              <div className="button">
                <img src="/images/search.png" />
              </div>
              <div className="calendar">
                <i className="bx bx-calendar"></i>
                <p>Calendar Import</p>
              </div>
              <div className="batch">
                <i className="bx bx-edit"></i>
                <p>Batch Update</p>
              </div>
              <div className="gantt">
                <i className="bx bx-bar-chart bx-rotate-90"></i>
                <p>Gantt Chart</p>
              </div>
            </div>
            <div className="Issues" style={{ height: scrollIssue ? "0%" : "" }}>
              <div className="event">
                <div>
                  <label>Filters:</label>
                  <a
                    style={{
                      backgroundColor: selected === 0 ? "#2c9a7a" : "",
                      color: selected === 0 ? "white" : "",
                    }}
                    onClick={handleAssigneeToAdmin}
                  >
                    Assigned to me ({assignToMe})
                  </a>
                  <a
                    style={{
                      backgroundColor: selected === 1 ? "#2c9a7a" : "",
                      color: selected === 1 ? "white" : "",
                    }}
                    onClick={handleAssigneeByAdmin}
                  >
                    Created by me ({createdByMe})
                  </a>
                </div>
                <div>
                  <label>Due date:</label>
                  <a
                    onClick={handleAllRequest}
                    style={{
                      backgroundColor: selectDue === 2 ? "#2c9a7a" : "",
                      color: selectDue === 2 ? "white" : "",
                    }}
                  >
                    All
                  </a>
                  <a
                    onClick={handleGetListRequestThan4Days}
                    style={{
                      backgroundColor: selectDue === 4 ? "#2c9a7a" : "",
                      color: selectDue === 4 ? "white" : "",
                    }}
                  >
                    4 Days ({days})
                  </a>
                  <a
                    onClick={handleGetListRequestToday}
                    style={{
                      backgroundColor: selectDue === 0 ? "#2c9a7a" : "",
                      color: selectDue === 0 ? "white" : "",
                    }}
                  >
                    Due Today ({today})
                  </a>
                  <a
                    onClick={handleGetListRequestOverdue}
                    style={{
                      backgroundColor: selectDue === 1 ? "#2c9a7a" : "",
                      color: selectDue === 1 ? "white" : "",
                    }}
                  >
                    Overdue ({overdue})
                  </a>
                </div>
              </div>
              <div className="navbarIssues">
                <p style={{ width: "20%" }}>Sender</p>
                <p style={{ width: "20%" }}>Subject</p>
                <p style={{ width: "20%" }}>Receiver</p>
                <p style={{ width: "20%" }}>Status</p>
                <p style={{ width: "20%" }}>
                  Due <i className="bx bxs-up-arrow"></i>
                </p>
              </div>
              <div
                className="listIssues"
                style={{ overflowY: count > 3 && "scroll" }}
              >
                {/* {requestAdmin.length > 0
                  ? requestAdmin.map((request) => {
                      count++;
                      return (
                        <div className="detailListIssue" key={request.id}>
                          <p>{GetNicknameUserFromID(request.idSender)}</p>
                          <p>{request.subject}</p>
                          <p>{GetNicknameUserFromID(request.idReceiver)}</p>
                          <p>{request.status}</p>
                          <p>{handleTimeNotifyMyIssue(request.date)}</p>
                        </div>
                      );
                    })
                  : "No issue to display."} */}
              </div>
            </div>
            <div className="option">
              {scrollBacklog === true ? (
                <i
                  className="bx bx-chevron-down"
                  onClick={handleScrollBacklog}
                ></i>
              ) : (
                <i
                  className="bx bx-chevron-up"
                  onClick={handleScrollBacklog}
                ></i>
              )}
              <h1>Backlog News</h1>
            </div>
            <div
              className="backlogNews"
              style={{ height: scrollBacklog ? "0%" : "" }}
            >
              <div>
                <h1>
                  How smart capacity planning can save projects from disaster
                  <img src="/images/page.png" />
                </h1>
                <p>
                  It's no secret that project managers have a lot on their
                  plates. But what many people don't realize is that one of the
                  mo...
                </p>
              </div>
              <div>
                <h1>
                  Conway's law: how can organizations use it to their advantage?
                  <img src="/images/page.png" />
                </h1>
                <p>
                  Have you ever worked in a place that had really dysfunctional
                  meetings? You know the type. Conversations go round an...
                </p>
              </div>
              <div>
                <h1>
                  What is a retainer? Pro tips to navigate this business
                  agreement
                  <img src="/images/page.png" />
                </h1>
                <p>
                  It's no secret that project managers have a lot on their
                  plates. But what many people don't realize is that one of the
                  mo...
                </p>
              </div>
            </div>
          </div>
          <div className="recent">
            <div className="option">
              {displayRecent === true ? (
                <i
                  className="bx bx-chevron-down"
                  onClick={handleDisplayRecentRequest}
                ></i>
              ) : (
                <i
                  className="bx bx-chevron-up"
                  onClick={handleDisplayRecentRequest}
                ></i>
              )}
              <h1>Recent Updates</h1>
              <div onClick={handleDisplaySelectFilterRequest}>
                <img src="/images/option.png" />
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
              <p>Filter: {optionRequest}</p>
            </div>
            {/* {listRequest.length > 0
              ? listRequest.map((request) => {
                  count++;
                  return (
                    <div
                      className="inforRecent"
                      key={request.id}
                      onClick={() => handleViewIssue(request.id)}
                      style={{ height: displayRecent === true ? "0%" : "" }}
                    >
                      <div className="dateRecent">
                        <p style={{ float: "left" }}>
                          {formatDate(request.date)}
                        </p>
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
                            GetContentCommentFromID(request.nearCommentTime) !==
                              ""
                              ? `${GetContentCommentFromID(
                                  request.nearCommentTime
                                )}`
                              : handleTimeNotify(request.date)}
                          </p>
                        </div>
                        <div className="detailEdit">
                          <div>
                            <img
                              src="/images/company.png"
                              width={20}
                              height={20}
                            />
                            <h3>Request Gate (REQUESTGATE)</h3>
                            {request.nearCommentTime && (
                              <p>
                                - Comment by{" "}
                                {handleNickname(
                                  GetNameUserCommentFromID(
                                    request.nearCommentTime
                                  )
                                )}
                              </p>
                            )}
                            {request.idUserEdit && (
                              <p>
                                - Edit by {handleNickname(request.idUserEdit)}
                              </p>
                            )}
                          </div>
                          <div>
                            <img
                              src="/images/user1.png"
                              width={20}
                              height={20}
                            />
                            <p>
                              {handleNickname(request.idReceiver)} has been
                              added as a project member.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : ""} */}
            {count > 3 && (
              <style>
                {`
            .recent {
              overflow-y: scroll;
            }
          `}
              </style>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentAdmin;
