import React from "react";

const NavbarContent = ({ topic, note }) => {
  return (
    <div className="displayNavbar navbar" style={{ backgroundColor: "white" }}>
      <div className="topic">
        <div className="company">
          <img
            src="/images/company.png"
            alt="Loading..."
            width={20}
            height={20}
          />
        </div>
        <h2>{topic}</h2>
        <p>{note}</p>
      </div>
      <div className="event">
        <img
          className="hide"
          src="/images/user1.png"
          alt="Loading..."
          width={30}
          height={30}
        />
        <div className="numberUser">+0</div>
        <a>Invite Users</a>
        <div className="vertical-hr"></div>
        <div>
          <img
            src="/images/search.png"
            alt="Loading..."
            width={17}
            height={17}
          />
        </div>
      </div>
    </div>
  );
};

export default NavbarContent;
