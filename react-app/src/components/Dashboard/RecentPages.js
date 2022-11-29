import React from "react";
import { useHistory } from "react-router-dom";

const RecentPages = ({ userPages, formatDate }) => {
    const history = useHistory();

    const pageIds = Object.keys(userPages);

    let recentPageIds;
    if (pageIds.length > 10) {
        recentPageIds = pageIds.slice(pageIds.length - 10, pageIds.length);
    } else {
        recentPageIds = pageIds;
    }

    const selectPage = (pageId) => {
        history.push(`/notebooks/${userPages[pageId].notebookId}/pages/${pageId}`);
    }

    return (
        <div className="dashboard-comp-wrapper">

            <div className="dashboard-comp-header">
                <div>Recently Created</div>
            </div>

            <div className="dashboard-comp-page-card-wrapper">
                {recentPageIds.map(pageId => (
                    <div className="dashboard-comp-page-card clickable" key={pageId} onClick={() => selectPage(pageId)}>
                        <div className="dashboard-page-card-title">{userPages[pageId].title}</div>
                        <div className="dashboard-page-card-date">{formatDate(userPages[pageId].updatedAt)}</div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default RecentPages;
