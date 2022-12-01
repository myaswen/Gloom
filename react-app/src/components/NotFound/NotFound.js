import React from "react";
import { useHistory } from "react-router-dom";

import "./NotFound.css";

const NotFound = () => {
    const history = useHistory();

    return (
        <div id="not-found-wrapper">
            <div id="not-found-message-container">
                <div id="not-found-message">Page not found 😔</div>
                <div className="clickable green" onClick={() => history.push("/dashboard")}>Dashboard</div>
            </div>
        </div>
    )
}

export default NotFound;
