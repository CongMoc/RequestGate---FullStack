import React from "react";

const Nickname = ({ nickname, setNickname }) => {
  return (
    <div className="input-container">
      <input
        type="text"
        name="nickname"
        value={nickname}
        placeholder="Nick name"
        onChange={(event) => setNickname(event.target.value)}
      />
    </div>
  );
};

const Fullname = ({ fullname, setFullName }) => {
  return (
    <div className="input-container">
      <input
        type="text"
        name="fullname"
        value={fullname}
        placeholder="Full name"
        onChange={(event) => setFullName(event.target.value)}
      />
    </div>
  );
};

const Address = ({ address, setAddress }) => {
  return (
    <div className="input-container">
      <input
        type="text"
        name="address"
        value={address}
        placeholder="Address"
        onChange={(event) => setAddress(event.target.value)}
      />
    </div>
  );
};

const Phone = ({ phone, setPhone }) => {
  return (
    <div className="input-container">
      <input
        type="tel"
        name="phone"
        pattern="[0-9]+"
        value={phone}
        placeholder="Phone"
        onChange={(event) => setPhone(event.target.value)}
      />
    </div>
  );
};

const DepartmentSelect = ({
  departments,
  selectedDepartment,
  onDepartmentChange,
  setIDDeparment,
  checkPassword,
}) => {
  const handleDepartmentChange = (event) => {
    const selectedId =
      event.target.options[event.target.selectedIndex].getAttribute("data-id");
    onDepartmentChange(event.target.value);
    setIDDeparment(selectedId);
  };

  let check = false;
  if (checkPassword) {
    check = checkPassword;
  }

  return (
    <div className="input-container">
      <label htmlFor="Department">Department: </label>
      <select
        id="Department"
        name="Department"
        value={selectedDepartment}
        onChange={handleDepartmentChange}
        disabled={check}
      >
        {departments.map((department) => (
          <option
            key={department.id}
            value={department.name}
            data-id={department.id}
          >
            {department.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const StatusUser = ({
  statuses,
  selectedStatus,
  onStatusChange,
  checkPassword,
}) => {
  const handleStatusChange = (event) => {
    onStatusChange(event.target.value);
  };

  let check = false;
  if (checkPassword) {
    check = checkPassword;
  }

  return (
    <div className="input-container">
      <label htmlFor="status">Status: </label>
      <select
        id="status"
        name="status"
        value={selectedStatus}
        onChange={handleStatusChange}
        disabled={check ? true : false}
        key={check ? "disabled" : "enabled"}
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

const RoleEdit = ({
  selectedRole,
  onRoleChange,
  roles,
  checkPassword,
  setIDRole,
}) => {
  const handleRoleChange = (event) => {
    const selectedId =
      event.target.options[event.target.selectedIndex].getAttribute("role_id");
    onRoleChange(event.target.value);
    setIDRole(selectedId);
  };

  let check = false;
  if (checkPassword) {
    check = checkPassword;
  }

  return (
    <div className="input-container">
      <label htmlFor="editRole">Role: </label>
      <select
        id="editRole"
        name="roleEdit"
        value={selectedRole}
        onChange={handleRoleChange}
        disabled={check}
      >
        {roles.map((role, index) => (
          <option key={index} value={role.role} role_id={role.id}>
            {role.role}
          </option>
        ))}
      </select>
    </div>
  );
};

const BackHomeFromLogin = ({ handleBackHome }) => {
  return (
    <div className="back" onClick={handleBackHome}>
      <img src="/images/prev.png" height={15} />
    </div>
  );
};

const DepartmentEdit = ({
  isEditing,
  newDepartment,
  handleInputDepartmentChange,
  handleDepartmentChange,
  selectedDepartment,
  departments,
}) => {
  return (
    <div className="input-container">
      <label htmlFor="editDepartment">Department: </label>
      {isEditing ? (
        <input
          id="editDepartment"
          type="text"
          value={newDepartment}
          onChange={handleInputDepartmentChange}
        />
      ) : (
        <select
          id="editDepartment"
          name="DepartmentEdit"
          value={selectedDepartment}
          onChange={handleDepartmentChange}
        >
          {departments.map((department) => (
            <option
              key={department.department}
              value={department.department}
              data-id={department.id}
            >
              {department.department}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export {
  Nickname,
  Fullname,
  Address,
  DepartmentSelect,
  BackHomeFromLogin,
  Phone,
  StatusUser,
  DepartmentEdit,
  RoleEdit,
};
