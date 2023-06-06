import { Link } from "react-router-dom";
import "../Components/Nav.css";

export default function Nav() {
  return (
    <>
      <ul className="nav">
        <li className="li">
          <Link style={{ color: "white" }} to="/">
            Logout
          </Link>
        </li>
      </ul>
    </>
  );
}
