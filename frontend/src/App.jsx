import { Route, Routes } from "react-router-dom";
import CreateDecision from "./pages/CreateDecision";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CreateDecision />} />
      </Routes>
    </div>
  );
}

export default App;
