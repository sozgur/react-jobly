import JoblyApi from "../api/api";
import { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import SearchForm from "../common/SearchForm";
import Loading from "../common/Loading";
import "./CompanyList.css";

/** Company List Page
 *
 * Show page with list of companies
 *
 * Routed at /companies
 */
function CompanyList() {
    const [companies, setCompanies] = useState(null);

    useEffect(() => {
        getCompanies();
    }, []);

    async function getCompanies(name = null) {
        const companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    }

    if (!companies) return <Loading />;

    console.log(companies);

    return (
        <div className="CompanyList">
            <SearchForm search={getCompanies} />
            {companies.length ? (
                companies.map((company) => (
                    <CompanyCard
                        key={company.handle}
                        handle={company.handle}
                        name={company.name}
                        description={company.description}
                        logoUrl={company.logoUrl}
                    />
                ))
            ) : (
                <p className="mt-5">Sorry, no results were found with this!</p>
            )}
        </div>
    );
}

export default CompanyList;
