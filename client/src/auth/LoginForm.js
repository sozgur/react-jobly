import "./LoginForm.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";

/** Login form.
 *
 * - calls login function prop
 * - redirects to / route
 *
 * Routes -> LoginForm -> Alert
 *
 * Routed as /login
 */

function LoginForm({ login }) {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [formErrors, setFormErrors] = useState([]);

    const history = useHistory();

    // update form data field
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // submit data to parent function and, if successful, redirect to /
    async function handleSubmit(e) {
        e.preventDefault();
        const result = await login(formData);
        if (result.success) {
            history.push("/");
        } else {
            setFormErrors(result.errors);
        }
    }

    return (
        <div className="LoginForm">
            <div className="container">
                <h3>Log In </h3>
                <div className="card" style={{ width: "25rem" }}>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label
                                    htmlFor="username"
                                    className="form-label"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="password"
                                    className="form-label"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            {formErrors.length ? (
                                <Alert type="danger" messages={formErrors} />
                            ) : null}
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
