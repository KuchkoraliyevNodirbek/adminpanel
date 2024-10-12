import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const AdminLayout = () => {
  const role = "admin";

  if (role == "admin") {
    return (
      <div>
        <h1>Admin sitebar</h1>
        <Outlet />
      </div>
    );
  }
  return <Navigate to="/" />;
};
