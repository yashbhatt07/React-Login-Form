import "../src/App.css";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Protected from "./Components/Protected";
import { Routes, Route } from "react-router-dom";
import { ErroMessage } from "./Components/ErrorMessage";
import Users from "./Components/Users";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Protected Component={Login} />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<Protected Component={Dashboard} />}
        />
        <Route path="/users" element={<Protected Component={Users} />} />
        <Route path="*" element={<Protected Component={ErroMessage} />} />
      </Routes>
    </div>
  );
}
