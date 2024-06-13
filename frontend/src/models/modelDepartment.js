import React, { useEffect, useState } from "react";
import {
  GetDepartmentOfUser,
  GetDepartmentOfUserFromEmail,
  GetUserFromLocalStorage,
} from "./modelUser";

let check = [
  {
    id: 0,
    department: "Software Development",
    status: "Active",
  },
  {
    id: 1,
    department: "Analysis and Design",
    status: "Active",
  },
  {
    id: 2,
    department: "Quality Assurance",
    status: "Active",
  },
  {
    id: 3,
    department: "Mobile",
    status: "Active",
  },
];

const GetDepartmentFromLocalStorage = () => {
  const DepartmentString = localStorage.getItem("departments");
  return DepartmentString ? JSON.parse(DepartmentString) : check;
};

const AddNewDepartmentToLocalStorage = (department, status) => {
  let modelDepartment = GetDepartmentFromLocalStorage();
  const newDepartment = {
    id: MaxID() + 1,
    department: department,
    status: status,
  };
  modelDepartment.push(newDepartment);
  localStorage.setItem("departments", JSON.stringify(modelDepartment));
};

const SaveDepartmentToLocalStorage = (id, departmentEdit, status) => {
  let modelDepartment = GetDepartmentFromLocalStorage();
  modelDepartment.forEach((department) => {
    if (department.id === id) {
      department.department = departmentEdit;
      department.status = status;
    }
  });
  localStorage.setItem("departments", JSON.stringify(modelDepartment));
};

const MaxID = () => {
  let modelDepartment = GetDepartmentFromLocalStorage();
  let maxID = -1;
  modelDepartment.forEach((department) => {
    if (department.id > maxID) {
      maxID = department.id;
    }
  });
  return maxID;
};

const TakeStatusDepartment = (idDepartment) => {
  let modelDepartment = GetDepartmentFromLocalStorage();
  const listDepartment = modelDepartment.find(
    (department) => department.id === idDepartment
  );
  return listDepartment ? listDepartment.status : null;
};

const TotalDepartmentSD = () => {
  const ModelUser = GetUserFromLocalStorage();
  const [total, setTotal] = useState(0);
  const [active, setActive] = useState(0);
  const [deactive, setDeactive] = useState(0);

  const countInDepartment = () => {
    return ModelUser.length - 1;
  };

  const countDepartmentActive = () => {
    return ModelUser.filter((user) => user.status === "Active").length - 1;
  };

  const countDepartmentDeactive = () => {
    return ModelUser.filter((user) => user.status === "Deactive").length;
  };

  useEffect(() => {
    setTotal(countInDepartment());
    setActive(countDepartmentActive());
    setDeactive(countDepartmentDeactive());
  }, [ModelUser]);
  return { total, active, deactive };
};

const DeleteDepartment = (id) => {
  const modelDepartment = GetDepartmentFromLocalStorage();
  const modelAfterDelete = modelDepartment.filter((department) => {
    return department.id !== id;
  });
  localStorage.setItem("departments", JSON.stringify(modelAfterDelete));
};

const GetNameDepartmentFromID = (id) => {
  const modelDepartment = GetDepartmentFromLocalStorage();
  const modelAfterDelete = modelDepartment.filter((department) => {
    return department.id === id;
  });
  if (modelAfterDelete) {
    return modelAfterDelete[0].department;
  }
};

const CheckDepartmentDeactive = (idDepartment) => {
  const modelDepartment = GetDepartmentFromLocalStorage();
  const departmentDeactive = modelDepartment.find(
    (department) => department.id === idDepartment
  );
  if (departmentDeactive.status === "Deactive") {
    return false;
  } else {
    return true;
  }
};

const CheckDepartmentFromEmailUser = (email) => {
  const idDepartment = GetDepartmentOfUserFromEmail(email);
  return CheckDepartmentDeactive(idDepartment);
};

export {
  TotalDepartmentSD,
  GetDepartmentFromLocalStorage,
  SaveDepartmentToLocalStorage,
  TakeStatusDepartment,
  AddNewDepartmentToLocalStorage,
  DeleteDepartment,
  GetNameDepartmentFromID,
  CheckDepartmentDeactive,
  CheckDepartmentFromEmailUser,
};
