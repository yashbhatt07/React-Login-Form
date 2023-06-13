// import { Link } from "react-router-dom";
import "../Components/Nav.css";
import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import MayNav from "react-bootstrap/Nav";

export default function Nav() {
  return (
    <>
      {/* <ul className="nav">
        <li className="li">
          <Link style={{ color: "white" }} to="/">
            Logout
          </Link>
        </li>
      </ul> */}
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/">Yash Bhatt</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <MayNav className="me-auto">
              <MayNav.Link href="/dashboard">Dashboard</MayNav.Link>
              <MayNav.Link href="/users">Users</MayNav.Link>
              <MayNav.Link href="/login" className="text-sm-left l-g ">
                Logout
              </MayNav.Link>
            </MayNav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
