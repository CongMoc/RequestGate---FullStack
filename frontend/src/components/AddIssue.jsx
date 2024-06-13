import React, { useState, useEffect } from "react";
import {
  GetIDUserFromEmail,
  GetListAssignee,
  GetNicknameUserFromEmail,
  GetNicknameUserFromID,
} from "../models/modelUser";
import {
  SaveNewRequestToLocalStorage,
  UpdateRequest,
} from "../models/modelRequestGate";
import { Message } from "./Message";
import { useLocation, useNavigate } from "react-router";
import { CheckRole, CheckRoleFromIDUser } from "../models/modelLogin";
import {
  CheckDepartmentFromEmailUser,
  GetNameDepartmentFromID,
} from "../models/modelDepartment";
import NavbarContent from "./NavbarContent";
import "../styles/addIssue.css";
import { format } from "date-fns";

const DetailAddIssue = () => {
  let location = useLocation();
  let navigate = useNavigate();;
  let assignee = [];
  let listRequest = "";
  let nameMySelf ="";
  const [idSender, setIDSender] = useState(0);
  const [idReceiver, setIDReceiver] = useState(0);
  const [isMessage, setIsMessage] = useState();
  const [selectedAssignee, setSelectedAssign] = useState();
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState([
    "Feedback",
    "Report",
    "Feature Request",
    "Technical Support",
  ]);
  const [status, setStatus] = useState("Open");
  const [checkAdd, setCheckAdd] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Feedback");
  const [dueDate, setDueDate] = useState("");
  const [text, setText] = useState("");
  const [currentDateTimeId, setCurrentDateTimeId] = useState("");
  const [typeRequest, setTypeRequest] = useState([
    "Tasks",
    "Bugs",
    "Request",
    "Different",
  ]);
  const [selectedType, setSelectedType] = useState("Tasks");
  const [idRequest, setIDRequest] = useState();
  const [eventRequest, setEventRequest] = useState("Add");
  const [resolution, setResolution] = useState("");
  const [nearCommentTime, setNearCommentTime] = useState();

  useEffect(() => {
    const generateCurrentDateTimeId = () => {
      const currentDateTime = new Date();
      return currentDateTime.toISOString();
    };
    // Update the current datetime id every second
    const time = setInterval(() => {
      setCurrentDateTimeId(generateCurrentDateTimeId());
    }, 1000);
    // Clear the interval on component unmount
    return () => clearInterval(time);
  }, []);

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleTypeRequestChange = (event) => {
    setSelectedType(event.target.value);
  };

  const checkVariavleNull = () => {
    const now = new Date();
    const checkDate = new Date(dueDate);
    const role = "";
    const manager = CheckRoleFromIDUser(idReceiver);
    const StatusDepartment ="";
    if (subject === "") {
      return "Subject is null...Please try again!";
    } else if (dueDate === "") {
      return "Date input ivalidate... Please try again!";
    } else if (checkDate < now) {
      return "Due date is not less than now... Please try again!";
    } else if (selectedCategory === "") {
      return "Category ivalidate... Please try again!";
    } else if (selectedAssignee === "") {
      return "Assign ivalidate... Please try again!";
    } else if (role === 2) {
      if (StatusDepartment === false && manager === 1) {
        return "Your department is banned... You cant request to Manager";
      } else {
        return "";
      }
    } else {
      return "";
    }
  };

  const handleAddRequest = (event) => {
    let check = checkVariavleNull();
    event.preventDefault();
    if (check === "") {
      if (eventRequest === "Update") {
        const request = {
          id: idRequest,
          type: selectedType,
          idSender: idSender,
          idReceiver: idReceiver,
          idAssignee: idReceiver,
          subject: subject,
          content: text,
          status: "Open",
          category: selectedCategory,
          date: dueDate,
          resolution: resolution,
          idUserEdit: GetIDUserFromEmail(email),
          nearCommentTime: nearCommentTime,
        };
        UpdateRequest(idRequest, request);
        navigate("/view/REQUESTGATE", {
          state: { email, idRequest, notify: "Updated Successfully!" },
        });
      } else {
        const request = {
          id: currentDateTimeId,
          type: selectedType,
          idSender: idSender,
          idReceiver: idReceiver,
          idAssignee: idReceiver,
          subject: subject,
          content: text,
          status: "Open",
          category: selectedCategory,
          date: dueDate,
          resolution: "",
          idUserEdit: "",
          nearCommentTime: "",
        };
        SaveNewRequestToLocalStorage(request);
        setCheckAdd(true);
        setIsMessage("Add Request is successfully!!!");
      }
      setSubject("");
      setText("");
      setSelectedCategory(category[0]);
      setSelectedAssign(assignee[0].nickname);
      setDueDate("");
      setSelectedType(typeRequest[0]);
    } else {
      setIsMessage(check);
    }
  };

  const handleAddAnotherRequest = () => {
    setCheckAdd(false);
  };

  const handleTextChange = (event) => {
    event.preventDefault();
    setText(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDateChange = (event) => {
    const inputValue = event.target.value;
    const selectedDateTime = new Date(inputValue);
    console.log(inputValue);
    const formattedDateTime = format(selectedDateTime, "yyyy-MM-dd");
    setDueDate(formattedDateTime);
  };

  const handleSelectedAssignee = (event) => {
    setSelectedAssign(event.target.value);
    const selectedId =
      event.target.options[event.target.selectedIndex].getAttribute(
        "receiver-id"
      );
    setIDReceiver(selectedId);
  };

  const handleClickMySelf = () => {
    
  };

  return (
    <div className="addIssue">
      <NavbarContent topic={"Request Gate"} note={"(REQUESTGATE)"} />
      <div className="detailAddIssue">
        {isMessage ? (
          <Message setIsMessage={setIsMessage} message={isMessage} />
        ) : null}
        <h2>Add Issue</h2>
        {checkAdd === true ? (
          <>
            <div className="notifySuccess">
              <h3>Issue has been added.</h3>
              <div>
                <h1>REQUESTGATE-1</h1>
                <h3>Request for new Case</h3>
                <div>
                  <img src="/images/note.png" alt="Loadding..." />
                </div>
                <div>
                  <img src="/images/eye.png" alt="Loadding..." />
                </div>
              </div>
            </div>
            <button className="addAnother" onClick={handleAddAnotherRequest}>
              Add another Issue
            </button>
          </>
        ) : (
          <>
            <div className="buttonAddIssue">
              <button>Preview</button>
              <button onClick={handleAddRequest}>{eventRequest}</button>
            </div>
            <select
              id="typeRequest"
              name="Type Request"
              value={selectedType}
              onChange={handleTypeRequestChange}
            >
              {typeRequest.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <input
              type="text"
              alt="Loadding"
              placeholder="Subject"
              value={subject}
              onChange={handleSubjectChange}
            />
            <div className="contentIssue">
              <div className="detailContentIssue">
                <textarea
                  id="textIssue"
                  className="textIssue custom-jodit-editor"
                  value={text}
                  onChange={handleTextChange}
                  placeholder="Add a description, use @mention to notify a colleague..."
                ></textarea>
                <div className="format">
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
                    <img src="/images/checkList.png" alt="Loadding" />
                    <img src="/images/table.png" alt="Loadding" />
                    <img src="/images/quote.png" alt="Loadding" />
                    <img src="/images/bracket.png" alt="Loadding" />
                    <img src="/images/link.png" alt="Loadding" />
                    <img src="/images/question1.png" alt="Loadding" />
                    <button>Preview</button>
                  </div>
                </div>
              </div>
              <div className="inforIssue">
                <div>
                  <div className="statusInput">
                    <label>Status</label>
                    <p>{status}</p>
                  </div>
                  <div className="assignee">
                    <label>Assignee</label>
                    <select
                      id="assignee"
                      name="Assignee"
                      value={selectedAssignee}
                      onChange={handleSelectedAssignee}
                    >
                      {assignee.map((assign) => (
                        <option
                          key={assign.id}
                          value={assign.nickname}
                          receiver-id={assign.id}
                        >
                          
                          {GetNameDepartmentFromID(assign.department)}
                        </option>
                      ))}
                    </select>

                    <div className="assignMyself" onClick={handleClickMySelf}>
                      <img src="/images/user2.png" />
                      <p>Assign to myself</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="categoryInput">
                    <label>Category</label>
                    <select
                      id="category"
                      name="Category"
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                    >
                      {category.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <div className="plusCategory">
                      <i className="bx bx-plus"></i>
                    </div>
                    <p>Multiple selection</p>
                  </div>
                  <div className="dueDate">
                    <label>Due date</label>
                    <input
                      type="date"
                      id="datepicker"
                      name="datepicker"
                      value={dueDate}
                      onChange={handleDateChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="dragdropFile">
              <div>
                <p>Drag & Drop Files or Paste image from clipboard</p>
                <p>OR</p>
                <a>Select File(a)...</a>
              </div>
              <h5>Hold down Shift key for multiple selection.</h5>
            </div>
            <a>Have problems attaching file? Click here.</a>
            <div className="notify">
              <h4>Notify:</h4>
              <input type="search" placeholder="Search user" />
            </div>
            <div className="buttonAddIssue">
              <button>Preview</button>
              <button onClick={handleAddRequest}>{eventRequest}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailAddIssue;
