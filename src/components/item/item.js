import React from "react";
import PropTypes from "prop-types";
import "./item.css";

// assign functional component to const Item
const Item = (props) => {
    const { src, title, owner } = props;
    // return img tag using prop values as various attributes
    return (
        <img src={src} alt={title} title={title} author={owner} />
    );
}

// declare propTypes for Item component
Item.propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired
}

// export Item component as default
export default Item;