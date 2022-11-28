import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TH_getUserPages } from "../../store/page";
import BookmarkedPages from "./BookmarkedPages";

import "./Dashboard.css";
import RecentPages from "./RecentPages";
import Scratchpad from "./Scratchpad";

const Dashboard = () => {
    const dispatch = useDispatch();

    const userPages = useSelector(state => state.pages.user);

    useEffect(() => {
        dispatch(TH_getUserPages());
    }, [dispatch]);

    const formatDate = (dateString) => {
        const savedDate = new Date(dateString).toLocaleString();
        return savedDate;
    }

    return (
        <div id="dashboard-wrapper">
            <div id="dashboard-bookmarks-wrapper">
                <BookmarkedPages userPages={userPages} formatDate={formatDate} />
            </div>
            <div id="dashboard-pages-wrapper">
                <RecentPages userPages={userPages} formatDate={formatDate} />
            </div>
            <div id="dashboard-scratchpad-wrapper">
                <Scratchpad />
            </div>
        </div>
    )
}

export default Dashboard;
