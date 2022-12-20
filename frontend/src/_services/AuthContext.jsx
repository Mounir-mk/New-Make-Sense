import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const [auth, setAuth] = useState({
  isAuthenticated: false,
  token: null,
});

const value = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

const AuthContext = createContext(value);

function AuthContextProvider({ children }) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthContextProvider };

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
