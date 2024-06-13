import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import ForgotPassswordUser from "./pages/ForgotPassword";
import { LayOutRequest, LayoutHomeAdmin } from "./TheLayout";
import ContentAdmin from "./pages/ContentAdmin";
import CrudUser from "./components/CRUDUser";
import DepartmentList from "./components/Department";
import DetailContentRequest from "./pages/Home";
import DetailAddIssue from "./components/AddIssue";
import DetailViewIssue from "./components/ViewRequest";
import ContentListRequest from "./components/ListRequest";
import Login from "./pages/Login";
import { CheckRole, GetAccessTokenLogin } from "./models/modelLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import ListUser from "./components/ListUser";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogOut() {
  localStorage.clear();
  return <Register />;
}

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route path="/register" element={<RegisterAndLogOut />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/forgotPassword" element={<ForgotPassswordUser />} />
      <Route path="/resetPassword" element={<ForgotPassswordUser />} />
      <Route
        path="/home"
        element={<LayoutHomeAdmin Children={<ContentAdmin />} />}
      />
      <Route
        path="/addUser"
        element={<LayOutRequest Children={<CrudUser />} />}
      />
      <Route path="/user" element={<LayOutRequest Children={<CrudUser />} />} />
      <Route
        path="/department"
        element={<LayOutRequest Children={<DepartmentList />} />}
      />
      <Route
        path="/listUser"
        element={<LayOutRequest Children={<ListUser />} />}
      />
      <Route
        path="/projects/REQUESTGATE"
        element={<LayOutRequest Children={<DetailContentRequest />} />}
      />
      <Route
        path="/add/REQUESTGATE"
        element={<LayOutRequest Children={<DetailAddIssue />} />}
      />
      <Route
        path="/edit/REQUESTGATE"
        element={<LayOutRequest Children={<DetailAddIssue />} />}
      />
      <Route
        path="/view/REQUESTGATE"
        element={<LayOutRequest Children={<DetailViewIssue />} />}
      />
      <Route
        path="/list/REQUESTGATE"
        element={<LayOutRequest Children={<ContentListRequest />} />}
      />
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const Main = () => {
  return (
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
