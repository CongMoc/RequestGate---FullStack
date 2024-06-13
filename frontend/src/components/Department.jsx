import React, { useEffect, useState } from "react";
import { DepartmentEdit, StatusUser, RoleEdit } from "./InputForm";
import {
  TakeStatusDepartment,
  AddNewDepartmentToLocalStorage,
  DeleteDepartment,
  GetDepartmentFromLocalStorage,
  SaveDepartmentToLocalStorage,
} from "../models/modelDepartment";
import NavbarContent from "./NavbarContent";
import { Message } from "./Message";
import {
  QuantityUserInDepartment,
  UpdateUserAfterDeleteDepartment,
} from "../models/modelUser";
import api from "../api";

const DepartmentList = () => {
  const [idDepartment, setIDDepartment] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isMessage, setIsMessage] = useState("");
  const [newDepartment, setNewDepartment] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [statuses, setStatus] = useState(["Active", "Deactive"]);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [departmentModel, setDepartmentModel] = useState([]);

  const getDepartment = async (e) => {
    try {
      await api
        .get("/api/departments/")
        .then((res) => {
          if (res.data) {
            setDepartmentModel(res.data);
          }
        })
        .catch((error) => {
          setIsMessage(error.message);
        });
    } catch (error) {
      setIsMessage(error.message);
    }
  };

  useEffect(() => {
    getDepartment();
  }, [idDepartment]);

  console.log(departmentModel);

  const handleStatusChange = (selectedStatus) => {
    setSelectedStatus(selectedStatus);
  };
  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleInputDepartmentChange = (event) => {
    setNewDepartment(event.target.value);
  };

  const handleEditClick = ({ department }) => {
    setIsEditing(true);
    setIDDepartment(department.id);
    setNewDepartment(department.department);
    setSelectedStatus(department.status);
  };

  const handleSaveClick = () => {
    if (newDepartment !== "") {
      setIsEditing(false);
      SaveDepartmentToLocalStorage(idDepartment, newDepartment, selectedStatus);
      setNewDepartment("");
      setSelectedStatus("Active");
      setIDDepartment(departmentModel[0].id);
      setIsMessage("Update department is successfully!");
    } else {
      setIsMessage("Department is null... Please try again!");
    }
  };

  const handleAddClick = () => {
    if (newDepartment !== "") {
      AddNewDepartmentToLocalStorage(newDepartment, selectedStatus);
      setNewDepartment("");
      setSelectedStatus("Active");
      setIsMessage("Add new department is successfully!");
    } else {
      setIsMessage("Department is null... Please try again!");
    }
  };

  return (
    <div className="detailContent">
      {isMessage && <Message message={isMessage} setIsMessage={setIsMessage} />}
      <NavbarContent topic={"Department"} note={"(DEPARTMENT)"} />
      <div className="detailDepartment">
        <DepartmentEdit
          isEditing={true}
          newDepartment={newDepartment}
          handleInputDepartmentChange={handleInputDepartmentChange}
          handleDepartmentChange={handleDepartmentChange}
          selectedDepartment={selectedDepartment}
          departments={departmentModel}
        />
        <StatusUser
          statuses={statuses}
          selectedStatus={selectedStatus}
          onStatusChange={handleStatusChange}
        />
        {isEditing === true ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          <button onClick={handleAddClick}>Add</button>
        )}
      </div>
      <div className="listDepartment">
        <div className="detailListDepartment">
          <h1>ID</h1>
          <h1>Name</h1>
          <h1>Status</h1>
        </div>
        {departmentModel.map((department) => {
          return (
            <div className="detailListDepartment" key={department.id}>
              <h1>{department.id}</h1>
              <p>{department.name}</p>
              {department.active ? (
                <h1 style={{ color: "#2c9a7a" }}>Active</h1>
              ) : (
                <h1 style={{ color: "red" }}>Deactive</h1>
              )}

              <i
                className="bx bx-edit-alt"
                onClick={() => handleEditClick({ department })}
              ></i>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DepartmentList;
