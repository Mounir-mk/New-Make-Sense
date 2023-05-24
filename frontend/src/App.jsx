import { useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthContext } from "./services/AuthContext";
import CreateDecision from "./pages/CreateDecision";
import Decision from "./pages/Decision";
import Header from "./components/Header";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./services/ProtectedRoute";
import AdminRoute from "./services/AdminRoute";
import ProfilePage from "./pages/ProfilePage";
import MyDecisionsPage from "./pages/MyDecisionsPage";

function App() {
  const location = useLocation();
  const { auth } = useContext(AuthContext);
  return (
    <div className="min-h-screen flex flex-col">
      {auth.isAuthenticated &&
        !(location.pathname === "/admin") &&
        !(location.pathname === "/login") &&
        !(location.pathname === "/register") && <Header />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/decisions/create"
          element={
            <ProtectedRoute>
              <CreateDecision />
            </ProtectedRoute>
          }
        />
        <Route
          path="/decision/:id"
          element={
            <ProtectedRoute>
              <Decision />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mydecisions"
          element={
            <ProtectedRoute>
              <MyDecisionsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
