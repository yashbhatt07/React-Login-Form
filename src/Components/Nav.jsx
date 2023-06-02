import { Link } from "react-router-dom";
import "../Components/Nav.css";

export default function Nav() {
  return (
    <>
      <ul className="nav">
        <li className="li">
          <Link style={{ color: "white" }} to="/">
            Home
          </Link>
        </li>
        <li className="li">
          <Link
            style={{ color: "white", pointerEvents: "none" }}
            to="/Dashboard"
          >
            Dashboard
          </Link>
        </li>
      </ul>
    </>
  );
}
