import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import { server } from "../index";
import toast from "react-hot-toast";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(UserContext);

  const navigate = useNavigate();

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      toast.success(data.message);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } finally {
      setShowOffcanvas(false); // Close the Offcanvas
    }
  };

  const handleNavClick = () => {
    setShowOffcanvas(false); // Close the Offcanvas when a nav link is clicked
  };

  return (
    <>
      {["sm"].map((expand) => (
        <Navbar key={expand} expand={expand} className="mb-3 shadow-sm">
          <Container fluid>
            <Navbar.Brand className="fw-bold">TO DO</Navbar.Brand>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              onClick={() => setShowOffcanvas(!showOffcanvas)}
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              show={showOffcanvas}
              onHide={() => setShowOffcanvas(false)}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                  className="fw-bold"
                >
                  TO DO
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Link className="nav-link" to={"/"} onClick={handleNavClick}>
                    Home
                  </Link>
                  <Link
                    className="nav-link"
                    to={"/profile"}
                    onClick={handleNavClick}
                  >
                    Profile
                  </Link>
                  {isAuthenticated ? (
                    <button
                      disabled={loading}
                      onClick={handleLogout}
                      className="nav-link fw-bold"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      onClick={handleNavClick}
                      className="nav-link"
                      to={"/login"}
                    >
                      Login
                    </Link>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default Header;
