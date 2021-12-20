import React from 'react';
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const AdminRoute = ({ component: Component }) => {
    const { isAuthenticated, loading, user } = useSelector((state) => state.user);
  if (loading === undefined || loading === true) return <></>;
  return isAuthenticated === true && user.role === 'admin' ? <Component /> : <Navigate to="/login" />;
}

export default AdminRoute
