import React from "react";
import { useHistory } from "react-router-dom";

import "./RecentPages.css";

const RecentPages = ({ userPages }) => {
    const history = useHistory();

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
