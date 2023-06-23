// import { Link } from "react-router-dom";
import "../Components/Nav.css";
import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import MayNav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();

  const isCurrentPage = (path) => {
    return location.pathname === path;
  };

  const renderNavLink = (path, name) => {
    const isActive = isCurrentPage(path);
    const linkClass = isActive ? "nav-link active" : "nav-link";

    return (
      <MayNav.Link as={Link} to={path} className={linkClass}>
        {name}
      </MayNav.Link>
    );
  };

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Admin Panel
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <MayNav className="me-auto">
              <MayNav.Link as={Link} to="/dashboard">
                {renderNavLink("/dashboard", "Dashboard")}
              </MayNav.Link>
              <MayNav.Link as={Link} to="/users">
                {renderNavLink("/users", "Users")}
              </MayNav.Link>
              <MayNav.Link as={Link} to="/login" className="text-sm-left l-g ">
                Logout
              </MayNav.Link>
            </MayNav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
