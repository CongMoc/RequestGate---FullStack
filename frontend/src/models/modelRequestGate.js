import React from "react";
import { CheckRole } from "./modelLogin";
import { GetDepartmentOfUser, GetIDUserFromEmail } from "./modelUser";

const GetRequestFromLocalStorage = () => {
  const request = localStorage.getItem("requests");
  return request ? JSON.parse(request) : [];
};

const SaveNewRequestToLocalStorage = (request) => {
  let requestModel = GetRequestFromLocalStorage() || [];
  requestModel.push(request);
  localStorage.setItem("requests", JSON.stringify(requestModel));
};

const GetListRequestByUser = (email) => {
  let requestModel = GetRequestFromLocalStorage() || [];
  let checkRole = CheckRole(email);
  let listRequest = [];
  if (checkRole === 0) {
    listRequest = requestModel;
  } else if (checkRole === 1) {
    let idManager = GetIDUserFromEmail(email);
    let departmentManager = GetDepartmentOfUser(idManager);
    listRequest = requestModel.filter((request) => {
      return (
        GetDepartmentOfUser(request.idSender) === departmentManager ||
        request.idReceiver === idManager ||
        request.idSender === idManager ||
        request.idAssignee === idManager
      );
    });
  } else {
    let idUser = GetIDUserFromEmail(email);
    listRequest = requestModel.filter((request) => {
      return (
        request.idSender === idUser ||
        request.idReceiver === idUser ||
        request.idAssignee === idUser
      );
    });
  }
  if (listRequest) {
    const sortedList = listRequest.sort((a, b) => {
      const timeA = a.nearCommentTime
        ? new Date(a.nearCommentTime).getTime()
        : new Date(a.id).getTime();
      const timeB = b.nearCommentTime
        ? new Date(b.nearCommentTime).getTime()
        : new Date(b.id).getTime();
      return timeB - timeA;
    });
    return sortedList;
  }
};

const BlockEditRequest = (idRequest) => {
  let requestModel = GetRequestFromLocalStorage();
  requestModel.forEach((request) => {
    if (request.id === idRequest) {
      request.check = false;
    }
  });
  localStorage.setItem("requests", JSON.stringify(requestModel));
};

const QuantityStatusRequest = (email) => {
  let open = 0;
  let inProgress = 0;
  let resolved = 0;
  let closed = 0;
  let listRequest = GetListRequestByUser(email)

  if (listRequest) {
    listRequest.forEach((request) => {
      if (request.status === "Open") {
        open++;
      } else if (request.status === "In Progress") {
        inProgress++;
      } else if (request.status === "Resolved") {
        resolved++;
      } else {
        closed++;
      }
    });
  }
  return {
    openQuantity: open,
    inProgressQuantity: inProgress,
    resolvedQuantity: resolved,
    closedQuantity: closed,
  };
};

const UpdateRequest = (id, requestNew) => {
  let requestModel = GetRequestFromLocalStorage();
  for (let i = 0; i < requestModel.length; i++) {
    if (requestModel[i].id === id) {
      requestModel[i] = requestNew;
      break;
    }
  }
  localStorage.setItem("requests", JSON.stringify(requestModel));
};

const DeleteRequest = (idRequest) => {
  let requestModel = GetRequestFromLocalStorage();
  const listRequest = requestModel.filter((request) => {
    return request.id !== idRequest;
  });
  localStorage.setItem("requests", JSON.stringify(listRequest));
};

const GetListRequestFromID = (idRequest) => {
  const requestModel = GetRequestFromLocalStorage();
  const request = requestModel.find((request) => {
    return request.id === idRequest;
  });
  return request;
};

const GetListRequestByStatus = (requestModel, status) => {
  if (status === "All") {
    return requestModel;
  } else {
    const request = requestModel.filter((request) => {
      return request.status === status;
    });
    return request;
  }
};

const GetListRequestAssigneeToAdmin = (email) => {
  let idAdmin = GetIDUserFromEmail(email);
  const requestModel = GetRequestFromLocalStorage();
  const request = requestModel.filter((request) => {
    return request.idReceiver === idAdmin || request.idAssignee === idAdmin;
  });
  if (request) {
    return request;
  } else {
    return [];
  }
};

const GetListRequestAssigneeByAdmin = (email) => {
  let idAdmin = GetIDUserFromEmail(email);
  const requestModel = GetRequestFromLocalStorage();
  const request = requestModel.filter((request) => {
    return request.idSender === idAdmin;
  });
  if (request) {
    return request;
  } else {
    return [];
  }
};

const SumRequestAssigneeToAdmin = (email) => {
  let idAdmin = GetIDUserFromEmail(email);
  const requestModel = GetRequestFromLocalStorage();
  let assignToMe = 0;
  let createdByMe = 0;
  requestModel.forEach((request) => {
    if (request.idReceiver === idAdmin || request.idAssignee === idAdmin) {
      assignToMe++;
    }
    if (request.idSender === idAdmin) {
      createdByMe++;
    }
  });
  return { assignToMe, createdByMe };
};

const SumDuedateAssigneeToAdmin = (requestModel) => {
  let days = 0;
  let today = 0;
  let overdue = 0;
  requestModel.forEach((request) => {
    const currentDate = new Date();
    const specificDate = new Date(request.date);
    const differenceTime =
      (specificDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24);
    if (differenceTime > 4) {
      days++;
    } else if (differenceTime < 0) {
      overdue++;
    }
    if (
      specificDate.getDate() === currentDate.getDate() &&
      specificDate.getMonth() === currentDate.getMonth() &&
      specificDate.getFullYear() === currentDate.getFullYear()
    ) {
      today++;
    }
  });
  return [days, today, overdue];
};

// type date create by 4-> 4 days or than, 1 -> overdue, 0 ->  today
const GetListRequestFromDueDateOfAdmin = (requestModel, typeDate) => {
  const currentDate = new Date();
  const listRequest = requestModel.filter((request) => {
    const specificDate = new Date(request.date);
    const differenceTime = specificDate.getTime() - currentDate.getTime();
    if (typeDate === 4) {
      return differenceTime > 4 * 24 * 60 * 60 * 1000;
    } else if (typeDate === 0) {
      return (
        specificDate.getDate() === currentDate.getDate() &&
        specificDate.getMonth() === currentDate.getMonth() &&
        specificDate.getFullYear() === currentDate.getFullYear()
      );
    } else {
      return differenceTime < 24 * 60 * 60 * 1000;
    }
  });
  return listRequest;
};

export {
  GetRequestFromLocalStorage,
  SaveNewRequestToLocalStorage,
  GetListRequestByUser,
  BlockEditRequest,
  QuantityStatusRequest,
  UpdateRequest,
  GetListRequestFromID,
  DeleteRequest,
  GetListRequestByStatus,
  GetListRequestAssigneeToAdmin,
  SumRequestAssigneeToAdmin,
  GetListRequestAssigneeByAdmin,
  SumDuedateAssigneeToAdmin,
  GetListRequestFromDueDateOfAdmin,
};
