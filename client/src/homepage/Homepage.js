import UserContext from "../auth/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";

/** Homepage of site
 *
 * Show welcome message or login/register buttons
 *
 * Routed at /
 *
 * Routes -> Homepage
 */
function Homepage() {
    const { currentUser } = useContext(UserContext);

    return (
        <div className="Homepage">
            <div className="container">
                <h1 className="mb-4">Jobly</h1>
                <p>All the jobs in one, convenient place.</p>
                {currentUser ? (
                    <h2>Welcome Back, {currentUser.username}</h2>
                ) : (
                    <p>
                        <Link className="btn btn-primary me-3 pe-3" to="/login">
                            Login
                        </Link>
                        <Link className="btn btn-primary pe-3" to="/signup">
                            Signup
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
}

export default Homepage;
