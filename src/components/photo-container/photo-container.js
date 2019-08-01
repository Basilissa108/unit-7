import React from "react";
import PropTypes from "prop-types";
import "./photo-container.css";

// assign functional component to const PhotoContainer
const PhotoContainer = (props) => {
    const { items } = props;
    // return elements for PhotoContainer component
    return (
        <div className="photo-container">
            <h2>{props.for ? props.for : "Results"}</h2>
            <ul>
                {// conditionally render either results view or no results found view depending on the items array's length
                    items.length > 0
                        ? items.map((item, index) => {
                            return (
                                <li key={index}>
                                    {item}
                                </li>
                            );
                        })
                        : <li className="not-found">
                            <h3>No results found</h3>
                            <p>You search did not return any results. Please try again.</p>
                        </li>
                }
            </ul>
        </div>
    );
}

// declare propTypes for PhotoContainer component
PhotoContainer.propTypes = {
    items: PropTypes.arrayOf(PropTypes.node).isRequired,
    for: PropTypes.string
}

// export PhotoContainer component as default
export default PhotoContainer;