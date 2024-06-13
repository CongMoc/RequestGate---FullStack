import {
  CheckDepartmentDeactive,
  GetDepartmentFromLocalStorage,
} from "./modelDepartment";
import { CheckRole } from "./modelLogin";
import { GetListRequestByUser } from "./modelRequestGate";

const GetUserFromLocalStorage = () => {
  const userString = localStorage.getItem("users");
  return userString ? JSON.parse(userString) : null;
};

const SaveNewUserToLocalStorage = (user) => {
  let ModelUser = GetUserFromLocalStorage() || [];
  ModelUser.push(user);
  localStorage.setItem("users", JSON.stringify(ModelUser));
};

//update user
const UpdateUserInLocalStorage = (updatedUser) => {
  let ModelUser = GetUserFromLocalStorage() || [];
  const updatedModelUser = ModelUser.map((user) => {
    if (user.email === updatedUser.email) {
      return updatedUser;
    }
    return user;
  });
  localStorage.setItem("users", JSON.stringify(updatedModelUser));
};

// Reset password
const UpdatePassword = (email, password) => {
  let ModelUser = GetUserFromLocalStorage();
  const InforUser = ModelUser.find((user) => user.email === email);
  if (InforUser) {
    InforUser.password = password;
    localStorage.setItem("users", JSON.stringify(ModelUser));
  }
};

const ListStatusUserActive = ({ email }) => {
  let ModelUser = GetUserFromLocalStorage();
  let InforUser = ModelUser.filter((user) => user.status === "Active");
  if (InforUser) {
    return InforUser;
  } else {
    return [];
  }
};

const ListStatusUserDeactive = ({ email }) => {
  let ModelUser = GetUserFromLocalStorage();
  let InforUser = ModelUser.filter(
    (user) => user.email !== email && user.status !== "Active"
  );
  if (InforUser) {
    return InforUser;
  } else {
    return [];
  }
};

const ListManager = (email) => {
  let ModelUser = GetUserFromLocalStorage();
  let iduser = GetIDUserFromEmail(email);
  let department = GetDepartmentOfUser(iduser);
  let role = CheckRole(email);
  let InforManager;
  if (role === 0) {
    InforManager = ModelUser;
  } else {
    InforManager = ModelUser.filter(
      (user) => user.role !== "Developer" || user.department === department
    );
  }
  if (InforManager) {
    return InforManager;
  } else {
    return [];
  }
};
const GetUserFromID = (id) => {
  let ModelUser = GetUserFromLocalStorage();
  let User = ModelUser.find((user) => user.id === id);
  if (User) {
    return User;
  }
};

const GetUserFromEmail = (email) => {
  let ModelUser = GetUserFromLocalStorage();
  let User = ModelUser.find((user) => user.email === email);
  if (User) {
    return User;
  }
};

const GetListAssignee = (email) => {
  let ModelUser = GetUserFromLocalStorage();
  let iduser = GetIDUserFromEmail(email);
  let department = GetDepartmentOfUser(iduser);
  let role = CheckRole(email);
  let ListAssignee;
  if (role === 0) {
    ListAssignee = ModelUser;
  } else if (role === 1) {
    ListAssignee = ModelUser.filter(
      (user) =>
        (user.role === "Manager" &&
          CheckDepartmentDeactive(user.department) === true) ||
        user.department === department ||
        user.role === "Admin"
    );
  } else {
    ListAssignee = ModelUser.filter((user) => user.department === department);
  }
  if (ListAssignee) {
    let checkIsEmpty = false;
    let listRequest = GetListRequestByUser(email);
    listRequest.forEach((request) => {
      ListAssignee.forEach((user) => {
        if (request.idSender === user.id) {
          checkIsEmpty = true;
        }
      });
      if (checkIsEmpty === false) {
        ListAssignee.push(GetUserFromID(request.idSender));
      }
    });
    return ListAssignee;
  }
};

const QuantityUserInDepartment = (department) => {
  let ModelUser = GetUserFromLocalStorage();
  const UserDepartment = ModelUser.filter(
    (user) => user.department === department && user.role !== "Admin"
  );
  return UserDepartment.length ? UserDepartment.length : 0;
};

const UpdateUserAfterDeleteDepartment = (idDepartment) => {
  let ModelUser = GetUserFromLocalStorage();
  ModelUser.forEach((user) => {
    if (user.department === idDepartment) {
      user.status = "Deactive";
    }
  });
  localStorage.setItem("users", JSON.stringify(ModelUser));
};

const DeleteUser = (id) => {
  let ModelUser = GetUserFromLocalStorage();
  const ModelAfterDelete = ModelUser.filter((user) => {
    return user.id !== id;
  });
  localStorage.setItem("users", JSON.stringify(ModelAfterDelete));
};

const GetIDUserFromEmail = (email) => {
  let ModelUser = GetUserFromLocalStorage();
  const EmailUser = ModelUser.find((user) => {
    return user.email === email;
  });
  return EmailUser.id;
};

const GetNicknameUserFromEmail = (email) => {
  let ModelUser = GetUserFromLocalStorage();
  const EmailUser = ModelUser.find((user) => {
    return user.email === email;
  });
  return EmailUser.nickname;
};

const GetNicknameUserFromID = (id) => {
  let ModelUser = GetUserFromLocalStorage();
  const EmailUser = ModelUser.find((user) => {
    return user.id === id;
  });
  return EmailUser.nickname;
};

const GetDepartmentOfUser = (id) => {
  let ModelUser = GetUserFromLocalStorage();
  const EmailUser = ModelUser.find((user) => {
    return user.id === id;
  });
  return EmailUser.department;
};

const GetDepartmentOfUserFromEmail = (email) => {
  let ModelUser = GetUserFromLocalStorage();
  const EmailUser = ModelUser.find((user) => {
    return user.email === email;
  });
  return EmailUser.department;
};

const GetPhoneFromEmailOfUser = (email) => {
  let ModelUser = GetUserFromLocalStorage();
  const PhoneUser = ModelUser.find((user) => {
    return user.email === email;
  });
  return PhoneUser.phone;
};

const GetListUserFromDepartment = (id) => {
  let ModelUser = GetUserFromLocalStorage();
  const UserDepartment = ModelUser.filter((user) => {
    return user.department === id;
  });
  return UserDepartment;
};

export {
  SaveNewUserToLocalStorage,
  GetUserFromLocalStorage,
  UpdatePassword,
  UpdateUserInLocalStorage,
  ListStatusUserActive,
  ListStatusUserDeactive,
  QuantityUserInDepartment,
  DeleteUser,
  UpdateUserAfterDeleteDepartment,
  ListManager,
  GetIDUserFromEmail,
  GetNicknameUserFromEmail,
  GetNicknameUserFromID,
  GetDepartmentOfUser,
  GetPhoneFromEmailOfUser,
  GetListAssignee,
  GetListUserFromDepartment,
  GetDepartmentOfUserFromEmail,
  GetUserFromEmail,
};
