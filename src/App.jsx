import "../src/App.css";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Protected from "./Components/Protected";
import { Routes, Route } from "react-router-dom";
// import { useEffect } from "react";

export default function App() {
  // const navigate = useNavigate();
  // // const [isOpen, setIsOpen] = useState(false);
  // const WildcardRoute = () => {
  //   // redirect("/Login");
  //   useEffect(() => {
  //     return navigate("/Login");
  //   }, []);
  // };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Protected Component={Login} />} />
        <Route path="/Login" element={<Login />} />
        <Route
          path="/Dashboard"
          element={<Protected Component={Dashboard} />}
        />
        <Route path="*" element={<Protected Component={Login} />} />
      </Routes>
    </div>
  );
}
