import "./SearchForm.css";
import { useState } from "react";

/** Search component.
 *
 * Render search form and call search funtion from parent componenet.
 *
 * { CompanyList } -> SearchForm
 */
function SearchForm({ search }) {
    const [searchQuery, setSearchQuery] = useState("");

    //update form field
    function handleChange(e) {
        const { value } = e.target;
        setSearchQuery((query) => value);
    }

    // send term to parent function
    function handleSubmit(e) {
        e.preventDefault();
        search(searchQuery.trim() || null);
        setSearchQuery(searchQuery.trim());
    }

    return (
        <div className="SearchForm">
            <form onSubmit={handleSubmit} className="d-flex">
                <input
                    className="form-control form-control-lg me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    name="query"
                    value={searchQuery}
                    onChange={handleChange}
                />
                <button className="btn btn-primary" type="submit">
                    Search
                </button>
            </form>
        </div>
    );
}

export default SearchForm;
