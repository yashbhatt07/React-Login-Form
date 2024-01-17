// import { Link } from "react-router-dom";
import "../Components/Nav.css";
import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();

  const isCurrentPage = (path) => {
    return location.pathname === path;
  };

  const renderNavLink = (path, name) => {
    const isActive = isCurrentPage(path);
    const linkClass = isActive ? "nav-link active" : "nav-link";

    return (
      <Nav.Link as={Link} to={path} className={linkClass}>
        {name}
      </Nav.Link>
    );
  };

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/users">
            Admin Panel
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {renderNavLink("/dashboard", "Dashboard")}
              {renderNavLink("/users", "Users")}
              <Nav.Link as={Link} to="/login" className="text-sm-left l-g ">
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
