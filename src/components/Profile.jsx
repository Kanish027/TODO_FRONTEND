import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { isAuthenticated, user } = useContext(UserContext);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-center mb-3">
        <h1 className="fw-bold">Profile</h1>
      </div>
      <div className="d-flex justify-content-center">
        <h3 className="fw-bold">Name: {user.name}</h3>
      </div>
      <div className="d-flex justify-content-center">
        <h4 className="fw-bold">Registered Email: {user.email}</h4>
      </div>
    </div>
  );
};

export default Profile;
