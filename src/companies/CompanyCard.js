import "./CompanyCard.css";
import { Link } from "react-router-dom";

function CompanyCard({ handle, name, description, logoUrl }) {
    return (
        <Link className="CompanyCard card" to={`/companies/${handle}`}>
            <div className="card-body">
                <h5 className="card-title">
                    {name}
                    {logoUrl && (
                        <img
                            src={logoUrl}
                            alt={name}
                            className="CompanyCard-logo"
                        />
                    )}
                </h5>
                <p className="card-text">{description}</p>
            </div>
        </Link>
    );
}

export default CompanyCard;
