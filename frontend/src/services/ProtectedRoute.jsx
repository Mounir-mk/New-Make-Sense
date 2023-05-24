import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import PropTypes from "prop-types";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login", { state: { from: location } });
    }
  }, [isAuthenticated(), navigate, location]);

  if (!isAuthenticated()) {
    return null;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
