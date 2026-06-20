import { Navigate } from "react-router-dom";

export function ProtectedAdmin({ children }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Jika tidak ada user atau bukan admin, redirect ke home
  if (!user || user.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export function ProtectedUser({ children }) {
  const token = localStorage.getItem("token");

  // Jika tidak ada token (belum login), redirect ke home
  if (!token) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
