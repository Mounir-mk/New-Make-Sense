import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import CreateDecision from "./pages/CreateDecision";
import Decision from "./pages/Decision";
import Header from "./components/Header";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";

function App() {
  const [dataId, setDataId] = useState();
  const [createDecision, setCreateDecision] = useState({
    impacted: [],
    experts: [],
    title: "",
    date: "",
    description: "",
    impacts: "",
    advantages: "",
    risks: "",
  });
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/decisions/create"
          element={
            <CreateDecision
              createDecision={createDecision}
              setCreateDecision={setCreateDecision}
              dataId={dataId}
              setDataId={setDataId}
            />
          }
        />
        <Route path="/decision/:id" element={<Decision />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
