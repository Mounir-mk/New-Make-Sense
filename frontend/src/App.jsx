import { Route, Routes } from "react-router-dom";
import { RenderHeader } from "./components/Header";
import CreateDecision from "./pages/CreateDecision";
import Decision from "./pages/Decision";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./services/ProtectedRoute";
import AdminRoute from "./services/AdminRoute";
import UnprotectedRoute from "./services/UnprotectedRoute";
import ProfilePage from "./pages/ProfilePage";
import MyDecisionsPage from "./pages/MyDecisionsPage";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <RenderHeader />
      <Routes>
        <Route
          path="/register"
          element={
            <UnprotectedRoute>
              <Register />
            </UnprotectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <UnprotectedRoute>
              <Login />
            </UnprotectedRoute>
          }
        />
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
