/** Component for alerts with bootstrap-style.
 *
 * { LoginForm, SignupForm} -> Alert
 **/

function Alert({ type = "danger", messages = [] }) {
    return (
        <div className={`alert alert-${type}`} role="alert">
            {messages.map((message, idx) => (
                <li className="small " key={idx}>
                    {message}
                </li>
            ))}
        </div>
    );
}

export default Alert;
