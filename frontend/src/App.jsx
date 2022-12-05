import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Decision from "./pages/Decision";
import CreateDecision from "./pages/CreateDecision";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Decision />} />
        <Route path="/create_decision" element={<CreateDecision />} />
      </Routes>
    </div>
  );
}

export default App;
