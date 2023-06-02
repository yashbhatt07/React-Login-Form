import "../src/App.css";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import { Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
export default function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}
