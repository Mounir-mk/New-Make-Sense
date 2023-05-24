import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import PropTypes from "prop-types";

function UnprotectedRoute({ children }) {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [isAuthenticated(), navigate]);

  if (isAuthenticated()) {
    return null;
  }

  return children;
}

UnprotectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UnprotectedRoute;
