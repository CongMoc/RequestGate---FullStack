import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  GetIDUserFromEmail,
  GetListAssignee,
  GetNicknameUserFromID,
  ListManager,
} from "../models/modelUser";
import { format } from "date-fns";
import { Message } from "./Message";
import {
  GetListCommentFromLocalStorageByIDRequets,
  SaveNewCommentToLocalStorage,
} from "../models/modelComment";
import {
  GetListRequestFromID,
  UpdateRequest,
} from "../models/modelRequestGate";
import {
  CheckDepartmentFromEmailUser,
  GetNameDepartmentFromID,
} from "../models/modelDepartment";
import { CheckRole, CheckRoleFromIDUser } from "../models/modelLogin";
import NavbarContent from "./NavbarContent";
import "../styles/viewIssue.css";

const DetailViewIssue = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let idRequest = location.state.idRequest;
  let requestDetail = [];
  let color = "";
  let listAssignee = [];
  let role = 0;

  //value of request
  // const [type, setType] = useState(requestDetail.type);
  // const [text, setText] = useState(requestDetail.content);
  // const [idSender, setIDSender] = useState(requestDetail.idSender);
  // const [idReceiver, setIDReceiver] = useState(requestDetail.idReceiver);
  // const [idAssignee, setIDAssignee] = useState(requestDetail.idAssignee);
  // const [subject, setSubject] = useState(requestDetail.subject);
  // const [category, setCategory] = useState(requestDetail.category);
  // const [status, setStatus] = useState(requestDetail.status);
  // const [dueDate, setDueDate] = useState(requestDetail.date);
  // const [isMessage, setIsMessage] = useState();
  // const [resolved, setResolved] = useState(requestDetail.resolution);
  // const [idUserEdit, setIDUserEdit] = useState(requestDetail.idUserEdit);

  //value of Comment
  // date comment use by date now, so we'll use id like date
  let listComment = GetListCommentFromLocalStorageByIDRequets(idRequest);
  let count = listComment.length;
  const [idComment, setIDComment] = useState();
  const [idUserComment, setIDUserComment] = useState([]);
  const [idNewAssignee, setIDNewAssignee] = useState(requestDetail.idAssignee);
  const [contentComment, setContentComment] = useState("");
  const [newStatus, setNewStatus] = useState(requestDetail.status);
  const [newDate, setNewDate] = useState(requestDetail.date);
  const [selectAssignee, setSelectedAssign] = useState([]);
  const [selectResolved, setSelectResolved] = useState("");

  //zoom with request, comment anb detail comment
  const [zoom, setZoom] = useState(true);
  const [zoomComment, setZoomComment] = useState(false);
  const [zoomEdit, setZoomEdit] = useState(true);

  const handleAddComment = () => {
    // let comment = [];
    // // Check change in comment to update request and create content comment
    // // If change to push array to save
    // if (status !== newStatus && newStatus !== "") {
    //   comment.push(`Status: ${status} -> ${newStatus}`);
    // }
    // if (idNewAssignee !== idAssignee) {
    //   if (idAssignee === "") {
    //     comment.push(`Assignee: empty -> ${selectAssignee}`);
    //   } else {
    //     comment.push(
    //       `Assignee: ${GetNicknameUserFromID(
    //         idAssignee
    //       )} -> ${GetNicknameUserFromID(idNewAssignee)}`
    //     );
    //   }
    // }
    // if (resolved !== selectResolved && selectResolved !== "") {
    //   if (resolved === "") {
    //     comment.push(`Resolved: empty -> ${selectResolved}`);
    //   } else {
    //     comment.push(`Resolved: ${resolved} -> ${selectResolved}`);
    //   }
    // }
    // if (dueDate < newDate && newDate !== "" && newDate !== undefined) {
    //   comment.push(`Due date: ${dueDate} -> ${newDate}`);
    // }
    // // Check due date comment with time now
    // if (idComment >= newDate) {
    //   setIsMessage("Date comment is not less than date request or time now!!!");
    // } else {
    //   const StatusDepartment = CheckDepartmentFromEmailUser(email);
    //   const manager = CheckRoleFromIDUser(idAssignee);
    //   // Check department is ban?
    //   // If department is ban, assignee is manager ->  error
    //   if (role === 2 && StatusDepartment === false && manager === 1) {
    //     setIsMessage(
    //       "Your department is banned... You cant request to Manager"
    //     );
    //   } else {
    //     if (comment.length > 0 || contentComment !== "") {
          const comments = {
            id: idComment,
            idRequest: idRequest,
            idUserComment: idUserComment,
            change: comment,
            content: contentComment,
          };
          const request = {
            id: idRequest,
            type: type,
            idSender: idSender,
            idReceiver: idReceiver,
            idAssignee: idNewAssignee,
            subject: subject,
            content: text,
            status: newStatus,
            category: category,
            date: newDate,
            idUserEdit: idUserEdit,
            resolution: resolved,
            nearCommentTime: idComment,
          };
    //       SaveNewCommentToLocalStorage(comments);
    //       setIsMessage("Add comment is successfully!");
    //       UpdateRequest(idRequest, request);
    //       handleZoomIn();
    //       setContentComment("");
    //       setSelectedAssign("");
    //       setSelectResolved("");
    //       setNewStatus("");
    //       setStatus(newStatus);
    //       handleZoomEditComment();
    //       requestDetail = GetListRequestFromID(idRequest);
    //     } else {
    //       setIsMessage("Nothing to change!!!");
    //     }
    //   }
    // }
  };

  // useEffect(() => {
  //   if (status === "Open") {
  //     color = "#ED8077";
  //   } else if (status === "In Progress") {
  //     color = "#4488C5";
  //   } else if (status === "Resolved") {
  //     color = "#5EB5A6";
  //   } else {
  //     color = "#A1AF2F";
  //   }
  // }, [status])

  const formatDate = (timestamp) => {
    return format(new Date(timestamp), "yyyy-MM-dd");
  };

  // check color status
  // if (status === "Open") {
  //   color = "#ED8077";
  // } else if (status === "In Progress") {
  //   color = "#4488C5";
  // } else if (status === "Resolved") {
  //   color = "#5EB5A6";
  // } else {
  //   color = "#A1AF2F";
  // }

  // set id comment by time now
  // useEffect(() => {
  //   const generateCurrentDateTimeId = () => {
  //     const currentDateTime = new Date();
  //     return currentDateTime.toISOString();
  //   };
  //   // Update the current datetime id every second
  //   const time = setInterval(() => {
  //     setIDComment(generateCurrentDateTimeId());
  //   }, 1000);
  //   // Clear the interval on component unmount
  //   return () => clearInterval(time);
  // }, []);

  // // check status before edit request
  // const handleEditRequest = () => {
  //   if (status !== "Open") {
  //     setIsMessage(
  //       "This request can't edit... because admin or manager watched!"
  //     );
  //   } else {
  //     navigate("/edit/REQUESTGATE", {
  //       state: { email, request: requestDetail },
  //     });
  //   }
  // };

  // Zoom detail request
  const handleZoomOut = () => {
    setZoom(false);
  };

  const handleZoomIn = () => {
    setZoom(true);
  };

  //Take id assignee
  const handleAssigneeChange = (event) => {
    setSelectedAssign(event.target.value);
    const selectedId =
      event.target.options[event.target.selectedIndex].getAttribute("id-user");
    setIDNewAssignee(selectedId);
  };

  const handleResolvedChange = (event) => {
    setSelectResolved(event.target.value);
  };

  // Zoom list comment
  const handleZoomListCommentOfRequest = () => {
    setZoomComment(!zoomComment);
  };

  // Zoom component comment
  const handleZoomEditComment = () => {
    setZoomEdit(!zoomEdit);
    setNewStatus(status);
    setNewDate(dueDate);
    setSelectedAssign(GetNicknameUserFromID(requestDetail.idReceiver));
    setSelectResolved(resolved);
  };

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
  };

  const handleCommentChange = (event) => {
    setContentComment(event.target.value);
  };

  const handleInputDateChange = (event) => {
    setNewDate(event.target.value);
  };

  // recommendation
  // let recommendationStatus = "";
  // let recommendationAssignee = "";
  // let recommendationResolution = "";
  // if (status === "Open") {
  //   recommendationStatus = "In Progress";
  // } else if (status === "In Progress") {
  //   recommendationStatus = "Revolved";
  // } else {
  //   recommendationStatus = "Closed";
  // }

  // if (idSender === idReceiver) {
  //   recommendationAssignee = "Assign to myself";
  // } else {
  //   recommendationAssignee = "";
  // }

  // if (resolved === "") {
  //   recommendationResolution = "Set to 'Fixed' ";
  // } else {
  //   recommendationResolution = "";
  // }

  // // add scroll to list comment
  // if (listComment.length > 2) {
  //   scroll = "scroll";
  // } else {
  //   scroll = "";
  // }

  return (
    <div className="viewIssue">
      <NavbarContent topic={"Request Gate"} note={"(REQUESTGATE)"} />
      <div className="detailViewIssue">
        {isMessage && (
          <Message message={isMessage} setIsMessage={setIsMessage} />
        )}
        <div className="typeIssue">
          <a className="floatingLeft">{type}</a>
          <h5 className="floatingLeft">REQUESTGATE-1</h5>
          <div>
            <img src="/images/note.png" />
          </div>
          <a className="floatingRight" style={{ backgroundColor: `${color}` }}>
            {/* {status} */}
          </a>
          <p className="floatingRight">Due date - {formatDate(newDate)}</p>
        </div>
        <div className="navbarViewIssue">
          <h1 className="floatingLeft">{subject}</h1>
          <div className="navigationIssue floatingRight">
            <a onClick={handleZoomOut}>
              <img src="/images/eye.png" />
              <p>Watch</p>
            </a>
            <a onClick={handleEditRequest}>
              <i className="bx bxs-pencil"></i>Edit
            </a>
            <a>
              <img src="/images/menu.png" />
            </a>
          </div>
        </div>
        <div
          className="contentDetailIssue"
          style={{ height: zoom ? "20%" : "45%" }}
        >
          <div className="inforIssue" style={{ height: zoom ? "35%" : "15%" }}>
            <img
              src="/images/user1.png"
              alt="Loadding..."
              className="floatingLeft"
            />
            <div className="inforDetail floatingLeft">
              <h3>{GetNicknameUserFromID(requestDetail.idSender)}</h3>
              <p>Created {formatDate(idRequest)}</p>
            </div>
            <div>
              <a className="floatingRight">
                <i className="bx bxs-quote-alt-right"></i>
                <p>0</p>
              </a>
            </div>
            <div>
              <a className="floatingRight">
                <i className="bx bxs-star"></i>
                <p>Quote</p>
              </a>
            </div>
          </div>
          <div className="text" style={{ height: zoom ? "40%" : "50%" }}>
            {text}
          </div>
          <div
            className="assignee floatingLeft"
            style={{ display: zoom ? "none" : "flex" }}
          >
            <p>Assignee</p>
            <div>
              <img src="/images/user1.png" />
              <h5>{GetNicknameUserFromID(idReceiver)}</h5>
            </div>
          </div>
          <div
            className="category floatingRight"
            style={{ display: zoom ? "none" : "flex" }}
          >
            <p>Category</p>
            <h5>{category}</h5>
          </div>
          <div
            className="resolution floatingLeft"
            style={{ display: zoom ? "none" : "flex" }}
          >
            <p>Resolution</p>
            <h5>{resolved}</h5>
          </div>
          <div className="scrollDetail floatingLeft">
            <img
              src="/images/top.png"
              style={{ display: zoom ? "none" : "" }}
              onClick={handleZoomIn}
            />
            <img
              src="/images/bottom.png"
              style={{ display: zoom ? "" : "none" }}
              onClick={handleZoomOut}
            />
          </div>
        </div>
        <div className="contentComment">
          <div>
            <h3>Comment</h3>
            <p>({count})</p>
          </div>
          <div>
            <h3>View: </h3>
            <a>Show all</a>
            <p>Show only comments</p>
            {listComment.length > 0 ? (
              <div onClick={handleZoomListCommentOfRequest}>
                <i
                  className="bx bx-vertical-bottom"
                  style={{ display: zoomComment ? "" : "none" }}
                ></i>
                <i
                  className="bx bx-vertical-top"
                  style={{ display: zoomComment ? "none" : "" }}
                ></i>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {listComment.length > 0 ? (
          <div
            className="listComment"
            style={{
              overflowY: count > 3 ? "scroll" : "",
              height: zoomComment ? "0%" : "",
            }}
          >
            {listComment.map((comment) => {
              return (
                <div key={comment.id}>
                  <hr />
                  <div className="detailComment">
                    <div className="inforIssue">
                      <img
                        src="/images/user1.png"
                        alt="Loadding..."
                        className="floatingLeft"
                      />
                      <div className="inforDetail floatingLeft">
                        <h3>{GetNicknameUserFromID(comment.idUserComment)}</h3>
                        <p>{formatDate(comment.id)}</p>
                      </div>
                      <a className="floatingRight">
                        <img src="/images/menu.png" />
                      </a>
                      <a className="floatingRight">
                        <i className="bx bxs-quote-alt-right"></i>
                        <p>0</p>
                      </a>
                      <a className="floatingRight">
                        <i className="bx bxs-star"></i>
                        <p>Quote</p>
                      </a>
                    </div>
                    <div className="text">
                      <ul>
                        {comment.change.map((value, index) => {
                          return (
                            <li key={index}>
                              <i className="bx bx-circle"></i> {value}
                            </li>
                          );
                        })}
                      </ul>
                      <p>{comment.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <hr />
            <div className="addnewComment">
              <p>Be the first to comment.</p>
              <a onClick={handleZoomEditComment}>Add new comment</a>
            </div>
          </>
        )}
      </div>
      <div className="editComment" style={{ height: zoomEdit ? "5%" : "" }}>
        <div className="detailEditComment">
          <div className="shink" style={{ display: zoomEdit ? "none" : "" }}>
            <span onClick={handleZoomEditComment}>=</span>
          </div>
          <div
            className="link"
            style={{
              height: zoomEdit ? "90%" : "",
              marginTop: zoomEdit ? "8px" : "",
              padding: zoomEdit ? "0rem" : "",
            }}
          >
            <i className="bx bx-link-alt"></i>
          </div>
          <div
            className="contentComment"
            style={{
              width: zoomEdit ? "86%" : "",
              margin: zoomEdit ? "5px 0" : "",
              height: zoomEdit ? "100%" : "",
            }}
          >
            <textarea
              className="textComment"
              placeholder="Write a comment, use @mention to notify a colleague..."
              style={{
                height: zoomEdit ? "100%" : "",
                fontSize: zoomEdit ? "0.8rem" : "",
                padding: zoomEdit ? "0.4rem" : "",
              }}
              value={contentComment}
              onChange={handleCommentChange}
            ></textarea>
            <div className="format" style={{ display: zoomEdit ? "none" : "" }}>
              <div>
                <img src="/images/symbol.png" alt="Loadding" />
                <img src="/images/face.png" alt="Loadding" />
              </div>
              <div>
                <b>B</b>
                <i>I</i>
                <strike>S</strike>
                <img src="/images/list.png" alt="Loadding" />
                <img src="/images/orderList.png" alt="Loadding" />
                <img src="/images/quote.png" alt="Loadding" />
                <img src="/images/bracket.png" alt="Loadding" />
                <img src="/images/link.png" alt="Loadding" />
                <img src="/images/question1.png" alt="Loadding" />
              </div>
            </div>
            <input type="text" placeholder="Notify comment to:" />
          </div>
          <div
            className="selectComment"
            style={{ display: zoomEdit ? "none" : "" }}
          >
            <label>
              Status
              <p className="floatingRight">Set to "{recommendationStatus}"</p>
            </label>
            <select
              id="status"
              name="Select Status"
              value={newStatus}
              onChange={handleStatusChange}
              disabled={role === 2 ? true : false}
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>
            <label>
              Assignee <p className="floatingRight">{recommendationAssignee}</p>
            </label>
            <select value={selectAssignee} onChange={handleAssigneeChange}>
              {listAssignee &&
                listAssignee.map((assignee) => (
                  <option key={assignee.id} id-user={assignee.id}>
                    {assignee.email === email
                      ? "Myself"
                      : `${assignee.nickname}`}{" "}
                    - {assignee.role} -{" "}
                    {GetNameDepartmentFromID(assignee.department)}
                  </option>
                ))}
            </select>
            <label>
              Resolution
              <p className="floatingRight">{recommendationResolution}</p>
            </label>
            <select value={selectResolved} onChange={handleResolvedChange}>
              <option>Fixed</option>
              <option>Waiting for disbursement</option>
            </select>
            <label>Due date</label>
            <input
              type="date"
              id="datepicker"
              name="datepicker"
              value={newDate}
              onChange={handleInputDateChange}
            />
          </div>
          <div
            className="link"
            onClick={handleZoomEditComment}
            style={{ display: zoomEdit ? "none" : "" }}
          >
            <i className="bx bx-horizontal-right"></i>
          </div>
          <div
            className="button-showEditComment"
            onClick={handleZoomEditComment}
            style={{ display: zoomEdit ? "" : "none" }}
          >
            <img src="/images/edit.png" />
            <h5>Change Status</h5>
          </div>
        </div>
        <div
          className="submit-comment"
          style={{ display: zoomEdit ? "none" : "" }}
        >
          <button onClick={handleZoomEditComment}>Close</button>
          <button>Preview</button>
          <button onClick={handleAddComment}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default DetailViewIssue;
