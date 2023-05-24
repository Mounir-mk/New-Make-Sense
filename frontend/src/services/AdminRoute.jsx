import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";
import PropTypes from "prop-types";

function AdminRoute({ children }) {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const isAdmin = auth().user.role === "admin";
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else if (!isAdmin) {
      navigate("/");
    }
  }, [isAuthenticated(), navigate, auth()]);

  if (!isAuthenticated() || !isAdmin) {
    return null;
  }

  return children;
}

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
