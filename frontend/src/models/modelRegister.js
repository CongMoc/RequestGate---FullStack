import { GetUserFromLocalStorage } from "./modelUser";

const CheckEmailIsEmpty = (email) => {
  const ModelUser = GetUserFromLocalStorage();
  if (
    Array.isArray(ModelUser) &&
    ModelUser.length > 0 &&
    typeof email === "string"
  ) {
    return ModelUser.some((user) => user.email === email);
  }
  return false;
};

const FindMaxID = () => {
  const ModelUser = GetUserFromLocalStorage();
  if (ModelUser.length === 0) {
    return 0;
  }
  return ModelUser.reduce(
    (maxId, user) => (user.id > maxId ? user.id : maxId),
    ModelUser[0].id
  );
};

export { CheckEmailIsEmpty, FindMaxID };
