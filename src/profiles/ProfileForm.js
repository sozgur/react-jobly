import { useState, useContext } from "react";
import Alert from "../common/Alert";
import UserContext from "../auth/UserContext";
import "./ProfileForm.css";
import bcrypt from "bcryptjs";
import JoblyApi from "../api/api";

/** Profile editing form.
 * Routed at /profile
 */

function ProfileForm() {
    const { currentUser, updateProfile } = useContext(UserContext);

    const INITIAL_DATA = {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        confirmPassword: "",
    };
    const [formData, setFormData] = useState(INITIAL_DATA);
    const [formErrors, setFormErrors] = useState([]);
    const [updated, setUpdated] = useState(false);

    // update form data
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // submit data to parent function and, if successful, redirect to /
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const confirmUser = await JoblyApi.confirmPassword(
                currentUser.username,
                formData.confirmPassword
            );

            const result = await updateProfile(currentUser.username, formData);
            if (!result.success) {
                setFormErrors(result.errors);
            } else {
                setFormErrors([]);
                setUpdated(true);
            }
        } catch {
            setFormErrors(["Password doesn't match!"]);
        }
    }

    return (
        <div className="ProfileForm">
            <div className="container">
                <h3>Profile</h3>
                <div className="card">
                    <div className="card-body">
                        Username
                        <p className="username">{currentUser.username}</p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label
                                    htmlFor="firstName"
                                    className="form-label"
                                >
                                    First name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="lastName"
                                    className="form-label"
                                >
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            {formErrors.length ? (
                                <Alert type="danger" messages={formErrors} />
                            ) : null}

                            {updated ? (
                                <Alert
                                    type="success"
                                    messages={["Updated successfully."]}
                                />
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

export default ProfileForm;
