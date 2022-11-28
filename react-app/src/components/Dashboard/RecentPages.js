import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { TH_getUserPages } from "../../store/page";

import "./RecentPages.css";

const RecentPages = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const userPages = useSelector(state => state.pages.user);

    useEffect(() => {
        dispatch(TH_getUserPages());
    }, [dispatch]);

    const pageIds = Object.keys(userPages);
    const recentPageIds = pageIds.slice(pageIds.length - 10, pageIds.length);

    const selectPage = (pageId) => {
        history.push(`/notebooks/${userPages[pageId].notebookId}/pages/${pageId}`);
    }

    return (
        <div id="recent-pages-wrapper">

            <div id="recent-pages-header">
                <div>Recently created</div>
            </div>

            <div id="recent-pages-cards-wrapper">
                {recentPageIds.map(pageId => (
                    <div className="recent-page-card clickable" key={pageId} onClick={() => selectPage(pageId)}>
                        <div>{userPages[pageId].title}</div>
                        <div>{userPages[pageId].updatedAt}</div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default RecentPages;
