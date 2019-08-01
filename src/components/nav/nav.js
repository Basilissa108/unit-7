import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "./nav.css";

// assign functional component to const Nav
const Nav = (props) => {
    const { categories } = props;
    // return elements for Nav component
    return (
        <nav className="main-nav">
            <ul>
                {categories.map((category, index) => {
                    return (
                        <li key={index}>
                            <NavLink exact={true} activeClassName="active" to={`/search/${category}`} className="nav-link">{category}</NavLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

// declare propTypes for Nav component
Nav.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired
}

// export Nav component as default
export default Nav;