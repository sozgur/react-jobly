import "./JobCard.css";

function JobCard({ title, salary, equity, companyName }) {
    return (
        <div className="JobCard card">
            <div className="card-body">
                <h6 className="card-title">{title}</h6>
                <p className="card-text">{companyName}</p>
                <p className="card-text">
                    <small>Salary: {salary}</small>
                </p>
                <p className="card-text">
                    <small>Equity: {equity}</small>
                </p>
            </div>
        </div>
    );
}

export default JobCard;
