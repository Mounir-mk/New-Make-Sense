import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import CreateDecision from "./pages/CreateDecision";
import Decision from "./pages/Decision";
import Header from "./components/Header";
import "./App.css";
import Dashboard from "./pages/Dashboard";

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
    <div className="App w-screen">
      <Header />
      <Routes>
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
        <Route
          path="/decision/:id"
          element={<Decision createDecision={createDecision} dataId={dataId} />}
        />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
