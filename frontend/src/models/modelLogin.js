import {
  TakeStatusDepartment,
  GetDepartmentFromLocalStorage,
} from "./modelDepartment";
import { GetUserFromLocalStorage } from "./modelUser";

//Check access token before login
const GetAccessTokenLogin = () => {
  const cookies = document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("="));
  for (let i = 0; i < cookies.length; i++) {
    const [name, value] = cookies[i];
    if (name === "access_token") {
      return decodeURIComponent(value);
    }
  }
  return null;
};

const SaveAccessTokenForUserLogin = (email) => {
  if (email === "") {
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  } else {
    document.cookie = `access_token=${email};  path=/`;
  }
};

// Check user before login
const LoginUser = (email, pass) => {
  const ModelUser = GetUserFromLocalStorage() || [];
  const userLogin = ModelUser.find((user) => user.email === email);
  // Compare user info
  if (userLogin) {
    if (userLogin.password !== pass) {
      // Invalid password
      return 1;
    } else {
      SaveAccessTokenForUserLogin(email);
      return 0;
    }
  } else {
    // Email not found
    return 2;
  }
};

//check status before login from user
const CheckStatus = (email) => {
  const ModelUser = GetUserFromLocalStorage() || [];
  const userLogin = ModelUser.find((user) => user.email === email);
  if (userLogin) {
    if (userLogin.status !== "Active") {
      // user blocked
      return false;
    } else {
      return true;
    }
  } else {
    // user blocked or user is not exist
    return false;
  }
};

const CheckStatusDepartment = (email) => {
  const ModelUser = GetUserFromLocalStorage() || [];
  const userLogin = ModelUser.find((user) => user.email === email);
  if (userLogin) {
    let status = TakeStatusDepartment(userLogin.department);
    if (status === "Active") {
      return true;
    } else {
      let role = CheckRole(email);
      if (role === 0) {
        return true;
      }
      return false;
    }
  }
};

// Check role to classify object user
const CheckRole = (email) => {
  const modelUser = GetUserFromLocalStorage();
  const User = modelUser.find((user) => user.email === email);
  if (User) {
    let indexRole = User.role;
    if (indexRole === "Admin") {
      return 0; // Admin
    } else if (indexRole === "Manager") {
      return 1; // Manager
    } else if (indexRole === "Developer") {
      return 2; // Regular User
    }
  } else {
    return 2; // User not found
  }
};

const CheckRoleFromIDUser = (idUser) => {
  const modelUser = GetUserFromLocalStorage();
  const User = modelUser.find((user) => user.id === idUser);
  if (User) {
    let indexRole = User.role;
    if (indexRole === "Admin") {
      return 0; // Admin
    } else if (indexRole === "Manager") {
      return 1; // Manager
    } else if (indexRole === "Developer") {
      return 2; // Regular User
    }
  } else {
    return 2; // User not found
  }
};

export {
  LoginUser,
  CheckRole,
  CheckStatus,
  CheckStatusDepartment,
  GetAccessTokenLogin,
  SaveAccessTokenForUserLogin,
  CheckRoleFromIDUser,
};
