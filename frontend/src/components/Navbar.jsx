import { useState } from "react";
import "../styles/navbar.css";
import { useLocation, useNavigate } from "react-router";
import { CheckRole, SaveAccessTokenForUserLogin } from "../models/modelLogin";
import { GetUserFromEmail } from "../models/modelUser";

const Navbar = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [role, setRole] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const handleIconClick = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleResetPassword = () => {
    if (check === 0) {
      setRole("admin");
    } else {
      setRole("user");
    }
  };

  const handleProfileInformation = () => {
    if (user) {
      navigate("/user", {
        state: { email: emailFromState, user: user, check: true },
      });
    }
  };
  return (
    <div className="navbar">
      <div className="navigation">
        <div className="company">
          <img
            src="/images/company.png"
            alt="Loading..."
            width={20}
            height={20}
          />
        </div>
        <ul>
          <li>
            <a>Dashboard</a>
          </li>
          <li>
            <a>Project</a>
          </li>
          <li>
            <a>Recently Viewed</a>
          </li>
          <li>
            <a>Filters</a>
          </li>
        </ul>
        <div className="plus">
          <img src="/images/plus.png" alt="Loading..." width={20} height={20} />
        </div>
        <div className="upgrade">Upgrade</div>
      </div>
      <div className="menuUser">
        <div className="search">
          <img src="/images/search.png" alt="Loading..." />
          <input type="search" placeholder="Search this Space" />
        </div>
        <div className="menu">
          <img src="/images/menu.png" alt="Loading..." width={25} height={25} />
        </div>
        <div className="menu">
          <img src="/images/eye.png" alt="Loading..." width={20} height={20} />
        </div>
        <div className="menu">
          <img
            src="/images/notify.png"
            alt="Loading..."
            width={20}
            height={20}
          />
        </div>
        <div className="menu">
          <img
            src="/images/question.png"
            alt="Loading..."
            width={20}
            height={20}
          />
        </div>
        <div className="profile menu" onClick={handleIconClick}>
          <img
            src="/images/user1.png"
            alt="Loading..."
            width={30}
            height={30}
          />
          <img
            src="/images/arrow.png"
            alt="Loading..."
            width={20}
            height={20}
          />
          {isDropdownVisible && (
            <div className="dropdown">
              <button onClick={handleProfileInformation}>Profile</button>
              <button onClick={handleResetPassword}>Reset Password</button>
              <button onClick={handleLogOut}>Logout</button>
            </div>
          )}
        </div>
        <div className="vertical-hr"></div>
        <div className="company">
          <img
            src="/images/company.png"
            alt="Loading..."
            width={20}
            height={20}
          />
        </div>
        <div className="area menu">NA</div>
        <div className="multi menu">
          <img
            src="/images/multi-menu.png"
            alt="Loading..."
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
