import "./JobCard.css";
import { useContext, useState, useEffect } from "react";
import UserContext from "../auth/UserContext";
import Alert from "../common/Alert";

function JobCard({ id, title, salary, equity, companyName }) {
    const { applicationToJob, hasAppliedToJob } = useContext(UserContext);
    const [applied, setApplied] = useState();

    // call apply job function of parent function
    function handleApplyJob(e) {
        applicationToJob(id);
        setApplied(true);
    }

    useEffect(() => {
        if (hasAppliedToJob(id)) {
            setApplied(true);
        }
    }, [id]);

    return (
        <div className="JobCard card">
            <div className="card-body ">
                <h6 className="card-title">{title}</h6>
                <p className="card-text">{companyName}</p>
                <p className="card-text">
                    <small>Salary: {salary}</small>
                </p>
                <p className="card-text">
                    <small>Equity: {equity}</small>
                </p>
                <button
                    className="btn btn-danger float-end fw-bold py-2 px-3"
                    onClick={handleApplyJob}
                    disabled={applied}
                >
                    {applied ? "APPLIED" : "APPLY"}
                </button>
            </div>
        </div>
    );
}

export default JobCard;
