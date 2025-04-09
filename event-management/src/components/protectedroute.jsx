import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if user is not authenticated
  }
  return children; // Render the protected component if authenticated
};

export default ProtectedRoute;
