import React from "react";
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SideMenu from "./SideMenu/SideMenu";
import "./Dashboard.css";

const Dashboard = () => {
    const user = useSelector(state => state.session.user);



    if (!user) return <Redirect to='/authenticate' />;

    return (
        <div id="dashboard-wrapper">
            <SideMenu user={user} />
        <div id="dashboard-content-wrapper">
            <div id="dashboard-bookmarks-wrapper">bookmarks placeholder</div>
            <div id="dashboard-pages-wrapper">pages placeholder</div>
            <div id="dashboard-scratchpad-wrapper">scratchpad placeholder</div>
        </div>
        </div>
    )
}

export default Dashboard;
