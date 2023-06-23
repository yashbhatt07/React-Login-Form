import Nav from "./Nav";
import "../Components/Dashboard.css";

function Dashboard() {
  const list = JSON.parse(localStorage.getItem("list"));

  return (
    <div>
      <Nav />
      <h2>Welcome To Dashboard</h2>
      <div>
        <h6>Totel Number Of Users</h6>
        <span>{list.length}</span>
      </div>
    </div>
  );
}

export default Dashboard;
