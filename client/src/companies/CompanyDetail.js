import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import JoblyApi from "../api/api";
import Loading from "../common/Loading";
import "./CompanyDetail.css";

/** Company Detail Page
 *
 * Show detail information about company, alongwith the jobs at that company.
 *
 * Routed at /companies/:handle
 */
function CompanyDetail() {
    const { handle } = useParams();
    const [company, setCompany] = useState(null);

    useEffect(() => {
        getCompany();
    }, [handle]);

    async function getCompany() {
        const company = await JoblyApi.getCompany(handle);
        setCompany(company);
    }

    if (!company) return <Loading />;
    return (
        <div className="CompanyDetail col-md-8 offset-md-2">
            <h4>{company.name}</h4>
            <p>{company.description}</p>
        </div>
    );
}

export default CompanyDetail;
