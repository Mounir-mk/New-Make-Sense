import { Route, Routes } from "react-router-dom";
import CreateDecision from "./pages/CreateDecision";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<CreateDecision />} />
      </Routes>
    </div>
  );
}

export default App;
