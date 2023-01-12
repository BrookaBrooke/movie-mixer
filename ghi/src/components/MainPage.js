import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function onChange(event) {
    setQuery(event.target.value);
  }

  function redirectToSearchPage(event) {
    event.preventDefault();
    return navigate(`/search/${query}/1`);
  }

  return (
    <div className="home-pic">
      <h2 className="home-header">Coming Soon</h2>
      <form
        className="d-flex container"
        role="search"
        onSubmit={redirectToSearchPage}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          required
          onChange={onChange}
        />
        <button className="btn btn-outline-danger" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default MainPage;
