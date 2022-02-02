import "./NavBar.css";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../auth/UserContext";
import { Button, Navbar, Container, Nav } from "react-bootstrap";

/** Navbar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site.
 * When not,shows link to Login and Signup forms.
 *
 * Rendered by App.
 */
function NavBar({ logout }) {
    const { currentUser } = useContext(UserContext);

    function loggedInNav() {
        return (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link me-3" to="/companies">
                        Companies
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link me-3" to="/jobs">
                        Jobs
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link me-3" to="/profile">
                        Profile
                    </NavLink>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={logout}>
                        Log out {currentUser.username}
                    </Link>
                </li>
            </ul>
        );
    }

    function loggedOutNav() {
        return (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link me-3" to="/login">
                        Login
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link me-3" to="/signup">
                        Sign Up
                    </NavLink>
                </li>
            </ul>
        );
    }
    return (
        <Navbar className="NavBar" variant="dark" expand="lg">
            <Container>
                <NavLink className="navbar-brand" to="/">
                    Jobly
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse
                    className="justify-content-end"
                    id="basic-navbar-nav"
                >
                    <Nav>{currentUser ? loggedInNav() : loggedOutNav()}</Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
