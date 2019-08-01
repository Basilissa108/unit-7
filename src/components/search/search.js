import React, { useState } from "react";
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import "./search.css";

// assign functional component to const Search
const Search = (props) => {
    // declare query variable in state and initialize it to the value of the prop initialValue
    const [query, setQuery] = useState(props.initialValue);

    // submithandler
    const handleSubmit = (e) => {
      // prevent default behaviour
      e.preventDefault();
      // redirect to a search route with the query value as param
      props.history.push(`/search/${query}`);
    }
    // return elements for Search component
    return (
        <form className="search-form" onSubmit={handleSubmit}>
          <input type="search" name="search" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} required/>
          <button type="submit" className="search-button">
            <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </button>
        </form>
    );
}

// declare propTypes for Search component
Search.propTypes = {
  initialValue: PropTypes.string.isRequired
};

// export Search component as default
export default withRouter(Search);