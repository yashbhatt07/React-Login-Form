import Nav from "./Nav";
import "../Components/Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const list = JSON.parse(localStorage.getItem("list"));
  const navigate = useNavigate();

  const goToUsers = () => {
    localStorage.setItem("login", true);
    navigate("/users");
  };
  return (
    <div>
      <Nav />
      <h2>Welcome To Dashboard</h2>
      <div>
        <h6 className="h-2">Totel Number Of Users</h6>
        <span className="n-items" onClick={goToUsers}>
          {list.length}
        </span>
      </div>
    </div>
  );
}

export default Dashboard;
