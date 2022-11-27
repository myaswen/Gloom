import React from "react";

import "./Dashboard.css";
import RecentPages from "./RecentPages";
import Scratchpad from "./Scratchpad";

const Dashboard = () => {

    return (
        <div id="dashboard-wrapper">
            <div id="dashboard-bookmarks-wrapper">bookmarks placeholder</div>
            <div id="dashboard-pages-wrapper">
                <RecentPages />
            </div>
            <div id="dashboard-scratchpad-wrapper">
                <Scratchpad />
            </div>
        </div>
    )
}

export default Dashboard;
