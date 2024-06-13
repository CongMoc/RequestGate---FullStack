import React, { Children } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { MessageUser } from "./components/Message";

const LayoutHomeAdmin = ({ Children }) => {
  return (
    <div className="body">
      <Navbar />
      {Children}
    </div>
  );
};

const LayOutRequest = ({ Children }) => {
  return (
    <div className="body">
      <Navbar />
      <div className="content">
        <Sidebar />
        <MessageUser />
        {Children}
      </div>
    </div>
  );
};

export { LayOutRequest, LayoutHomeAdmin };
