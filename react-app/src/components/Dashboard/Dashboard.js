import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SideMenu from "./SideMenu/SideMenu";
import "./Dashboard.css";
import NotebooksView from "./NotebooksView/NotebooksView";

const Dashboard = () => {
    // const user = useSelector(state => state.session.user);
    // const [viewSelection, setViewSelection] = useState("dashboard");


    // if (!user) return <Redirect to='/authenticate' />;

    return (
        <div id="dashboard-wrapper">
            {/* <SideMenu user={user} setViewSelection={setViewSelection} /> */}
                <div id="dashboard-content-wrapper">
                    <div id="dashboard-bookmarks-wrapper">bookmarks placeholder</div>
                    <div id="dashboard-pages-wrapper">pages placeholder</div>
                    <div id="dashboard-scratchpad-wrapper">scratchpad placeholder</div>
                </div>
        </div>
    )
}

export default Dashboard;
