import React from "react";
import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
        <>
            <h1>404 - Page not found</h1>
            <p>The page you were trying to access doesn't exist.</p>
            <Link to="/">Return to home</Link>
        </>
    );
}

export default Error404;