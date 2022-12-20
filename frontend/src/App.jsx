import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./_services/AuthContext";
import CreateDecision from "./pages/CreateDecision";
import Decision from "./pages/Decision";
import Header from "./components/Header";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const { auth } = useContext(AuthContext);
  return (
    <div className="App">
      {auth.isAuthenticated && <Header />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {auth.isAuthenticated ? (
          <>
            <Route path="/decisions/create" element={<CreateDecision />} />
            <Route path="/decision/:id" element={<Decision />} />
            <Route path="/" element={<Dashboard />} />
          </>
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
