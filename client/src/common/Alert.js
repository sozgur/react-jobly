/** Component for alerts with bootstrap-style.
 *
 * { LoginForm, SignupForm} -> Alert
 **/

function Alert({ type = "danger", messages = [] }) {
    return (
        <div className={`m-3 alert alert-${type}`} role="alert">
            {messages.map((message) => (
                <li>{message}</li>
            ))}
        </div>
    );
}

export default Alert;
