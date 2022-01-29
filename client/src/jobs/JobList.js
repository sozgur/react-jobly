import { useState, useEffect } from "react";
import Loading from "../common/Loading";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api/api";
import JobCard from "./JobCard";
import "./JobList.css";

/** Show page with list of jobs.
 *
 * On mount, loads jobs from API.
 * Re-loads filtered jobs on submit from search form.
 *
 * JobList -> JobCard
 *
 * This is routed to at /jobs
 */

function JobList() {
    const [jobs, setJobs] = useState(null);

    useEffect(() => {
        getJobs();
    }, []);

    async function getJobs(title = null) {
        const jobs = await JoblyApi.getJobs(title);
        setJobs(jobs);
    }

    if (!jobs) return <Loading />;

    console.log(jobs);

    return (
        <div className="JobList">
            <SearchForm search={getJobs} />
            {jobs.map((job) => (
                <JobCard
                    key={job.id}
                    title={job.title}
                    salary={job.salary}
                    equity={job.equity}
                    companyName={job.company.name}
                />
            ))}
        </div>
    );
}

export default JobList;
