import "./NavBar.css";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../auth/UserContext";

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
        <div>
            <nav className="NavBar navbar navbar-expand-lg navbar-dark">
                <NavLink className="navbar-brand" to="/">
                    Jobly
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {currentUser ? loggedInNav() : loggedOutNav()}
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
